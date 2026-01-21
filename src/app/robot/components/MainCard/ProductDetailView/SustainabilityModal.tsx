"use client"

import { SUSTAINABILITY_HOW, SUSTAINABILITY_WHERE, BRAND_INFO } from "./constants"
import { ModalHeader } from "./ModalHeader"
import { SustainabilityItem } from "./SustainabilityItem"
import { BrandInfo } from "./BrandInfo"
import { BrandFallback } from "./BrandFallback"

type SustainabilityModalProps = {
  type: "how" | "where" | "brand"
  brand?: string | null
  onClose: () => void
}

export function SustainabilityModal ({ type, brand, onClose }: SustainabilityModalProps) {
  const items = type === "how" ? SUSTAINABILITY_HOW : type === "where" ? SUSTAINABILITY_WHERE : []
  // Default to ECOALF for brand dialog if no brand is provided
  const effectiveBrand = type === "brand" && !brand ? "ECOALF" : brand
  const brandKey = effectiveBrand ? effectiveBrand.toUpperCase().replace(/\s+/g, "") : null
  const brandInfo = brandKey && brandKey in BRAND_INFO ? BRAND_INFO[brandKey] : null
  const isBrandOnly = type === "brand"

  const getTitle = () => {
    if (type === "how") return "How it's made"
    if (type === "where") return "Where is it made"
    return `About ${effectiveBrand || "Brand"}`
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 backdrop-blur"
      onClick={onClose}
    >
      <div 
        className="relative flex w-[min(1260px,96vw)] max-h-[90vh] min-h-[520px] flex-col gap-6 rounded-none border-2 border-foreground bg-background p-[var(--kauri-container)] shadow-2xl lg:min-h-[620px]"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          isBrandOnly={isBrandOnly}
          title={getTitle()}
          onClose={onClose}
        />

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="flex flex-col gap-6">
            {!isBrandOnly && items.map((item) => (
              <SustainabilityItem
                key={item.title}
                title={item.title}
                description={item.description}
                imageKey={item.imageKey}
              />
            ))}

            {isBrandOnly && (
              brandInfo ? (
                <BrandInfo brandInfo={brandInfo} noMargin />
              ) : effectiveBrand ? (
                <BrandFallback brand={effectiveBrand} noMargin />
              ) : (
                <div className="flex flex-col gap-4 rounded-none border-2 border-border bg-muted/20 p-[var(--kauri-card-x)]">
                  <h4 className="font-heading text-[2.6rem] font-normal uppercase tracking-wide text-foreground">
                    About Brand
                  </h4>
                  <p className="font-sans text-[2.2rem] leading-relaxed text-foreground/90">
                    Brand information is not available.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
