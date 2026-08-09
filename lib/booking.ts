import { getDb } from "@/lib/db";
import { Service, ServiceVariant, Booking } from "@/lib/types";

export const BUSINESS_HOURS = { open: "10:00", close: "19:00" };
export const LUNCH_BREAK = { start: "13:00", end: "14:00" };
export const CLOSED_WEEKDAY = 3; // 水曜定休
export const SLOT_STEP_MINUTES = 30;
export const BOOKABLE_DAYS_AHEAD = 60;

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function toTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function isClosedDate(dateStr: string): boolean {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return true;
  return date.getDay() === CLOSED_WEEKDAY;
}

export function isPastDate(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(`${dateStr}T00:00:00`);
  return date.getTime() < today.getTime();
}

export type SlotInfo = {
  time: string;
  available: boolean;
  spotsLeft?: number;
};

function overlaps(
  startA: number,
  endA: number,
  startB: number,
  endB: number
): boolean {
  return startA < endB && startB < endA;
}

export function getAvailableSlots(
  service: Service,
  variant: ServiceVariant,
  dateStr: string
): SlotInfo[] {
  if (isClosedDate(dateStr) || isPastDate(dateStr)) return [];

  const db = getDb();
  const isToday =
    new Date(`${dateStr}T00:00:00`).toDateString() === new Date().toDateString();
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

  if (service.category === "class") {
    const times = service.classTimes ?? [];
    return times
      .filter((t) => !isToday || toMinutes(t) > nowMinutes)
      .map((time) => {
        const row = db
          .prepare(
            `SELECT COUNT(*) as count FROM bookings
             WHERE service_slug = ? AND date = ? AND time = ? AND status = 'confirmed'`
          )
          .get(service.slug, dateStr, time) as { count: number };
        const spotsLeft = (service.capacity ?? 0) - row.count;
        return { time, available: spotsLeft > 0, spotsLeft };
      });
  }

  const treatmentBookings = db
    .prepare(
      `SELECT time, duration_minutes as durationMinutes
       FROM bookings
       WHERE date = ? AND status = 'confirmed'`
    )
    .all(dateStr) as { time: string; durationMinutes: number }[];

  const openMin = toMinutes(BUSINESS_HOURS.open);
  const closeMin = toMinutes(BUSINESS_HOURS.close);
  const lunchStart = toMinutes(LUNCH_BREAK.start);
  const lunchEnd = toMinutes(LUNCH_BREAK.end);

  const slots: SlotInfo[] = [];
  for (
    let start = openMin;
    start + variant.durationMinutes <= closeMin;
    start += SLOT_STEP_MINUTES
  ) {
    const end = start + variant.durationMinutes;
    if (isToday && start <= nowMinutes) continue;

    const inLunch = overlaps(start, end, lunchStart, lunchEnd);
    const conflict = treatmentBookings.some((b) => {
      const bStart = toMinutes(b.time);
      const bEnd = bStart + b.durationMinutes;
      return overlaps(start, end, bStart, bEnd);
    });

    slots.push({
      time: toTimeString(start),
      available: !inLunch && !conflict,
    });
  }

  return slots;
}

export function isSlotStillAvailable(
  service: Service,
  variant: ServiceVariant,
  dateStr: string,
  time: string
): boolean {
  const slots = getAvailableSlots(service, variant, dateStr);
  const slot = slots.find((s) => s.time === time);
  return !!slot && slot.available;
}

export type CreateBookingInput = {
  service: Service;
  variant: ServiceVariant;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  email: string;
  notes?: string;
};

export function createBooking(input: CreateBookingInput): Booking {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO bookings
        (service_slug, service_name, variant_id, variant_name, duration_minutes, price, date, time, customer_name, phone, email, notes, status)
       VALUES (@serviceSlug, @serviceName, @variantId, @variantName, @durationMinutes, @price, @date, @time, @customerName, @phone, @email, @notes, 'confirmed')`
    )
    .run({
      serviceSlug: input.service.slug,
      serviceName: input.service.name,
      variantId: input.variant.id,
      variantName: input.variant.name,
      durationMinutes: input.variant.durationMinutes,
      price: input.variant.price,
      date: input.date,
      time: input.time,
      customerName: input.customerName,
      phone: input.phone,
      email: input.email,
      notes: input.notes ?? null,
    });

  const row = db
    .prepare("SELECT * FROM bookings WHERE id = ?")
    .get(result.lastInsertRowid) as Record<string, unknown>;

  return rowToBooking(row);
}

function rowToBooking(row: Record<string, unknown>): Booking {
  return {
    id: row.id as number,
    serviceSlug: row.service_slug as string,
    serviceName: row.service_name as string,
    variantId: row.variant_id as string,
    variantName: row.variant_name as string,
    durationMinutes: row.duration_minutes as number,
    price: row.price as number,
    date: row.date as string,
    time: row.time as string,
    customerName: row.customer_name as string,
    phone: row.phone as string,
    email: row.email as string,
    notes: row.notes as string | null,
    status: row.status as Booking["status"],
    createdAt: row.created_at as string,
  };
}

export function getBookingById(id: number): Booking | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM bookings WHERE id = ?").get(id) as
    | Record<string, unknown>
    | undefined;
  return row ? rowToBooking(row) : null;
}
