import nodemailer from 'nodemailer';

let transporter = null;

const getTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
};

// Fails gracefully: logs and returns false if email is not configured.
const sendEmail = async ({ to, subject, html }) => {
  const t = getTransporter();
  if (!t) {
    console.log(`[email skipped — SMTP not configured] To: ${to} | ${subject}`);
    return false;
  }
  try {
    await t.sendMail({
      from: `${process.env.FROM_NAME || 'Anjali PG'} <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error('Email send failed:', err.message);
    return false;
  }
};

export default sendEmail;
