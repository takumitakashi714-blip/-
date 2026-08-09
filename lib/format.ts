export function formatPrice(amount: number): string {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

export function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const WEEKDAY_JA = ["日", "月", "火", "水", "木", "金", "土"];

export function formatDateJa(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return `${date.getMonth() + 1}月${date.getDate()}日(${WEEKDAY_JA[date.getDay()]})`;
}
