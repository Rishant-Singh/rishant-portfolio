/**
 * Gemini AI helper for the portfolio chatbot.
 * Loads portfolio context and answers questions about the owner.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const PORTFOLIO_CONTEXT = `
You are Cyber, an AI assistant for a software developer's portfolio website.
Your role is to answer questions about the developer's skills, projects, experience, and background. When introducing yourself, refer to yourself as Cyber.

Key facts:
- Name: Rishant Kumar Singh
- Role: Full-Stack Developer & Software Engineer
- Location: Jhumri Telaiya, Koderma (Open to Hybrid & Remote)
- Email: singhrishant440@gmail.com
- GitHub: https://github.com/Rishant-Singh
- LinkedIn: https://www.linkedin.com/in/rishantkrsingh/
- X (Twitter): https://x.com/singhrishant123
- Discord: thebeast8828 (ID: 516275094457417730)
- Skills: Python, Java, JavaScript, SQL, C++, React.js, HTML5, CSS3, Bootstrap, FastAPI, Node.js, PostgreSQL, MongoDB, Elasticsearch, Git, GitHub, Docker, Postman, VS Code, IntelliJ IDEA, Antigravity
- Education:
  * MCA (Master of Computer Applications), 2024–2026, RGPV, Bhopal
  * BCA (Bachelor of Computer Applications), 2021–2024, Chandigarh University, Mohali
- Projects:
  * CyberHawk: Scalable Cyber Threat Intelligence platform (Python, FastAPI, Kafka, Elasticsearch, Docker).
  * QuickDesk: Real-time messaging and communication platform (React, Node.js, Express.js, Socket.IO, MongoDB).
- Certifications: Generative AI Professional (Oracle), React JS (Infosys Springboard), Industry 4.0 IoT (NPTEL).
- Blog Articles:
  * "Building an Asynchronous Threat Intelligence Pipeline with FastAPI, Kafka, and Elasticsearch" (A deep dive into CyberHawk's event-driven architecture, backpressure handling, and sub-second IOC search).
- Open to: Full-time opportunities, Hybrid roles, Remote work, Collaborations

Guidelines:
- Be friendly, professional, and concise (2-4 sentences max per response)
- If asked about contact, suggest using the Contact page
- If asked about projects, suggest checking the Projects page
- Do not make up specific project names or details not provided
- Stay on-topic about the developer's professional life
`;

export async function chatWithAI(messages: { role: string; content: string }[]): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return "AI chatbot is not configured. Please add GEMINI_API_KEY to your environment.";
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: PORTFOLIO_CONTEXT }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood! I'm Cyber, ready to answer questions about this developer's portfolio." }],
                },
                // Convert prior messages
                ...messages.slice(0, -1).map((m) => ({
                    role: m.role === "assistant" ? "model" : "user",
                    parts: [{ text: m.content }],
                })),
            ],
        });

        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        return result.response.text();
    } catch (err) {
        console.error("Gemini API error:", err);
        return "Sorry, I'm having trouble connecting. Please try again later.";
    }
}
