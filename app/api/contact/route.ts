<<<<<<< HEAD
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
=======
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'abdulgeniabdulaziz@gmail.com',
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
          <h2 style="color: #818cf8; margin-bottom: 24px;">New Portfolio Contact Message</h2>

          <div style="background: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="margin: 0 0 6px; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Name</p>
            <p style="margin: 0; font-weight: 600; font-size: 15px;">${name}</p>
          </div>

          <div style="background: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="margin: 0 0 6px; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Email</p>
            <p style="margin: 0;"><a href="mailto:${email}" style="color: #818cf8; text-decoration: none;">${email}</a></p>
          </div>

          <div style="background: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 6px; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="margin: 0; line-height: 1.7; font-size: 14px;">${message.replace(/\n/g, '<br/>')}</p>
          </div>

          <p style="margin: 0; font-size: 11px; color: #475569;">
            Sent from abdulgeni-abdulaziz.vercel.app · Reply directly to this email to respond to ${name}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Thank you! Your message has been received. I will get back to you within 24 hours.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
>>>>>>> 310d1b85f6650eb9992b428c73310bfb174ef3f6
