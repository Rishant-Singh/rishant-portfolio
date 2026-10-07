import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string; // Markdown
    tags: string[];
    category: string;
    coverImage: string;
    published: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
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

const Blog: Model<IBlog> =
    mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
export default Blog;
