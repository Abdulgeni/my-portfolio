import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { PERSONAL_DATA, PROJECTS, EXPERIENCES, CERTIFICATIONS } from "@/lib/data";

const systemPrompt = `You are the official AI Assistant embedded in the personal portfolio of ${PERSONAL_DATA.name}, ${PERSONAL_DATA.title} based in ${PERSONAL_DATA.location}.
Your task is to answer visitors' questions accurately, concisely, and professionally about Abdulgeni's experience, background, projects, technical skills, languages, and availability.

DATA & KNOWLEDGE BASE:
Name: ${PERSONAL_DATA.name}
Title: ${PERSONAL_DATA.title}
Location: ${PERSONAL_DATA.location}
Email: ${PERSONAL_DATA.email}
GitHub: ${PERSONAL_DATA.github}
LinkedIn: ${PERSONAL_DATA.linkedin}
Languages Spoken: ${PERSONAL_DATA.languages.join(", ")}
Education: ${PERSONAL_DATA.education}
Summary: ${PERSONAL_DATA.summary}

Projects Built & Deployed (15+ total, 8 featured):
${PROJECTS.map(p => `- ${p.title} (${p.category}): Stack: ${p.stack.join(", ")}; Metrics: ${p.metricPrimary}, ${p.metricSecondary}; Problem: ${p.problem}; Approach: ${p.approach}; Result: ${p.result}; Links: GitHub ${p.githubUrl}${p.liveUrl ? `, Live ${p.liveUrl}` : ''}`).join("\n")}

Work Experience:
${EXPERIENCES.map(e => `- ${e.role} at ${e.company} (${e.period}):\n  ${e.highlights.join("\n  ")}`).join("\n")}

Certifications:
${CERTIFICATIONS.map(c => `- ${c.title} (${c.issuer}${c.badgeCount ? `, ${c.badgeCount} badges` : ''})`).join("\n")}

TONE & STYLE:
- Respond in a clean, terminal-style engineer persona: precise, confident, analytical, and structured.
- Use brief bullet points or formatted terminal output when presenting metrics, skills, or lists.
- Keep answers focused (2-4 paragraphs max).
- If asked about remote work or availability, confirm that Abdulgeni is actively open for remote contract work, consulting, and full-stack AI engineering roles.
- Speak in first-person plural or as Abdulgeni's AI interface (e.g., "Abdulgeni built...", "Our systems achieved...").
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback intelligent response if API key is not configured
      const lastMessage = messages[messages.length - 1]?.content || "";
      let reply = `[SYSTEM AI RESPONSE]: Accessing knowledge graph for "${lastMessage}"...\n\n`;
      if (lastMessage.toLowerCase().includes("rag") || lastMessage.toLowerCase().includes("built")) {
        reply += `Abdulgeni has architected multiple production RAG systems, notably:\n• Agentic RAG (Python/LangChain/ChromaDB): Achieves 80%+ reduction in search iterations with sub-500ms response times.\n• AI WhatsApp Support Bot (Twilio/ChromaDB): Delivers 24/7 automated support with multi-turn memory and human escalation.\n• Embeddable Chatbot Widget: Ultra-fast single script tag integration for commercial websites.`;
      } else if (lastMessage.toLowerCase().includes("available") || lastMessage.toLowerCase().includes("work") || lastMessage.toLowerCase().includes("remote")) {
        reply += `Yes! Abdulgeni is available for Remote Contract Work & Full Stack AI Engineering projects.\n\nKey Highlights:\n• Location: Addis Ababa, Ethiopia (UTC+3, highly adaptable to US/EU time zones)\n• Contact: ${PERSONAL_DATA.email}\n• Polyglot Communicator: Fluent in English, Arabic, Turkish, Amharic, and Afaan Oromo.`;
      } else {
        reply += `${PERSONAL_DATA.summary}\n\nFeel free to ask about specific projects (e.g., Invoice Extractor MCP Server, Agentic PR Review Bot), tech stack, or get in touch at ${PERSONAL_DATA.email}!`;
      }

      return new Response(reply, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    // Convert messages array to prompt
    const formattedHistory = messages
      .map((m: { role: string; content: string }) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: formattedHistory,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: unknown) {
    console.error("Error in AI Assistant API:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
