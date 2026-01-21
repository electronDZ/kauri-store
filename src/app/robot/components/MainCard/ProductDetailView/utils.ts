export function parseNameAndBrand (name: string): { displayName: string; brand: string | null } {
  const i = name.lastIndexOf(" | ")
  if (i === -1) return { displayName: name, brand: null }
  return { displayName: name.slice(0, i), brand: name.slice(i + 3) }
}

export function parsePoints (price: string): number {
  const num = parseFloat(price.replace(",", ".").replace(/[^\d.]/g, "") || "0")
  return Math.round(num)
}

export function derivePositionFromId (id: number) {
  const x = 20 + ((id * 13) % 60)
  const y = 18 + ((id * 17) % 60)
  return { x, y }
}

export function clampToCanvas (pos: { x: number; y: number }) {
  return {
    x: Math.min(94, Math.max(6, pos.x)),
    y: Math.min(64, Math.max(6, pos.y)),
  }
}
