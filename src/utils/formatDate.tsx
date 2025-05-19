export function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate) return ''

  const date = new Date(isoDate)

  if (isNaN(date.getTime())) return ''

  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}
