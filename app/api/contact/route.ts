import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PERSONAL_INFO } from "@/lib/data";

export const runtime = "nodejs";

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  // NOTE: the previous build only did `console.log(...)` here and returned
  // { success: true } regardless — the "MESSAGE TRANSMITTED" state was cosmetic
  // and no email was ever actually sent. This now actually delivers it via Resend.
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured — contact form cannot send email.");
    return NextResponse.json({ error: "Contact form is not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.CONTACT_TO_EMAIL || PERSONAL_INFO.email;
  // Resend's shared sandbox sender works with zero setup — no domain
  // verification required. Once you verify your own domain in the Resend
  // dashboard, set CONTACT_FROM_EMAIL to something like
  // "Portfolio Contact <contact@yourdomain.com>" to send from your own address.
  const fromAddress = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from: fromAddress,
      to: toEmail,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "MESSAGE TRANSMITTED" });
  } catch (error) {
    console.error("Resend send failed:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }
}
