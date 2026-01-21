"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { BackArrowIcon, FactoryIcon, HeartFilledIcon, HeartIcon, MapPinIcon } from "../../icons"
import { SIZES } from "../../../data/products"
import { parseNameAndBrand, parsePoints, derivePositionFromId } from "./utils"
import { StoreMapModal } from "./StoreMapModal"
import { SustainabilityModal } from "./SustainabilityModal"

const PRODUCT_DETAILS = [
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
  fairtrade: "/images/robot-screen/main-screen/our-mission.jpg",
  organic: "/images/products/imgi_134_23201-0-20250630153500_02 (1).png",
  vegan: "/images/products/imgi_132_183_6bf2f647-23ef-4b6c-83d3-6bf0f0f8d23f.jpg",
  facility: "/images/robot-screen/main-screen/our-mission.jpg",
  supply: "/images/products/imgi_134_23201-0-20250630153500_02 (1).png",
}

type Product = {
  id: number
  name: string
  price: string
  image: string
  isNew: boolean
  category: string
  brand?: string
  availability?: string
  images?: string[]
  unavailableSizes?: string[]
}

export function ProductDetailView ({
  product,
  onBack,
  isSaved,
  onToggleSaved,
}: {
  product: Product
  onBack: () => void
  isSaved?: boolean
  onToggleSaved?: () => void
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [note, setNote] = useState("")
  const [sustainabilityModal, setSustainabilityModal] = useState<"how" | "where" | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [isGuiding, setIsGuiding] = useState(false)
  const [hasReachedProduct, setHasReachedProduct] = useState(false)
  const reachTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const images = product.images ?? [product.image, product.image]
  const { displayName, brand } = parseNameAndBrand(product.name)
  const title = brand ? `${displayName} | ${brand}` : product.name
  const availability = product.availability ?? "Available"
  const points = parsePoints(product.price)
  const sizeOptions = SIZES.slice(1, 5)
  const unavailableSizes = new Set(product.unavailableSizes ?? ["L"])
  const productPosition = derivePositionFromId(product.id)
  const robotPosition = { x: 14, y: 16 }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Left: product imagery ~2/3 */}
        <div className="flex min-h-[28rem] basis-full flex-col gap-4 bg-muted/30 p-8 lg:min-h-0 lg:basis-2/3 lg:flex-row lg:gap-6 lg:p-12">
          {images.slice(0, 2).map((src, i) => (
            <div
              key={i}
              className="relative aspect-[4/5] w-full flex-1 overflow-hidden bg-muted lg:max-w-[50%]"
            >
              <Image
                src={src}
                alt={`${product.name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Right: details ~1/3 */}
        <div className="flex flex-col gap-6 border-t border-border bg-background p-8 lg:basis-1/3 lg:border-l lg:border-t-0 lg:gap-8 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            {product.isNew && (
              <span className="bg-kauri-blue px-4 py-1.5 font-sans text-[1.5rem] font-bold uppercase tracking-wider text-white">
                NEW
              </span>
            )}
            {brand && (
              <span className="font-sans text-[1.7rem] uppercase tracking-wide text-foreground/70">
                {brand}
              </span>
            )}
          </div>
          {onToggleSaved != null && (
            <button
              type="button"
              onClick={onToggleSaved}
              className={cn(
                "flex min-h-[6.4rem] w-full items-center justify-center gap-3 rounded-none border-2 px-6 py-5 font-sans text-[2rem] font-medium uppercase tracking-wide transition-all active:scale-[0.98]",
                isSaved
                  ? "border-kauri-green bg-kauri-green/10 text-kauri-green"
                  : "border-foreground bg-background text-foreground hover:bg-foreground hover:text-primary-foreground"
              )}
            >
              {isSaved ? (
                <>
                  <HeartFilledIcon className="size-8 shrink-0 text-kauri-red" />
                  Saved
                </>
              ) : (
                <>
                  <HeartIcon className="size-8 shrink-0" />
                  Save for later
                </>
              )}
            </button>
          )}

          <h2 className="font-heading text-[2.8rem] font-semibold uppercase leading-tight tracking-wide text-foreground lg:text-[3.2rem]">
            {title}
          </h2>

          <div className="max-h-[32rem] overflow-y-auto border-t border-border/50 pt-5 pr-2">
            <div className="flex flex-col gap-5 font-sans text-[2rem] leading-relaxed text-foreground">
              <p>
                The Mora Skier Sweater by Dedicated combines vintage ski charm with a timeless, sustainable design. Featuring a bold jacquard-knit skier motif, this sweater is crafted from 100% organic cotton, offering a soft, breathable feel—perfect for cooler days without compromising the planet.
              </p>
              <p>
                Designed with a regular fit and a 12-gauge knit, it features ribbed cuffs and neckline for a clean, structured look. The detailed jacquard pattern adds personality, while sustainable materials ensure a garment that&apos;s as responsible as it is stylish.
              </p>

              <div>
                <h3 className="mb-2 font-sans text-[1.6rem] font-medium text-foreground/65">
                  Product details
                </h3>
                <ul className="flex flex-col gap-2 border-l-2 border-foreground/20 pl-4">
                  {PRODUCT_DETAILS.map(({ label, value }, i) => (
                    <li key={i} className="flex flex-wrap gap-2 text-foreground/90">
                      {label && <span className="font-medium text-foreground">{label}:</span>}
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-sans text-[1.6rem] font-medium text-foreground/65">
                  Why you&apos;ll love it
                </h3>
                <p className="text-foreground/90">
                  The Mora Skier is a comfortable and bold pullover, responsibly crafted, richly textured and ready to hit the slopes in style.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-4 font-sans text-[1.8rem] text-foreground/70">
                <span><strong className="text-foreground/80">Manufacturer:</strong> DEDICATED</span>
                <span><strong className="text-foreground/80">Product code:</strong> 23201</span>
              </div>
            </div>
          </div>

          <p className="font-sans text-[3rem] font-bold text-foreground">{product.price}</p>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 shrink-0 rounded-full bg-kauri-red" aria-hidden />
            <span className="font-sans text-[2rem] text-foreground">{availability}</span>
          </div>

          <div>
            <label className="mb-2 block font-sans text-[1.8rem] font-medium uppercase tracking-wide text-foreground/80">
              Size <span className="font-normal normal-case text-foreground/60">(for saving)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((s) => {
                const isUnavailable = unavailableSizes.has(s)
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={isUnavailable}
                    onClick={() => !isUnavailable && setSelectedSize(selectedSize === s ? null : s)}
                    className={cn(
                      "min-w-[5.6rem] border-2 px-5 py-4 font-sans text-[1.7rem] font-medium uppercase transition-all",
                      isUnavailable
                        ? "cursor-not-allowed border-border bg-muted/50 text-muted-foreground line-through"
                        : selectedSize === s
                          ? "border-foreground bg-foreground text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-foreground/60"
                    )}
                    title={isUnavailable ? "Unavailable" : undefined}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note"
              className="w-full border-2 border-border bg-background py-4 px-5 font-sans text-[1.8rem] outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground focus:ring-0"
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setShowMap(true)
                setIsGuiding(false)
                setHasReachedProduct(false)
              }}
              className="flex min-h-[6.4rem] w-full items-center justify-center gap-3 rounded-none border-2 border-kauri-blue bg-kauri-blue/10 px-6 py-5 font-sans text-[1.9rem] font-medium uppercase tracking-wide text-kauri-blue transition-all hover:bg-kauri-blue hover:text-white active:scale-95"
            >
              Find in store
            </button>
            {isGuiding && (
              <p className="font-sans text-[1.8rem] text-kauri-green">
                Robot is guiding to this product.
              </p>
            )}
          </div>

          <p className="font-sans text-[1.8rem] text-foreground/70">
            {points} points when you purchase.
          </p>

          <div className="border-t border-border pt-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setSustainabilityModal("how")}
                className="flex min-h-[7.2rem] w-full items-center justify-center gap-4 rounded-none border-2 border-kauri-green bg-kauri-green/10 px-6 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-kauri-green transition-all hover:bg-kauri-green hover:text-white active:scale-95"
              >
                <FactoryIcon className="size-10 shrink-0" />
                <span>How it&apos;s made</span>
              </button>
              <button
                type="button"
                onClick={() => setSustainabilityModal("where")}
                className="flex min-h-[7.2rem] w-full items-center justify-center gap-4 rounded-none border-2 border-kauri-blue bg-kauri-blue/10 px-6 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-kauri-blue transition-all hover:bg-kauri-blue hover:text-white active:scale-95"
              >
                <MapPinIcon className="size-10 shrink-0" />
                <span>Where is it made</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-background/95 p-8 backdrop-blur">
        <button
          onClick={onBack}
          className="flex w-full items-center justify-center gap-3 rounded-none border-2 border-foreground bg-background px-8 py-7 font-sans text-[2.1rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
        >
          <BackArrowIcon className="size-8 shrink-0" />
          Back to products
        </button>
      </div>

      {showMap && (
        <StoreMapModal
          productName={displayName}
          brand={brand}
          productPosition={productPosition}
          robotPosition={robotPosition}
          isGuiding={isGuiding}
          hasReachedProduct={hasReachedProduct}
          onStartGuidance={() => {
            setIsGuiding(true)
            setHasReachedProduct(false)
            if (reachTimeoutRef.current) clearTimeout(reachTimeoutRef.current)
            reachTimeoutRef.current = setTimeout(() => setHasReachedProduct(true), 2800)
          }}
          onClose={() => {
            if (reachTimeoutRef.current) clearTimeout(reachTimeoutRef.current)
            setHasReachedProduct(false)
            setIsGuiding(false)
            setShowMap(false)
          }}
        />
      )}

      {sustainabilityModal && (
        <SustainabilityModal
          type={sustainabilityModal}
          brand={brand}
          onClose={() => setSustainabilityModal(null)}
        />
      )}
    </div>
  )
}
