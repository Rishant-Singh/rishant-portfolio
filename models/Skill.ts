import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkill extends Document {
    name: string;
    category: string;
    level: number; // 1-100
    icon: string;
    order: number;
}

const SkillSchema = new Schema<ISkill>(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        level: { type: Number, required: true, min: 1, max: 100 },
        icon: { type: String, default: "" },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Skill: Model<ISkill> =
    mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
export default Skill;
