export function todayStr(): string {
  return toDateStr(new Date())
}

export function toDateStr(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function formatDateJp(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  return `${y}/${m}/${d}`
}
