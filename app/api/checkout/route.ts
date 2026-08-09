import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductBySlug } from "@/lib/data/products";
import { createPendingOrder } from "@/lib/orders";
import { CartItem } from "@/lib/types";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      {
        message:
          "現在オンライン決済の設定準備中です。お手数ですがお電話またはお問い合わせフォームよりご注文ください。",
      },
      { status: 501 }
    );
  }

  const body = await req.json().catch(() => null);
  const cartItems: CartItem[] = Array.isArray(body?.items) ? body.items : [];
  if (cartItems.length === 0) {
    return NextResponse.json({ message: "カートが空です。" }, { status: 400 });
  }

  const lineItems = [];
  let totalAmount = 0;

  for (const item of cartItems) {
    const product = getProductBySlug(item.slug);
    if (!product) {
      return NextResponse.json(
        { message: `商品が見つかりません: ${item.slug}` },
        { status: 400 }
      );
    }
    const quantity = Math.max(1, Math.min(product.stock, Math.floor(item.quantity)));
    totalAmount += product.price * quantity;
    lineItems.push({
      price_data: {
        currency: "jpy",
        product_data: { name: product.name },
        unit_amount: product.price,
      },
      quantity,
    });
  }

  const origin = req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
  });

  createPendingOrder(cartItems, totalAmount, session.id);

  return NextResponse.json({ url: session.url });
}
