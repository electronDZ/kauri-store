"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { SAMPLE_PRODUCTS } from "../data"
import { ProductDetailView } from "./MainCard/ProductDetailView"
import { SavedProductsView } from "./MainCard/SavedProductsView"

export function SavedModal ({
  open,
  onOpenChange,
  savedProductIds,
  onToggleSaved,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  savedProductIds: number[]
  onToggleSaved: (id: number) => void
}) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)

  const savedProducts = SAMPLE_PRODUCTS.filter((p) => savedProductIds.includes(p.id))
  const product = selectedProductId != null ? SAMPLE_PRODUCTS.find((p) => p.id === selectedProductId) : null

  const handleOpenChange = (next: boolean) => {
    if (!next) setSelectedProductId(null)
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[98vw] gap-0 border-none bg-transparent p-0 shadow-none outline-none sm:max-w-[98vw]" showCloseButton={false}>
        <div className="relative flex h-[96vh] w-full flex-col overflow-hidden rounded-none border border-white/20 bg-background/95 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95">
          {product ? (
            <ProductDetailView
              product={product}
              onBack={() => setSelectedProductId(null)}
              isSaved={savedProductIds.includes(product.id)}
              onToggleSaved={() => onToggleSaved(product.id)}
            />
          ) : (
            <SavedProductsView
              savedProducts={savedProducts}
              onRemove={onToggleSaved}
              onSelectProduct={setSelectedProductId}
              onBack={() => onOpenChange(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
