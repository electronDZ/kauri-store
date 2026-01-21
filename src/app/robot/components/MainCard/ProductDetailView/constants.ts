export const PRODUCT_DETAILS = [
  { label: "Pattern", value: "Jacquard knit skier pattern" },
  { label: "Fit", value: "regular" },
  { label: "Material", value: "100% organic cotton (GOTS certified)" },
  { label: "Size", value: "12 gauge medium weight mesh" },
  { label: "Details", value: "Ribbed cuffs and neckline" },
  { label: "", value: "Vegan-approved and ethically produced" },
] as const

export const SUSTAINABILITY_HOW: Array<{ title: string; description: string; imageKey: "fairtrade" | "organic" | "vegan" }> = [
  {
    title: "Fair Trade",
    description: "Fair Trade Certified™ is the first step towards paying living wages to those in our supply network.",
    imageKey: "fairtrade",
  },
  {
    title: "GOTS Organic Cotton",
    description: "100% organic cotton (GOTS certified) reduces pesticide use and supports healthier ecosystems and farming communities.",
    imageKey: "organic",
  },
  {
    title: "Vegan & Responsible",
    description: "Vegan-approved and ethically produced—no animal-derived materials, with a focus on responsible manufacturing.",
    imageKey: "vegan",
  },
]

export const SUSTAINABILITY_WHERE: Array<{ title: string; description: string; imageKey: "facility" | "supply" }> = [
  {
    title: "Certified in Europe",
    description: "Manufactured in GOTS-certified facilities in Portugal, supporting local craftsmanship and a smaller shipping footprint.",
    imageKey: "facility",
  },
  {
    title: "Traceable Supply Chain",
    description: "From organic cotton farms to certified mills, we maintain full visibility across our supply network.",
    imageKey: "supply",
  },
]

export const SUSTAINABILITY_IMAGES: Record<string, string> = {
  fairtrade: "/images/robot-screen/materials/fairtrade.png",
  organic: "/images/robot-screen/materials/GOTS.jpg",
  vegan: "/images/robot-screen/materials/vegan.png",
  facility: "/images/robot-screen/main-screen/our-mission.jpg",
  supply: "/images/products/imgi_134_23201-0-20250630153500_02 (1).png",
}

export const BRAND_INFO: Record<string, {
  name: string
  description: string
  mission?: string
  values: string[]
  logo?: string
}> = {
  DEDICATED: {
    name: "DEDICATED",
    description: "DEDICATED is a sustainable fashion brand committed to creating high-quality, ethically produced clothing. Founded with a mission to make sustainable fashion accessible, DEDICATED works exclusively with GOTS-certified organic cotton and Fair Trade Certified™ facilities.",
    mission: "To make sustainable fashion accessible to everyone while maintaining the highest standards of ethical production and environmental responsibility.",
    values: [
      "100% organic cotton (GOTS certified)",
      "Fair Trade Certified™ manufacturing",
      "Vegan-approved materials",
      "Transparent supply chain",
      "Carbon-neutral shipping",
    ],
  },
  ECOALF: {
    name: "ECOALF",
    description: "ECOALF pioneers sustainable fashion by transforming ocean waste and recycled materials into high-quality clothing and accessories. Since 2012, we've been proving that style and sustainability can coexist without compromise, creating innovative products that protect our planet while delivering exceptional design and performance.",
    mission: "There is no planet B. We believe in creating fashion that doesn't compromise on style, quality, or the environment.",
    values: [
      "100% recycled materials",
      "Ocean waste transformation",
      "Circular economy principles",
      "B-Corp certified",
      "Zero-waste production",
    ],
    logo: "/images/robot-screen/brands/ecoalf.jpg",
  },
  LIEWOOD: {
    name: "Liewood",
    description: "Liewood is a Danish children's brand that creates beautiful, sustainable products for babies and kids. With a focus on Scandinavian design and organic materials, Liewood combines aesthetics with environmental consciousness.",
    mission: "To create timeless, high-quality products that are safe for children and kind to the planet.",
    values: [
      "Organic and sustainable materials",
      "Scandinavian design philosophy",
      "Child-safe products",
      "Ethical production",
      "Long-lasting quality",
    ],
  },
  KONGES: {
    name: "Konges Sløjd",
    description: "Konges Sløjd is a Danish brand specializing in organic and sustainable children's products. The brand combines traditional craftsmanship with modern design, creating products that are both beautiful and environmentally responsible.",
    mission: "To create products that inspire play, creativity, and a connection to nature while respecting our planet.",
    values: [
      "Organic cotton and materials",
      "Traditional craftsmanship",
      "Sustainable production",
      "Child-friendly designs",
      "Environmental responsibility",
    ],
  },
  MUSHIE: {
    name: "Mushie",
    description: "Mushie is a modern baby brand that creates sustainable, stylish products for little ones. With a focus on minimalism and sustainability, Mushie offers products made from organic materials that are safe for babies and the environment.",
    mission: "To provide parents with beautiful, sustainable products that make parenting easier and more enjoyable.",
    values: [
      "Organic materials",
      "Minimalist design",
      "Baby-safe products",
      "Sustainable manufacturing",
      "Modern aesthetics",
    ],
  },
}
