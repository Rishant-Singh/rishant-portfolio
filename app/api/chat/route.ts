/**
 * POST /api/chat - AI chatbot endpoint using Gemini
 * Body: { messages: Array<{role: string, content: string}> }
 */
import { NextRequest, NextResponse } from "next/server";
import { chatWithAI } from "@/lib/ai";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "Messages required" }, { status: 400 });
        }
        const reply = await chatWithAI(messages);
        return NextResponse.json({ success: true, reply });
    } catch {
        return NextResponse.json({ error: "AI service error" }, { status: 500 });
    }
}
