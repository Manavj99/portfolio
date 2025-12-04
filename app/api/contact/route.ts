import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Get recipient email from environment or use default
    const recipientEmail = process.env.CONTACT_EMAIL || "manavj99@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: recipientEmail,
          replyTo: email,
          subject: `Portfolio Contact Form: ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #4a9eff; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <div style="background: #fff; padding: 20px; border-left: 4px solid #4a9eff; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Message:</h3>
                <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
                <p>This email was sent from your portfolio contact form.</p>
              </div>
            </div>
          `,
        });

        if (error) {
          console.error("Resend error:", error);
          return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
          );
        }

        console.log("Email sent successfully:", data);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Fall through to return success even if email fails (to prevent form errors)
        // In production, you might want to log this to a service like Sentry
      }
    } else {
      // Development mode - just log
      console.log("Contact Form Submission (No API Key):", {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

