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
      <div className="relative flex w-[75vw] h-[75vh] max-w-[75vw] max-h-[75vh] flex-col gap-3 rounded-none border-2 border-foreground bg-background p-3 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[0.875rem] uppercase tracking-widest text-foreground/60">
              Store navigation
            </p>
            <h3 className="font-heading text-[1.2rem] font-normal uppercase tracking-wide text-foreground truncate">
              {productName} {brand ? `| ${brand}` : ""}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border-2 border-foreground bg-background font-sans text-[1.2rem] font-bold text-foreground transition hover:bg-foreground hover:text-primary-foreground active:scale-95"
            aria-label="Close store map"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <BlueprintMap
            productPosition={productPosition}
            robotPosition={robotPosition}
            showRoute={isGuiding}
            hasReachedProduct={hasReachedProduct}
            onStartGuidance={onStartGuidance}
            isGuiding={isGuiding}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  )
}
