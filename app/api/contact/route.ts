/**
 * Contact form API route.
 * Validates form input, rate-limits by IP, and logs the submission.
 * When RESEND_API_KEY is configured, sends email to the hotel owner.
 * Without it, logs the message to console for review.
 */

import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, rateLimitHeaders } from "@/lib/rateLimit";
import { logger } from "@/lib/logger";

/** Shape of the expected contact form request body */
type ContactFormBody = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

/** Simple email format validation */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** Simple phone format validation — allows digits, spaces, +, -, () */
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Sanitizes a string to prevent XSS — strips HTML tags and trims whitespace.
 */
function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/**
 * Validates the contact form body and returns an array of error messages.
 * Returns an empty array if everything is valid.
 */
function validateBody(body: ContactFormBody): string[] {
  const errors: string[] = [];

  if (!body.name || sanitize(body.name).length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!body.email || !isValidEmail(body.email)) {
    errors.push("Please provide a valid email address");
  }

  if (!body.phone || !isValidPhone(body.phone)) {
    errors.push("Please provide a valid phone number");
  }

  if (!body.message || sanitize(body.message).length < 10) {
    errors.push("Message must be at least 10 characters");
  }

  if (body.message && sanitize(body.message).length > 2000) {
    errors.push("Message must be under 2000 characters");
  }

  return errors;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Rate limit check — 5 requests per IP per hour
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimit = checkRateLimit(ip, 5, 60 * 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: rateLimitHeaders(rateLimit),
        }
      );
    }

    // 2. Parse and validate the request body
    let body: ContactFormBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const errors = validateBody(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    // 3. Sanitize all input
    const sanitizedData = {
      name: sanitize(body.name),
      email: sanitize(body.email),
      phone: sanitize(body.phone),
      message: sanitize(body.message),
    };

    // 4. Send the email (or log if RESEND_API_KEY is not configured)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // When Resend is configured, send the actual email
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "The Hidden Treasure <noreply@thehiddentreasure.in>",
            to: "thehiddentreasure16@gmail.com",
            subject: `New Contact Form: ${sanitizedData.name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${sanitizedData.name}</p>
              <p><strong>Email:</strong> ${sanitizedData.email}</p>
              <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
              <p><strong>Message:</strong></p>
              <p>${sanitizedData.message}</p>
              <hr />
              <p style="color: #666; font-size: 12px;">
                Sent from thehiddentreasure.in contact form at ${new Date().toISOString()}
              </p>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errorData = await emailResponse.text();
          logger.error("resend_email_failed", {
            status: emailResponse.status,
            error: errorData,
          });
          // Don't fail the whole request — log and continue
        } else {
          logger.info("resend_email_sent", {
            to: "thehiddentreasure16@gmail.com",
            from: sanitizedData.name,
          });
        }
      } catch (emailError) {
        logger.error("resend_email_error", {
          error: (emailError as Error).message,
        });
      }
    } else {
      // No Resend key — log the submission to console
      logger.info("contact_form_received_no_email", {
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        messageLength: sanitizedData.message.length,
      });
    }

    const durationMs = Date.now() - startTime;
    logger.info("contact_form_success", { durationMs, ip });

    return NextResponse.json(
      { success: true, message: "Your message has been received. We'll get back to you within 24 hours." },
      {
        status: 200,
        headers: rateLimitHeaders(rateLimit),
      }
    );
  } catch (error) {
    const durationMs = Date.now() - startTime;
    logger.error("contact_form_error", {
      error: (error as Error).message,
      durationMs,
    });

    return NextResponse.json(
      { error: "Something went wrong. Please try calling us directly at +91 89200 18563." },
      { status: 500 }
    );
  }
}
