import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { markOrderPaid, getOrderByStripeSession } from "@/lib/orders";
import { formatPrice } from "@/lib/format";
import ClearCartOnMount from "@/components/ClearCartOnMount";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  let orderTotal: number | null = null;

  if (sessionId) {
    const stripe = getStripe();
    if (stripe) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === "paid") {
          const order = markOrderPaid(sessionId, session.customer_details?.email ?? null);
          orderTotal = order?.totalAmount ?? null;
        }
      } catch {
        const order = getOrderByStripeSession(sessionId);
        orderTotal = order?.totalAmount ?? null;
      }
    }
  }

  return (
    <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
      <ClearCartOnMount />
      <p className="text-5xl">🎉</p>
      <h1 className="font-brand text-2xl text-[var(--color-ink)]">
        ご注文ありがとうございます
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-[var(--color-ink-soft)]">
        ご注文の確認メールをお送りしました。発送準備が整い次第、あらためてご連絡いたします。
      </p>
      {orderTotal !== null && (
        <p className="text-lg font-semibold text-[var(--color-primary-dark)]">
          お支払い金額: {formatPrice(orderTotal)}
        </p>
      )}
      <Link
        href="/shop"
        className="mt-2 rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
      >
        ショップに戻る
      </Link>
    </div>
  );
}
