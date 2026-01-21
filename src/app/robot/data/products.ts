export const PRODUCT_CATEGORIES = [
  { id: "woman", label: "Woman" },
  { id: "man", label: "Man" },
  { id: "baby-kids", label: "Baby & Kids" },
  { id: "bags-accessories", label: "Bags & Accessories" },
  { id: "cosmetics", label: "Cosmetics" },
  { id: "home-lifestyle", label: "Home & Lifestyle" },
  { id: "gift-ideas", label: "Gift Ideas" },
] as const

export const SORT_OPTIONS = [
  { id: "date-new", label: "Date, new to old" },
  { id: "date-old", label: "Date, old to new" },
  { id: "price-low", label: "Price, low to high" },
  { id: "price-high", label: "Price, high to low" },
] as const

export const PRODUCT_TYPES = [
  { id: "bath-toys", label: "Bath toys", count: 6 },
  { id: "beanie-hat", label: "Beanie & hat", count: 15 },
  { id: "bibs-placemat", label: "Bibs & placemat", count: 22 },
  { id: "dishes-cluttery", label: "Dishes & cluttery", count: 18 },
  { id: "gloves", label: "Gloves", count: 3 },
  { id: "nails", label: "nails", count: 2 },
] as const

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const

export const COLORS = [
  { id: "black", label: "Black", hex: "#000000" },
  { id: "white", label: "White", hex: "#FFFFFF" },
  { id: "beige", label: "Beige", hex: "#F5F5DC" },
  { id: "brown", label: "Brown", hex: "#8B4513" },
  { id: "green", label: "Green", hex: "#22C55E" },
  { id: "blue", label: "Blue", hex: "#3B82F6" },
] as const

export const BRANDS = [
  { id: "liewood", label: "Liewood" },
  { id: "konges", label: "Konges Sløjd" },
  { id: "mushie", label: "Mushie" },
] as const

export const MATERIALS = [
  { id: "cotton", label: "Organic Cotton" },
  { id: "wool", label: "Wool" },
  { id: "bamboo", label: "Bamboo" },
  { id: "recycled", label: "Recycled Materials" },
] as const

const PRODUCT_IMAGES = [
  "imgi_113_415_b6e76f16-6b22-4cb3-a69e-e477c8734330.jpg",
  "imgi_116_221_1f162416-7463-4678-84aa-13e699325ada.jpg",
  "imgi_118_VTD-SCARF-RPL-025.jpg",
  "imgi_119_2543004-80_01.jpg",
  "imgi_119_MCMGAJKNEWIC0255W25-42-20250630133500_01.png",
  "imgi_121_25311402.jpg",
  "imgi_122_MCWGAJKLORA00740W25-32-20250630133500_02.png",
  "imgi_123_5_b0a45405-ca77-444c-ad06-e30ff054ed60.jpg",
  "imgi_124_6_45432588-2253-47b6-8cc2-f068cc9083e7.jpg",
  "imgi_124_MCMGAJKTASKA0042W25-52-20250630133500_01.png",
  "imgi_125_Sneaker_Uriduri_Brown_Unisex___Id.Eight.jpg",
  "imgi_126_MCWGAJKGLAMO0255W25.jpg",
  "imgi_127_MCWGAJKGLAMO0255W25_7.jpg",
  "imgi_127_VTD-TEDDY-SCARF-RPL-WL-002.jpg",
  "imgi_128_25331452-52_01.jpg",
  "imgi_128_VTD-TEDDY-SCARF-RPL-WL-002_2.jpg",
  "imgi_129_25331452-52_02.jpg",
  "imgi_130_14460-10-20250926071105_02.png",
  "imgi_130_167_67380d19-0a2a-4761-b44f-c76afce525c3.jpg",
  "imgi_131_WPT00242-10_01.jpg",
  "imgi_132_183_6bf2f647-23ef-4b6c-83d3-6bf0f0f8d23f.jpg",
  "imgi_134_13302-70-20250926071105_01.png",
  "imgi_134_23201-0-20250630153500_02 (1).png",
  "imgi_135_13302-70-20250926071105_02.png",
] as const

function productImage (i: number) {
  return `/images/products/${PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]}`
}

export const SAMPLE_PRODUCTS = [
  { id: 1, name: "Lewis Muslin Cloth 2 Pack Around The World", price: "€23,90", image: productImage(0), isNew: true, category: "baby-kids" },
  { id: 2, name: "Teddy Berto Walrus Stone Beige", price: "€34,90", image: productImage(1), isNew: true, category: "baby-kids" },
  { id: 3, name: "Lewis Muslin Cloth 2 Pack Mini Butterfly", price: "€23,90", image: productImage(2), isNew: true, category: "baby-kids" },
  { id: 4, name: "Teddy Berto Panda Sandy", price: "€34,90", image: productImage(3), isNew: true, category: "gift-ideas" },
  { id: 5, name: "Sustainable Tote Bag", price: "€39,90", image: productImage(4), isNew: false, category: "bags-accessories" },
  { id: 6, name: "Organic Cotton Dress", price: "€79,90", image: productImage(5), isNew: false, category: "woman" },
  { id: 7, name: "Eco-Friendly T-Shirt", price: "€49,90", image: productImage(6), isNew: false, category: "man" },
  { id: 8, name: "Natural Skincare Set", price: "€59,90", image: productImage(7), isNew: true, category: "cosmetics" },
  { id: 9, name: "Bamboo Home Decor", price: "€34,90", image: productImage(8), isNew: false, category: "home-lifestyle" },
  { id: 10, name: "Sustainable Backpack", price: "€89,90", image: productImage(9), isNew: true, category: "bags-accessories" },
  { id: 11, name: "Gift Box Deluxe", price: "€99,90", image: productImage(10), isNew: true, category: "gift-ideas" },
  { id: 12, name: "Organic Face Serum", price: "€44,90", image: productImage(11), isNew: false, category: "cosmetics" },
  { id: 13, name: "Kids Organic Cotton Hoodie | Liewood", price: "€42,90", image: productImage(12), isNew: true, category: "baby-kids" },
  { id: 14, name: "Liewood Bamboo Kids Plate & Cutlery Set", price: "€28,90", image: productImage(13), isNew: true, category: "baby-kids" },
  { id: 15, name: "Children's Striped Cotton Sweater", price: "€36,90", image: productImage(14), isNew: false, category: "baby-kids" },
  { id: 16, name: "Toddler Fleece Jacket | Organic", price: "€54,90", image: productImage(15), isNew: true, category: "baby-kids" },
  { id: 17, name: "Kids Reversible Puffer Vest", price: "€48,90", image: productImage(16), isNew: false, category: "baby-kids" },
  { id: 18, name: "Baby Organic Romper & Hat Set", price: "€32,90", image: productImage(17), isNew: true, category: "baby-kids" },
  { id: 19, name: "Children's Wool Blend Cardigan", price: "€62,90", image: productImage(18), isNew: true, category: "baby-kids" },
  { id: 20, name: "Kids Cotton Joggers | GOTS", price: "€38,90", image: productImage(19), isNew: false, category: "baby-kids" },
  { id: 21, name: "Toddler Printed T-Shirt | Organic", price: "€24,90", image: productImage(20), isNew: false, category: "baby-kids" },
  { id: 22, name: "Kids Knit Beanie | Konges Sløjd", price: "€22,90", image: productImage(21), isNew: true, category: "baby-kids" },
  { id: 23, name: "Baby Muslin Swaddle 2-Pack", price: "€26,90", image: productImage(22), isNew: false, category: "baby-kids" },
  { id: 24, name: "Kids Organic Pyjama Set", price: "€44,90", image: productImage(23), isNew: true, category: "baby-kids" },
] as const
