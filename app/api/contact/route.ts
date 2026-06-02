import { NextResponse } from 'next/server';

// Define the expected structure of the contact message
interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { name, email, message } = body;

    // 1. Basic Validation
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

    // 2. Integration Placeholder
    // You can integrate services like Resend, Nodemailer, or Supabase here.
    // Example (Resend):
    // const { data, error } = await resend.emails.send({
    //   from: 'Portfolio Contact <onboarding@resend.dev>',
    //   to: 'abdulgeniabdulaziz@gmail.com',
    //   subject: `New Portfolio Message from ${name}`,
    //   text: `From: ${email}\n\nMessage:\n${message}`,
    // });

    // Mock delay to demonstrate UI loading state
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log message details on the server for visibility during local development
    console.log('Valid Contact Submission received:', { name, email, message });

    return NextResponse.json(
      { success: true, message: 'Thank you! Your message has been received.' },
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