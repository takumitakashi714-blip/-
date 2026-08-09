import { NextRequest, NextResponse } from "next/server";
import { sendNotification } from "@/lib/notify";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { name, email, message } = body ?? {};

  if (typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
    return NextResponse.json({ message: "お名前を入力してください。" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ message: "メールアドレスを正しく入力してください。" }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length === 0 || message.length > 2000) {
    return NextResponse.json({ message: "お問い合わせ内容を入力してください。" }, { status: 400 });
  }

  await sendNotification(
    `【花笑み】お問い合わせ: ${name}`,
    `お名前: ${name}\nメール: ${email}\n\n${message}`
  );

  return NextResponse.json({ ok: true });
}
