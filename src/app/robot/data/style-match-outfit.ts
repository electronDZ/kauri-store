// Mock outfit recommendation data
// This simulates the AI response for a full outfit recommendation

export interface OutfitItem {
  id: string
  category: "Headwear" | "Outerwear" | "Top" | "Bottom" | "Socks" | "Accessory"
  name: string
  brand: string
  price: number
  originalPrice?: number
  hotspot: { x: number; y: number }
  status: "new" | "sale" | "regular"
  image_placeholder: string
}

export interface OutfitRecommendation {
  outfit_id: string
  theme: string
  items: OutfitItem[]
}

// Mock outfit data based on the AI-generated image description
export const MOCK_OUTFIT: OutfitRecommendation = {
  outfit_id: "mock_001",
  theme: "Urban Winter Texture",
  items: [
    {
      id: "item_1",
      category: "Headwear",
      name: "Love is Love Beanie",
      brand: "Unknown",
      price: 43.0,
      hotspot: { x: 50, y: 12 },
      status: "new",
      image_placeholder: "Black and brown striped beanie with 'LOVE IS LOVE' patch.",
    },
    {
      id: "item_2",
      category: "Outerwear",
      name: "Dark Brown Faux Fur Coat",
      brand: "Unknown",
      price: 118.93,
      originalPrice: 159.99,
      hotspot: { x: 25, y: 40 },
      status: "sale",
      image_placeholder: "Dark brown faux fur teddy coat.",
    },
    {
      id: "item_3",
      category: "Top",
      name: "Light Yellow Ribbed Knit Sweater",
      brand: "Unknown",
      price: 89.5,
      originalPrice: 120.0,
      hotspot: { x: 75, y: 38 },
      status: "sale",
      image_placeholder: "Light yellow ribbed knit crew-neck sweater.",
    },
    {
      id: "item_4",
      category: "Bottom",
      name: "Textured Brown Wide-Leg Trousers",
      brand: "Unknown",
      price: 95.0,
      hotspot: { x: 75, y: 58 },
      status: "regular",
      image_placeholder: "Textured brown wide-leg trousers.",
    },
    {
      id: "item_5",
      category: "Socks",
      name: "Leopard Print Happy Socks",
      brand: "Happy Socks",
      price: 12.99,
      hotspot: { x: 75, y: 82 },
      status: "regular",
      image_placeholder: "Leopard print socks with green cuffs, yellow toes, and blue heels (Happy Socks).",
    },
    {
      id: "item_6",
      category: "Accessory",
      name: "Leopard Print Fingerless Mittens",
      brand: "GIA",
      price: 28.5,
      hotspot: { x: 25, y: 45 },
      status: "regular",
      image_placeholder: "Leopard print fingerless mittens with GIA label.",
    },
  ],
}
