import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildConciergeEmailContent } from '@/lib/concierge-email';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM || 'ThePlotSale <no-reply@theplotsale.com>';
const TO = process.env.CONTACT_TO_EMAIL || 'hamzasiddique2000@gmail.com';

// Simple rate limiter: max 3 submissions per IP per hour
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3;

function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) return false;
  if (now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.delete(ip);
    return false;
  }
  return record.count >= RATE_LIMIT_MAX;
}

function incrementRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
  } else {
    record.count += 1;
  }
}

/**
 * POST /api/contact
 * Accepts concierge enquiries from HomeContact and ContactPage.
 * Sends a luxury transactional email to the client via Resend.
 */
export async function POST(request) {
  const ip = getClientIP(request);

  if (isRateLimited(ip)) {
    console.warn('🚫 Rate limit hit for IP:', ip);
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const { name, email, phone, message, website } = body;

  // Honeypot check (bots often fill hidden "website" field)
  if (website && String(website).trim().length > 0) {
    console.log('🤖 Honeypot triggered — silently dropping spam from IP:', ip);
    // Return fake success so bots don't know they were caught
    return NextResponse.json(
      { success: true, message: 'Thank you. We will be in touch shortly.' },
      { status: 200 }
    );
  }

  // Validation
  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { success: false, message: 'Please fill in all required fields.' },
      { status: 400 }
    );
  }

  const nameStr = String(name).trim();
  const emailStr = String(email).trim();
  const phoneStr = String(phone).trim();
  const messageStr = String(message).trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailStr)) {
    return NextResponse.json(
      { success: false, message: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  if (messageStr.length < 10) {
    return NextResponse.json(
      { success: false, message: 'Message is too short. Please share a bit more detail.' },
      { status: 400 }
    );
  }

  incrementRateLimit(ip);

  const { html, text } = buildConciergeEmailContent({
    name: nameStr,
    email: emailStr,
    phone: phoneStr,
    message: messageStr,
    submittedAtIso: new Date().toISOString(),
  });

  try {
    console.log('📧 Sending concierge enquiry from:', emailStr, '| IP:', ip);

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: emailStr,
      subject: `New enquiry — ${nameStr} · The Plot Sale`,
      html,
      text,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Could not send your request. Please try again.' },
        { status: 500 }
      );
    }

    console.log('✅ Email sent. Resend ID:', data?.id);

    return NextResponse.json(
      { success: true, message: 'Thank you. We will be in touch shortly.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('❌ Unexpected error sending email:', err);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}