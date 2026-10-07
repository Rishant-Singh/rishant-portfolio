import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
    title: string;
    slug: string;
    description: string;
    content: string; // Markdown for case study
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
    images: string[];
    featured: boolean;
    category: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        content: { type: String, default: "" }, // Markdown case study
        techStack: [{ type: String }],
        githubUrl: { type: String, default: "" },
        liveUrl: { type: String, default: "" },
        images: [{ type: String }],
        featured: { type: Boolean, default: false },
        category: { type: String, default: "Web Development" },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Project: Model<IProject> =
    mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
