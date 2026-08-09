"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data/services";
import { formatPrice, toDateInputValue, formatDateJa } from "@/lib/format";
import type { SlotInfo } from "@/lib/booking";

export default function BookingForm({
  initialServiceSlug,
  initialVariantId,
}: {
  initialServiceSlug?: string;
  initialVariantId?: string;
}) {
  const router = useRouter();

  const defaultService =
    services.find((s) => s.slug === initialServiceSlug) ?? services[0];
  const [serviceSlug, setServiceSlug] = useState(defaultService.slug);

  const service = useMemo(
    () => services.find((s) => s.slug === serviceSlug) ?? services[0],
    [serviceSlug]
  );

  const defaultVariant =
    service.variants.find((v) => v.id === initialVariantId) ??
    service.variants[0];
  const [variantId, setVariantId] = useState(defaultVariant.id);

  // variantId may briefly reference the previous service's menu right after
  // switching services; fall back to that service's first menu for display
  // and payload purposes instead of correcting the state in an effect.
  const variant =
    service.variants.find((v) => v.id === variantId) ?? service.variants[0];

  const handleServiceChange = (nextSlug: string) => {
    setServiceSlug(nextSlug);
    const nextService = services.find((s) => s.slug === nextSlug);
    if (nextService) setVariantId(nextService.variants[0].id);
  };

  const [minDate] = useState(() => toDateInputValue(new Date()));
  const [maxDate] = useState(() =>
    toDateInputValue(new Date(Date.now() + 60 * 24 * 60 * 60 * 1000))
  );

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [closedReason, setClosedReason] = useState<string | null>(null);
  const [selectedTimeInput, setSelectedTimeInput] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Slot data is only ever rendered while `date` is set, so there is
    // nothing to synchronize back to empty state here.
    if (!date) return;
    let cancelled = false;
    // Signalling loading state before kicking off the fetch mirrors React's
    // documented data-fetching effect pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlotsLoading(true);
    setClosedReason(null);
    fetch(
      `/api/bookings/slots?service=${service.slug}&variant=${variant.id}&date=${date}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.closed) {
          setClosedReason(data.reason ?? "この日は予約できません");
          setSlots([]);
        } else {
          setSlots(data.slots ?? []);
        }
      })
      .catch(() => {
        if (!cancelled) setClosedReason("空き状況の取得に失敗しました");
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [service.slug, variant.id, date, refreshKey]);

  // A previously chosen time only counts once it is confirmed present in the
  // freshly loaded slot list for the current service/menu/date combination.
  const selectedTime =
    !slotsLoading &&
    selectedTimeInput &&
    slots.some((s) => s.time === selectedTimeInput && s.available)
      ? selectedTimeInput
      : null;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canSubmit = date && selectedTime && name.trim() && phone.trim() && email.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: service.slug,
          variantId: variant.id,
          date,
          time: selectedTime,
          customerName: name,
          phone,
          email,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.message || "予約に失敗しました。");
        if (res.status === 409) {
          setSelectedTimeInput(null);
          setRefreshKey((k) => k + 1);
        }
        return;
      }
      router.push(`/booking/confirm?id=${data.booking.id}`);
    } catch {
      setSubmitError("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto grid max-w-3xl gap-8 rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-[var(--color-ink)]">サービス</span>
          <select
            value={serviceSlug}
            onChange={(e) => handleServiceChange(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm"
          >
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.icon} {s.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-[var(--color-ink)]">メニュー</span>
          <select
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm"
          >
            {service.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}（{v.durationMinutes}分 / {formatPrice(v.price)}）
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-[var(--color-ink)]">ご希望日</span>
        <input
          type="date"
          value={date}
          min={minDate}
          max={maxDate}
          onChange={(e) => setDate(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm"
        />
        <span className="text-xs text-[var(--color-ink-soft)]">
          定休日：毎週水曜日 ／ 営業時間：10:00〜19:00
        </span>
      </label>

      {date && (
        <div>
          <p className="text-sm font-medium text-[var(--color-ink)]">
            ご希望時間 {date && `（${formatDateJa(date)}）`}
          </p>
          {slotsLoading && (
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
              空き状況を確認しています...
            </p>
          )}
          {!slotsLoading && closedReason && (
            <p className="mt-2 text-sm text-[var(--color-primary-dark)]">{closedReason}</p>
          )}
          {!slotsLoading && !closedReason && slots.length === 0 && (
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
              この日はご案内できる時間がありません。
            </p>
          )}
          {!slotsLoading && !closedReason && slots.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => setSelectedTimeInput(slot.time)}
                  className={`rounded-lg border px-2 py-2 text-xs transition ${
                    !slot.available
                      ? "cursor-not-allowed border-[var(--color-border)] text-[var(--color-ink-soft)]/50 line-through"
                      : selectedTime === slot.time
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-primary)]"
                  }`}
                >
                  {slot.time}
                  {slot.available && typeof slot.spotsLeft === "number" && (
                    <span className="block text-[10px] opacity-80">
                      残{slot.spotsLeft}枠
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedTime && (
        <div className="grid gap-5 border-t border-[var(--color-border)] pt-6 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[var(--color-ink)]">お名前</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm"
              placeholder="山田 花子"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[var(--color-ink)]">電話番号</span>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm"
              placeholder="090-0000-0000"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
            <span className="font-medium text-[var(--color-ink)]">メールアドレス</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm"
              placeholder="example@email.com"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
            <span className="font-medium text-[var(--color-ink)]">
              ご要望・お悩みなど（任意）
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm"
              placeholder="肩こりが気になります、など"
            />
          </label>
        </div>
      )}

      {submitError && (
        <p className="rounded-lg bg-[var(--color-primary)]/10 p-3 text-sm text-[var(--color-primary-dark)]">
          {submitError}
        </p>
      )}

      {selectedTime && (
        <div className="rounded-xl bg-[var(--color-secondary)]/10 p-4 text-sm text-[var(--color-ink)]">
          <p className="font-semibold">ご予約内容</p>
          <p className="mt-1">
            {service.name} - {variant.name}（{variant.durationMinutes}分）
          </p>
          <p>
            {formatDateJa(date)} {selectedTime}〜
          </p>
          <p className="mt-1 font-semibold text-[var(--color-primary-dark)]">
            {formatPrice(variant.price)}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "送信中..." : "この内容で予約する"}
      </button>
    </form>
  );
}
