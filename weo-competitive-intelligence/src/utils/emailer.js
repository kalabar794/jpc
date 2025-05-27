import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export async function sendEmailReport(htmlReport, changes) {
  // Create transporter
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Prepare email content
  const subject = changes.length > 0 
    ? `🚨 WEO Competitive Intelligence: ${changes.length} Changes Detected`
    : '📊 WEO Competitive Intelligence: Weekly Report';

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: subject,
    html: htmlReport,
    attachments: [
      {
        filename: `competitive-report-${new Date().toISOString().split('T')[0]}.html`,
        content: htmlReport
      }
    ]
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}