import Link from "next/link";
import { getBookingById } from "@/lib/booking";
import { formatPrice, formatDateJa } from "@/lib/format";

export default async function BookingConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const booking = id ? getBookingById(Number(id)) : null;

  if (!booking) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-5xl">🙏</p>
        <h1 className="font-brand text-2xl text-[var(--color-ink)]">
          予約情報が見つかりませんでした
        </h1>
        <Link
          href="/booking"
          className="mt-2 rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
        >
          予約ページに戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page flex flex-col items-center gap-6 py-20 text-center">
      <p className="text-5xl">🌸</p>
      <h1 className="font-brand text-2xl text-[var(--color-ink)]">
        ご予約ありがとうございます
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-[var(--color-ink-soft)]">
        ご入力いただいたメールアドレス宛に予約内容をお送りしました。当日はお時間の5分前を目安にお越しください。
      </p>

      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-white p-6 text-left text-sm">
        <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
          <span className="text-[var(--color-ink-soft)]">予約番号</span>
          <span className="font-semibold">#{booking.id}</span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-[var(--color-ink-soft)]">メニュー</span>
            <span>
              {booking.serviceName} - {booking.variantName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-ink-soft)]">日時</span>
            <span>
              {formatDateJa(booking.date)} {booking.time}〜（{booking.durationMinutes}分）
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-ink-soft)]">お名前</span>
            <span>{booking.customerName} 様</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-ink-soft)]">料金</span>
            <span className="font-semibold text-[var(--color-primary-dark)]">
              {formatPrice(booking.price)}
            </span>
          </div>
          {booking.notes && (
            <div className="flex justify-between gap-4">
              <span className="shrink-0 text-[var(--color-ink-soft)]">備考</span>
              <span className="text-right">{booking.notes}</span>
            </div>
          )}
        </div>
      </div>

      <Link
        href="/"
        className="rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
      >
        トップページに戻る
      </Link>
    </div>
  );
}
