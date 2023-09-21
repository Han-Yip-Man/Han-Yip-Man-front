export function extractTime(isoDate: string): string {
  const date = new Date(isoDate)
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}
