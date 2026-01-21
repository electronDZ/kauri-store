import { SAMPLE_PRODUCTS } from "./products"

export const STYLE_MATCH_PRODUCTS = SAMPLE_PRODUCTS.slice(0, 8)

export const UNDERTONES = [
  { id: "warm", label: "Warm" },
  { id: "cool", label: "Cool" },
  { id: "neutral", label: "Neutral" },
] as const

export const PALETTE_BY_UNDERTONE: Record<string, { token: string; label: string }[]> = {
  warm: [
    { token: "bg-muted", label: "Cream" },
    { token: "bg-kauri-yellow", label: "Warm" },
    { token: "bg-kauri-green", label: "Sage" },
    { token: "bg-foreground", label: "Charcoal" },
  ],
  cool: [
    { token: "bg-muted", label: "Ivory" },
    { token: "bg-kauri-blue", label: "Slate" },
    { token: "bg-foreground", label: "Charcoal" },
  ],
  neutral: [
    { token: "bg-muted", label: "Natural" },
    { token: "bg-kauri-green", label: "Sage" },
    { token: "bg-kauri-yellow", label: "Warm" },
    { token: "bg-foreground", label: "Charcoal" },
  ],
}

export const COLOR_PREFS = [
  { id: "earth", label: "Earth tones" },
  { id: "greens", label: "Greens" },
  { id: "neutrals", label: "Neutrals" },
  { id: "pastels", label: "Soft pastels" },
] as const
