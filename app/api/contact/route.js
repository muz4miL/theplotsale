import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildConciergeEmailContent } from '@/lib/concierge-email';

const DEFAULT_TO = 'HamzaSiddique2000@gmail.com';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function trimField(value, max) {
  const s = String(value ?? '').trim();
  if (s.length > max) return s.slice(0, max);
  return s;
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    if (body.website || body._gotcha) {
      return NextResponse.json({ success: true, message: 'Thank you.' }, { status: 200 });
    }

    const name = trimField(body.name, 120);
    const email = trimField(body.email, 254).toLowerCase();
    const phone = trimField(body.phone, 40);
    const message = trimField(body.message, 5000);

    if (name.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please enter your full name.' },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }
    if (phone.length < 5) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid phone number.' },
        { status: 400 }
      );
    }
    if (message.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Please share a few more details in your message.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM?.trim();
    const to = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO;

    if (!apiKey || !from) {
      console.error('Contact form: missing RESEND_API_KEY or RESEND_FROM');
      return NextResponse.json(
        {
          success: false,
          message:
            'Email is not configured yet. Please add RESEND_API_KEY and RESEND_FROM in the server environment.',
        },
        { status: 503 }
      );
    }

    const submittedAtIso = new Date().toISOString();
    const { html, text } = buildConciergeEmailContent({
      name,
      email,
      phone,
      message,
      submittedAtIso,
    });

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Concierge request · ${name}`,
      html,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: error.message || 'Failed to send message. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Your request was sent successfully.', id: data?.id },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
