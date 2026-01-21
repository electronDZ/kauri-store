"use client"

import { BlueprintMap } from "./BlueprintMap"

export function StoreMapModal ({
  productName,
  brand,
  productPosition,
  robotPosition,
  isGuiding,
  hasReachedProduct,
  onStartGuidance,
  onClose,
}: {
  productName: string
  brand: string | null
  productPosition: { x: number; y: number }
  robotPosition: { x: number; y: number }
  isGuiding: boolean
  hasReachedProduct: boolean
  onStartGuidance: () => void
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 backdrop-blur">
      <div className="relative flex w-[min(1260px,96vw)] min-h-[520px] flex-col gap-6 rounded-none border-2 border-foreground bg-background p-6 shadow-2xl lg:min-h-[620px]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-sans text-[1.2rem] uppercase tracking-widest text-foreground/60">
              Store navigation
            </p>
            <h3 className="font-heading text-[2.2rem] font-normal uppercase tracking-wide text-foreground">
              {productName} {brand ? `| ${brand}` : ""}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none border-2 border-foreground bg-background font-sans text-[1.6rem] font-bold text-foreground transition hover:bg-foreground hover:text-primary-foreground active:scale-95"
            aria-label="Close store map"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <BlueprintMap
            productPosition={productPosition}
            robotPosition={robotPosition}
            showRoute={isGuiding}
            hasReachedProduct={hasReachedProduct}
            onStartGuidance={onStartGuidance}
            isGuiding={isGuiding}
          />
        </div>
      </div>
    </div>
  )
}
