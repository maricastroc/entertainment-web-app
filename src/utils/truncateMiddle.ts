export function truncateMiddle(str: string, maxLength = 30) {
  if (str.length <= maxLength) return str
  const half = Math.floor((maxLength - 3) / 2)
  return `${str.slice(0, half)}...${str.slice(-half)}`
}
