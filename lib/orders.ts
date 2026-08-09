import { getDb } from "@/lib/db";
import { CartItem, Order } from "@/lib/types";

function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as number,
    stripeSessionId: row.stripe_session_id as string | null,
    status: row.status as Order["status"],
    customerEmail: row.customer_email as string | null,
    totalAmount: row.total_amount as number,
    items: JSON.parse(row.items as string),
    createdAt: row.created_at as string,
  };
}

export function createPendingOrder(
  items: CartItem[],
  totalAmount: number,
  stripeSessionId: string
): Order {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO orders (stripe_session_id, status, total_amount, items)
       VALUES (?, 'pending', ?, ?)`
    )
    .run(stripeSessionId, totalAmount, JSON.stringify(items));
  const row = db
    .prepare("SELECT * FROM orders WHERE id = ?")
    .get(result.lastInsertRowid) as Record<string, unknown>;
  return rowToOrder(row);
}

export function markOrderPaid(
  stripeSessionId: string,
  customerEmail: string | null
): Order | null {
  const db = getDb();
  db.prepare(
    `UPDATE orders SET status = 'paid', customer_email = ? WHERE stripe_session_id = ?`
  ).run(customerEmail, stripeSessionId);
  const row = db
    .prepare("SELECT * FROM orders WHERE stripe_session_id = ?")
    .get(stripeSessionId) as Record<string, unknown> | undefined;
  return row ? rowToOrder(row) : null;
}

export function getOrderByStripeSession(stripeSessionId: string): Order | null {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM orders WHERE stripe_session_id = ?")
    .get(stripeSessionId) as Record<string, unknown> | undefined;
  return row ? rowToOrder(row) : null;
}
