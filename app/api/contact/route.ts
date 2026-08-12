import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: 'Abdulgeni Portfolio <onboarding@resend.dev>',
        to: ['abdulgeniabdulaziz@gmail.com'],
        subject: `[PORTFOLIO TRANSMISSION] New message from ${name}`,
        replyTo: email,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    } else {
      console.log(`[CONTACT FORM TRANSMISSION LOGGED]`);
      console.log(`From: ${name} (${email})`);
      console.log(`Message: ${message}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Transmission received and logged successfully.',
    });
  } catch (error: unknown) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to transmit message. Please try again.' },
      { status: 500 }
    );
  }
}
