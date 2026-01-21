"use client"

import { useRef, useState } from "react"
import { SIZES } from "../../../data/products"
import { parseNameAndBrand, parsePoints, derivePositionFromId } from "./utils"
import { StoreMapModal } from "./StoreMapModal"
import { SustainabilityModal } from "./SustainabilityModal"
import { ProductJourneyModal } from "./ProductJourneyModal"
import { ProductImages } from "./ProductImages"
import { ProductHeader } from "./ProductHeader"
import { SaveButton } from "./SaveButton"
import { ProductDescription } from "./ProductDescription"
import { SizeSelector } from "./SizeSelector"
import { SustainabilityButtons } from "./SustainabilityButtons"
import { BackButton } from "./BackButton"

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
  const [sustainabilityModal, setSustainabilityModal] = useState<"how" | "where" | "brand" | null>(null)
  const [showJourneyMap, setShowJourneyMap] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [isGuiding, setIsGuiding] = useState(false)
  const [hasReachedProduct, setHasReachedProduct] = useState(false)
  const reachTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const images = product.images ?? [product.image, product.image]
  const { displayName } = parseNameAndBrand(product.name)
  const brand = "ECOALF" // Hardcoded brand for all products
  const title = `${displayName} | ${brand}`
  const availability = product.availability ?? "Available"
  const points = parsePoints(product.price)
  const sizeOptions = SIZES.slice(1, 5)
  const unavailableSizes = new Set(product.unavailableSizes ?? ["L"])
  const productPosition = derivePositionFromId(product.id)
  const robotPosition = { x: 14, y: 16 }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <ProductImages images={images} />

        <div className="flex flex-col gap-6 border-t border-border bg-background p-8 lg:basis-1/3 lg:border-l lg:border-t-0 lg:gap-8 lg:p-12">
          <ProductHeader isNew={product.isNew} brand={brand} title={title} />

          {onToggleSaved != null && (
            <SaveButton isSaved={isSaved ?? false} onToggle={onToggleSaved} />
          )}

          <ProductDescription />

          <p className="font-sans text-[3rem] font-bold text-foreground">{product.price}</p>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 shrink-0 rounded-full bg-kauri-red" aria-hidden />
            <span className="font-sans text-[2rem] text-foreground">{availability}</span>
          </div>

          <SizeSelector
            sizes={sizeOptions}
            selectedSize={selectedSize}
            unavailableSizes={unavailableSizes}
            onSelect={(s) => setSelectedSize(selectedSize === s ? null : s)}
          />

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

          <SustainabilityButtons
            brand={brand}
            onHowClick={() => setSustainabilityModal("how")}
            onWhereClick={() => setShowJourneyMap(true)}
            onBrandClick={() => setSustainabilityModal("brand")}
          />
        </div>
      </div>

      <BackButton onBack={onBack} />

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

      {showJourneyMap && (
        <ProductJourneyModal onClose={() => setShowJourneyMap(false)} />
      )}
    </div>
  )
}
