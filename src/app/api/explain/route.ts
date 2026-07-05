import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ZAI from "z-ai-web-dev-sdk";
import { SYSTEM_PROMPT } from "@/lib/prompts";

export const maxDuration = 30;

/** Minimum length we expect from a useful, well-formed explanation. */
const MIN_RESPONSE_LENGTH = 100;

/** Standard disclaimer appended if the model omits it. */
const DISCLAIMER_FALLBACK =
  "\n\n# Disclaimer\n\nThis explanation is for general education only. It is not medical advice, a diagnosis, or a treatment plan. Always consult a qualified healthcare professional about your specific situation.";

/**
 * Detect whether a Gemini error indicates the API is unavailable in the
 * current environment (geo-restriction, zero quota, or invalid key).
 * In those cases we fall back to the local z-ai SDK so development keeps
 * working; production (Vercel) will use Gemini directly.
 */
function isGeminiUnavailable(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();
  return (
    msg.includes("location is not supported") ||
    msg.includes("quota") ||
    msg.includes("limit: 0") ||
    msg.includes("resource_exhausted") ||
    msg.includes("api key") ||
    msg.includes("api_key") ||
    msg.includes("permission") ||
    msg.includes("unauthorized") ||
    msg.includes("not found")
  );
}

/** Call the real Gemini API. Throws on any error. */
async function callGemini(text: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const result = await model.generateContent(
    `Please explain this medical text in plain language:\n\n${text}`
  );

  return result.response.text();
}

/** Fallback: call the local z-ai SDK (used only when Gemini is unavailable). */
async function callZai(text: string): Promise<string> {
  const zai = await ZAI.create();
  const completion = await zai.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Please explain this medical text in plain language:\n\n${text}`,
      },
    ],
    thinking: { type: "disabled" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from fallback provider.");
  }
  return content;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const text = body?.text;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Paste some medical text first." },
        { status: 400 }
      );
    }

    if (text.length > 12000) {
      return NextResponse.json(
        { error: "That report is too long. Please paste a shorter excerpt." },
        { status: 400 }
      );
    }

    // Try Gemini first (production provider). Fall back to z-ai SDK only if
    // Gemini is unavailable in the current environment (e.g. geo-blocked
    // during local development). On Vercel, Gemini will always be used.
    let content: string;
    try {
      content = await callGemini(text);
    } catch (geminiError) {
      if (isGeminiUnavailable(geminiError)) {
        console.warn(
          "Gemini unavailable, falling back to local SDK. Error:",
          geminiError instanceof Error ? geminiError.message : geminiError
        );
        content = await callZai(text);
      } else {
        throw geminiError;
      }
    }

    if (!content || content.trim().length < MIN_RESPONSE_LENGTH) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Safety net: if the model omitted the mandatory Disclaimer section,
    // append the standard disclaimer so it is always present in the output.
    if (!/^#\s+Disclaimer\b/m.test(content)) {
      return NextResponse.json({ content: content.trimEnd() + DISCLAIMER_FALLBACK });
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Explain API error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error";
    const lowered = message.toLowerCase();
    if (
      lowered.includes("rate") ||
      lowered.includes("429") ||
      lowered.includes("quota")
    ) {
      return NextResponse.json(
        { error: "Too many requests. Try again shortly." },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
