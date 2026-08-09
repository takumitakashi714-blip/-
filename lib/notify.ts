import nodemailer from "nodemailer";

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendNotification(subject: string, text: string) {
  const transport = getTransport();
  if (!transport) return;

  const to = process.env.NOTIFY_TO_EMAIL || process.env.SMTP_USER;
  const from = process.env.NOTIFY_FROM_EMAIL || process.env.SMTP_USER;
  if (!to || !from) return;

  try {
    await transport.sendMail({ to, from, subject, text });
  } catch (error) {
    console.error("メール通知の送信に失敗しました", error);
  }
}
