import { NextRequest, NextResponse } from "next/server";
import { getServiceBySlug, getVariant } from "@/lib/data/services";
import { getAvailableSlots, isClosedDate, isPastDate } from "@/lib/booking";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const serviceSlug = searchParams.get("service") ?? "";
  const variantId = searchParams.get("variant") ?? "";
  const date = searchParams.get("date") ?? "";

  const service = getServiceBySlug(serviceSlug);
  if (!service) {
    return NextResponse.json({ message: "サービスが見つかりません。" }, { status: 400 });
  }
  const variant = getVariant(service, variantId);
  if (!variant) {
    return NextResponse.json({ message: "メニューが見つかりません。" }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ message: "日付が不正です。" }, { status: 400 });
  }

  if (isClosedDate(date)) {
    return NextResponse.json({ slots: [], closed: true, reason: "定休日（水曜日）です" });
  }
  if (isPastDate(date)) {
    return NextResponse.json({ slots: [], closed: true, reason: "過去の日付は選択できません" });
  }

  const slots = getAvailableSlots(service, variant, date);
  return NextResponse.json({ slots, closed: false });
}
