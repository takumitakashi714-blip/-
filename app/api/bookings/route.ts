import { NextRequest, NextResponse } from "next/server";
import { getServiceBySlug, getVariant } from "@/lib/data/services";
import { createBooking, isSlotStillAvailable, isClosedDate, isPastDate } from "@/lib/booking";
import { sendNotification } from "@/lib/notify";
import { formatPrice } from "@/lib/format";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ message: "リクエストが不正です。" }, { status: 400 });
  }

  const { serviceSlug, variantId, date, time, customerName, phone, email, notes } = body;

  const service = getServiceBySlug(serviceSlug ?? "");
  if (!service) {
    return NextResponse.json({ message: "サービスが見つかりません。" }, { status: 400 });
  }
  const variant = getVariant(service, variantId ?? "");
  if (!variant) {
    return NextResponse.json({ message: "メニューが見つかりません。" }, { status: 400 });
  }
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ message: "日付が不正です。" }, { status: 400 });
  }
  if (typeof time !== "string" || !/^\d{2}:\d{2}$/.test(time)) {
    return NextResponse.json({ message: "時間が不正です。" }, { status: 400 });
  }
  if (
    typeof customerName !== "string" ||
    customerName.trim().length === 0 ||
    customerName.length > 100
  ) {
    return NextResponse.json({ message: "お名前を入力してください。" }, { status: 400 });
  }
  if (typeof phone !== "string" || phone.replace(/[^0-9]/g, "").length < 9) {
    return NextResponse.json({ message: "電話番号を正しく入力してください。" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ message: "メールアドレスを正しく入力してください。" }, { status: 400 });
  }
  if (isClosedDate(date)) {
    return NextResponse.json({ message: "定休日（水曜日）は予約できません。" }, { status: 400 });
  }
  if (isPastDate(date)) {
    return NextResponse.json({ message: "過去の日付は予約できません。" }, { status: 400 });
  }
  if (!isSlotStillAvailable(service, variant, date, time)) {
    return NextResponse.json(
      { message: "選択した時間は他のお客様のご予約が入りました。別の時間をお選びください。" },
      { status: 409 }
    );
  }

  const booking = createBooking({
    service,
    variant,
    date,
    time,
    customerName: customerName.trim(),
    phone: phone.trim(),
    email: email.trim(),
    notes: typeof notes === "string" ? notes.trim().slice(0, 500) : undefined,
  });

  await sendNotification(
    `【花笑み】新規予約: ${service.name} ${variant.name}`,
    [
      `お名前: ${booking.customerName}`,
      `電話番号: ${booking.phone}`,
      `メール: ${booking.email}`,
      `サービス: ${service.name} - ${variant.name}（${variant.durationMinutes}分）`,
      `日時: ${booking.date} ${booking.time}`,
      `料金: ${formatPrice(booking.price)}`,
      booking.notes ? `備考: ${booking.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n")
  );

  return NextResponse.json({ booking });
}
