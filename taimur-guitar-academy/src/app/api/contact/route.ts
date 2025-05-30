import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, phone, email, message, lessonDate, lessonTime, lessonDuration, lessonPrice } = await request.json();

    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Determine if this is a lesson booking or a general inquiry
    const isLessonBooking = lessonDate && lessonTime && lessonDuration && lessonPrice;
    const subject = isLessonBooking
      ? `🎸 New Lesson Booking from ${name} | Taimur's Guitar Academy`
      : `🎸 New Inquiry from ${name} | Taimur's Guitar Academy`;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1560a8; border-bottom: 2px solid #1560a8; padding-bottom: 8px; margin-bottom: 0;">
            ${isLessonBooking ? 'New Lesson Booking' : 'New Guitar Academy Inquiry'}
          </h2>
          <div style="background: #f5faff; padding: 24px; border-radius: 12px; margin-top: 18px; box-shadow: 0 2px 8px 0 #0001; border: 2px solid #1560a8;">
            <div style="margin-bottom: 18px;">
              <p style="margin: 4px 0;"><strong style="color: #1560a8;">Name:</strong> ${name}</p>
              <p style="margin: 4px 0;"><strong style="color: #1560a8;">Phone:</strong> ${phone}</p>
              <p style="margin: 4px 0;"><strong style="color: #1560a8;">Email:</strong> ${email}</p>
            </div>
            ${isLessonBooking ? `
            <div style="margin-bottom: 18px;">
              <h3 style="color: #1560a8; margin: 0 0 8px 0; font-size: 1.1em;">Lesson Details</h3>
              <div style="background: white; padding: 14px; border-radius: 6px; border: 1px solid #e3f2fd; color: #222;">
                <p><strong>Date:</strong> ${lessonDate}</p>
                <p><strong>Time:</strong> ${lessonTime}</p>
                <p><strong>Duration:</strong> ${lessonDuration} minutes</p>
                <p><strong>Price:</strong> $${lessonPrice}</p>
              </div>
            </div>
            ` : ''}
            <div style="margin-bottom: 18px;">
              <h3 style="color: #1560a8; margin: 0 0 8px 0; font-size: 1.1em;">Message</h3>
              <div style="background: white; padding: 14px; border-radius: 6px; border: 1px solid #e3f2fd; white-space: pre-line; color: #222;">${message}</div>
            </div>
          </div>
          <div style="margin-top: 28px; font-size: 14px; color: #888; text-align: center;">
            <span style="color: #1560a8; font-weight: bold;">Taimur's Guitar Academy</span><br/>
            <span>Professional Guitar Lessons</span>
            <hr style="margin: 18px 0; border: none; border-top: 1px solid #1560a8;" />
            <span style="font-size: 13px; color: #aaa;">Powered by <b style='color:#1560a8;'>Websmith</b> — Your Web Presence, Perfected.</span>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 