import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI missing');
  process.exit(1);
}

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    category: { type: String, default: "General" },
    coverImage: { type: String, default: "" },
    published: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

const blogContent = `When building **CyberHawk**, my goal was straightforward yet ambitious: create a high-throughput Cyber Threat Intelligence (CTI) platform capable of ingesting diverse security feeds, validating vulnerability reports (CVEs), and providing security analysts with sub-second lookups for Indicators of Compromise (IOCs)—such as malicious IP addresses, SHA-256 file hashes, and infected domain names.

However, security feeds are inherently chaotic. Data arrives in bursts, schemas vary between threat feeds, and blocking a synchronous REST API while parsing, enriching, and storing payloads quickly degrades system responsiveness.

In this article, I break down the architectural choices behind CyberHawk, focusing on how combining **FastAPI**, **Apache Kafka**, and **Elasticsearch** solved the ingestion and search bottlenecks.

---

### The Architecture: Decoupling Ingestion from Processing

The fundamental challenge with threat intel ingestion is the speed mismatch:
- An API endpoint needs to receive and acknowledge incoming webhook events within milliseconds.
- Threat intelligence processing (deduplication, GeoIP lookup, CVE severity cross-referencing, reputation scoring) takes significant compute time.

If ingestion and processing occur in the same synchronous cycle, the API server will quickly experience thread starvation during security alert spikes.

Here is the three-tier architecture I implemented:

\`\`\`
[Threat Feeds / OSINT Sources]
            │
            ▼ (HTTP / Webhooks)
┌─────────────────────────────────┐
│   FastAPI Ingestion Gateway     │  <-- Non-blocking async validation
└─────────────────┬───────────────┘
                  │ Publish event
                  ▼
┌─────────────────────────────────┐
│      Apache Kafka Broker        │  <-- Topic: "raw-threat-feeds"
└─────────────────┬───────────────┘
                  │ Stream consume
                  ▼
┌─────────────────────────────────┐
│     Worker Enrichment Engine    │  <-- Deduplication & Enrichment
└─────────────────┬───────────────┘
                  │ Bulk index (_bulk)
                  ▼
┌─────────────────────────────────┐
│     Elasticsearch Cluster       │  <-- Inverted Index & Full-Text Search
└─────────────────────────────────┘
\`\`\`

---

### 1. The FastAPI Ingestion Gateway

FastAPI's asynchronous ASGI architecture on top of Starlette and Uvicorn makes it ideal for handling hundreds of concurrent incoming feed streams. 

Using Pydantic v2 models, we validate incoming threat reports at the perimeter before any processing takes place:

\`\`\`python
from fastapi import FastAPI, BackgroundTasks, status
from pydantic import BaseModel, Field
from typing import Optional, List
import aiokafka

app = FastAPI(title="CyberHawk Ingestion Gateway")

class ThreatIndicator(BaseModel):
    indicator_value: str = Field(..., description="IP, Domain, or Hash")
    indicator_type: str = Field(..., description="ipv4, domain, md5, sha256")
    source: str
    severity: Optional[str] = "medium"
    cve_ids: List[str] = []

@app.post("/api/v1/telemetry", status_code=status.HTTP_202_ACCEPTED)
async def ingest_threat_payload(payload: ThreatIndicator):
    # Asynchronously dispatch to Kafka topic without waiting for enrichment
    await kafka_producer.send_and_wait(
        topic="raw-threat-feeds",
        value=payload.model_dump_json().encode("utf-8")
    )
    return {"status": "queued", "indicator": payload.indicator_value}
\`\`\`

By returning \`202 Accepted\` immediately after committing the event to Kafka, the client receives a lightning-fast response (< 15ms), completely freeing the web server from downstream workloads.

---

### 2. Kafka as the Shock Absorber

When a major vulnerability disclosure occurs (e.g., a critical remote code execution flaw in an enterprise framework), security researchers and threat aggregators publish hundreds of thousands of IOCs within minutes.

Apache Kafka acts as our backpressure shock absorber:
- **Partitioning**: Events are partitioned by \`indicator_type\`, ensuring related indicators maintain ordered processing where necessary.
- **Consumer Groups**: Independent workers consume from the topic at a controlled rate, ensuring system load remains stable even during massive feed surges.
- **Fault Tolerance**: If the enrichment worker or Elasticsearch cluster undergoes maintenance, messages remain safely stored in Kafka's append-only commit log without data loss.

---

### 3. Why Elasticsearch for Security Analytics?

Traditional relational databases (PostgreSQL, MySQL) excel at ACID transactions, but threat intelligence lookups have distinct requirements:
1. **Fuzzy Search & Substring Matching**: Searching whether a target IP \`192.168.1.1\` falls within known CIDR blocks or searching partial CVE identifiers (e.g., \`CVE-2026-\`).
2. **Schema Flexibility**: A malware IOC might carry 20 metadata tags (registry keys, mutexes, file paths), while a network IOC only carries autonomous system numbers (ASN).
3. **High-Speed Aggregations**: Analysts frequently query: *"Show top 5 threat sources with severity 'high' observed in the last 24 hours."*

Elasticsearch's inverted index and distributed sharding allow CyberHawk to query millions of threat documents in under 25ms.

#### Bulk Indexing Strategy
Instead of sending individual \`POST\` requests per indicator, the consumer worker aggregates indicators into batches of 500 documents and uses the Elasticsearch \`_bulk\` API:

\`\`\`python
from elasticsearch import AsyncElasticsearch
from elasticsearch.helpers import async_bulk

es = AsyncElasticsearch("http://elasticsearch:9200")

async def flush_batch_to_elasticsearch(documents: list):
    actions = [
        {
            "_index": "threat-indicators-2026",
            "_source": doc
        }
        for doc in documents
    ]
    success, errors = await async_bulk(es, actions)
    print(f"Successfully indexed {success} threat indicators.")
\`\`\`

---

### 4. Containerizing with Docker

Managing Python dependencies, Kafka, Zookeeper, and Elasticsearch on separate environments is prone to configuration drift. In CyberHawk, the entire ecosystem is unified using multi-stage Docker builds and Docker Compose:

- Container networking isolates the Kafka and Elasticsearch clusters behind an internal bridge network.
- Volume mounts ensure persistent storage across container restarts for threat indices.
- Health checks guarantee that worker services only begin consuming once Kafka and Elasticsearch report ready states.

---

### Key Lessons & Takeaways

1. **Never scrape or enrich synchronously in an API request handler**: Even with async libraries, external API timeouts and DNS delays will inevitably exhaust connections.
2. **Batch writes are non-negotiable for real-time telemetry**: Committing individual documents to search indexes creates excessive I/O overhead. Batching transformed our write throughput by over 10x.
3. **Pydantic models serve as your best perimeter defense**: Validating schemas upfront prevents dirty and malformed threat data from corrupting downstream search indices.

Building CyberHawk reinforced how thoughtful distributed system design turns raw, overwhelming streams of data into actionable, resilient intelligence.`;

async function seedBlog() {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected');

    const slug = "building-async-threat-intelligence-pipeline-fastapi-kafka-elasticsearch";
    const existing = await Blog.findOne({ slug });

    if (existing) {
      console.log('Article already exists. Updating content...');
      existing.content = blogContent;
      existing.published = true;
      await existing.save();
      console.log('✅ Blog post updated successfully.');
    } else {
      console.log('⏳ Creating article...');
      await Blog.create({
        title: "Building an Asynchronous Threat Intelligence Pipeline with FastAPI, Kafka, and Elasticsearch",
        slug,
        excerpt: "How I architected CyberHawk to ingest, stream, and search thousands of security Indicators of Compromise (IOCs) and CVE feeds in real time without blocking the event loop.",
        content: blogContent,
        tags: ["FastAPI", "Python", "Kafka", "Elasticsearch", "Docker", "System Design"],
        category: "Backend Architecture",
        coverImage: "",
        published: true,
        views: 42,
      });
      console.log('✅ Original blog post created and published!');
    }
  } catch (err) {
    console.error('❌ Error seeding blog:', err);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected');
    process.exit(0);
  }
}

seedBlog();
