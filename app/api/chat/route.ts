import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import {
  PERSONAL_INFO,
  SERVICES,
  SKILLS,
  PROJECTS,
  EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
  LANGUAGES,
} from "@/lib/data";

export const runtime = "nodejs";

const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        "User-Agent": "abdulgeni-portfolio-nextjs",
      },
    },
  });
}

const PORTFOLIO_CONTEXT = JSON.stringify(
  {
    personal: PERSONAL_INFO,
    services: SERVICES,
    skills: SKILLS,
    projects: PROJECTS,
    experience: EXPERIENCE,
    education: EDUCATION,
    certifications: CERTIFICATIONS,
    languages: LANGUAGES,
  },
  null,
  2
);

function buildSystemInstruction(language: string) {
  const languageNote =
    language === "ar"
      ? "The user interface is currently set to Arabic. Reply in Arabic (Modern Standard Arabic) unless the user writes in English."
      : "Reply in English unless the user writes in another language.";

  return `You are a portfolio assistant for Abdulgeni Abdulaziz, a Full Stack AI Engineer.
Answer questions about his skills, projects, experience, availability, education, certifications, and background.
Be concise, precise, and use a slightly technical, professional, but helpful tone that aligns with his brutalist technical brand.
Avoid flowery or excessively hyped language. Keep it objective and engineering-focused.

Strict Scope: Only answer questions about Abdulgeni — politely decline to answer unrelated questions, indicating that you are his dedicated system portfolio assistant.

${languageNote}

PORTFOLIO DATA CONTEXT:
${PORTFOLIO_CONTEXT}
`;
}

interface ChatRequestBody {
  message?: string;
  history?: { role: "user" | "model"; text: string }[];
  language?: string;
}

export async function POST(req: Request) {
  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { message, history, language } = body;

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  if (!ai) {
    return NextResponse.json(
      { error: "Gemini API key is not configured. Please supply GEMINI_API_KEY in your environment." },
      { status: 500 }
    );
  }

  try {
    const mappedHistory = (history || []).map((h) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    }));

    const chat = ai.chats.create({
      // NOTE: the previous build referenced "gemini-3.5-flash", which is not a real
      // model name and would fail on every request. gemini-2.5-flash is the current
      // fast Gemini model and matches what the rest of the portfolio references.
      model: "gemini-2.5-flash",
      history: mappedHistory,
      config: {
        systemInstruction: buildSystemInstruction(language || "en"),
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage({ message });
    return NextResponse.json({ text: result.text });
  } catch (error) {
    console.error("Error during Gemini chat execution:", error);
    return NextResponse.json(
      { error: "Failed to communicate with Gemini. Please try again." },
      { status: 500 }
    );
  }
}
