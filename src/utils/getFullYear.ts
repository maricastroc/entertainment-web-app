export function getFullYear(date: string) {
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()

  return year
}
