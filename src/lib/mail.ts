import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"auth application otp" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Reset OTP - authApp",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>You requested to reset your password. Use the code below to proceed:</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="letter-spacing: 5px; margin: 0; color: #1f2937;">${otp}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p style="font-size: 12px; color: #666;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}