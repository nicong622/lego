export function uniqueId(): string {
  return (Math.random() * 100000000).toFixed(0)
}