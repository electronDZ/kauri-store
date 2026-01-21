"use client"

import { Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { CloseIcon, FilterIcon } from "../icons"
import {
  SORT_OPTIONS,
  PRODUCT_TYPES,
  SIZES,
  COLORS,
  BRANDS,
  MATERIALS,
} from "../../data"

export function FilterDialog ({
  open,
  onOpenChange,
  sortBy,
  setSortBy,
  selectedTypes,
  setSelectedTypes,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedMaterials,
  setSelectedMaterials,
  onClearAll,
  trigger,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  sortBy: string
  setSortBy: (v: string) => void
  selectedTypes: string[]
  setSelectedTypes: (v: string[] | ((p: string[]) => string[])) => void
  selectedSizes: string[]
  setSelectedSizes: (v: string[] | ((p: string[]) => string[])) => void
  selectedColors: string[]
  setSelectedColors: (v: string[] | ((p: string[]) => string[])) => void
  priceRange: [number, number]
  setPriceRange: (v: [number, number]) => void
  selectedBrands: string[]
  setSelectedBrands: (v: string[] | ((p: string[]) => string[])) => void
  selectedMaterials: string[]
  setSelectedMaterials: (v: string[] | ((p: string[]) => string[])) => void
  onClearAll: () => void
  trigger: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[80vw] max-w-[80vw] gap-0 border-none bg-transparent p-0 shadow-none outline-none sm:max-w-[80vw]" showCloseButton={false}>
        <div className="flex h-[90vh] w-full flex-col overflow-hidden rounded-none border border-white/20 bg-background/95 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95">
          <div className="flex items-center justify-between border-b border-border bg-background/80 px-10 py-6 backdrop-blur">
            <DialogTitle className="font-heading text-[3rem] uppercase tracking-wide text-foreground">
              Filter & Sort
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="flex h-12 w-12 items-center justify-center rounded-none border border-border bg-muted transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
              aria-label="Close filter dialog"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10">
            <div className="mb-10">
              <h3 className="mb-4 font-heading text-[2rem] uppercase tracking-wide text-foreground">
                Sort
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SORT_OPTIONS.map((option) => {
                  const isActive = sortBy === option.id
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={cn(
                        "rounded-none border px-6 py-4 text-left font-sans text-[1.6rem] transition-all active:scale-[0.98]",
                        isActive
                          ? "border-kauri-green bg-kauri-green/10 text-kauri-green"
                          : "border-border bg-muted hover:border-foreground"
                      )}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="mb-4 font-heading text-[2rem] uppercase tracking-wide text-foreground">
                Product Type
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {PRODUCT_TYPES.map((type) => {
                  const isChecked = selectedTypes.includes(type.id)
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedTypes((prev) =>
                          prev.includes(type.id)
                            ? prev.filter((t) => t !== type.id)
                            : [...prev, type.id]
                        )
                      }}
                      className={cn(
                        "relative flex min-h-[5.5rem] flex-col items-center justify-center gap-1 rounded-none border-2 px-6 py-5 text-center transition-all active:scale-[0.98]",
                        isChecked
                          ? "border-kauri-green bg-kauri-green/15"
                          : "border-border bg-muted/50 hover:border-foreground/50"
                      )}
                    >
                      {isChecked && (
                        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center">
                          <Check className="h-5 w-5 text-kauri-green" />
                        </div>
                      )}
                      <span className={cn(
                        "font-sans text-[1.6rem] font-medium",
                        isChecked ? "text-kauri-green" : "text-foreground"
                      )}>
                        {type.label}
                      </span>
                      <span className="font-sans text-[1.3rem] text-foreground/60">
                        ({type.count})
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="mb-4 font-heading text-[2rem] uppercase tracking-wide text-foreground">
                Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {SIZES.map((size) => {
                  const isActive = selectedSizes.includes(size)
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSizes((prev) =>
                          prev.includes(size)
                            ? prev.filter((s) => s !== size)
                            : [...prev, size]
                        )
                      }}
                      className={cn(
                        "rounded-none border-2 px-8 py-3 font-sans text-[1.6rem] font-medium uppercase transition-all active:scale-95",
                        isActive
                          ? "border-kauri-green bg-kauri-green/10 text-kauri-green"
                          : "border-border bg-background hover:border-foreground"
                      )}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="mb-4 font-heading text-[2rem] uppercase tracking-wide text-foreground">
                Color
              </h3>
              <div className="flex flex-wrap gap-4">
                {COLORS.map((color) => {
                  const isActive = selectedColors.includes(color.id)
                  return (
                    <button
                      key={color.id}
                      onClick={() => {
                        setSelectedColors((prev) =>
                          prev.includes(color.id)
                            ? prev.filter((c) => c !== color.id)
                            : [...prev, color.id]
                        )
                      }}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-none border-2 bg-muted/50 p-3 transition-all active:scale-95",
                        isActive
                          ? "border-kauri-green"
                          : "border-transparent hover:border-border"
                      )}
                    >
                      <div
                        className="h-12 w-12 rounded-none border border-border"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-sans text-[1.3rem] text-foreground/80">
                        {color.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-10">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-heading text-[2rem] uppercase tracking-wide text-foreground">
                  Price
                </h3>
                <span className="font-sans text-[1.8rem] font-medium text-foreground">
                  €{priceRange[0]} — €{priceRange[1]}
                </span>
              </div>
              <div className="space-y-4">
                <div className="relative h-3 w-full rounded-none bg-muted">
                  <div
                    className="absolute h-full rounded-none bg-kauri-green transition-all"
                    style={{
                      left: `${(priceRange[0] / 200) * 100}%`,
                      right: `${100 - (priceRange[1] / 200) * 100}%`,
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (val < priceRange[1] - 10) {
                        setPriceRange([val, priceRange[1]])
                      }
                    }}
                    className="pointer-events-auto absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-kauri-green [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-lg [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-kauri-green [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
                    aria-label="Minimum price"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (val > priceRange[0] + 10) {
                        setPriceRange([priceRange[0], val])
                      }
                    }}
                    className="pointer-events-auto absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-kauri-green [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-lg [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-kauri-green [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
                    aria-label="Maximum price"
                  />
                </div>
                <div className="flex justify-between px-1">
                  <span className="font-sans text-[1.3rem] text-foreground/50">€0</span>
                  <span className="font-sans text-[1.3rem] text-foreground/50">€200</span>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="mb-4 font-heading text-[2rem] uppercase tracking-wide text-foreground">
                Brand
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {BRANDS.map((brand) => {
                  const isChecked = selectedBrands.includes(brand.id)
                  return (
                    <button
                      key={brand.id}
                      onClick={() => {
                        setSelectedBrands((prev) =>
                          prev.includes(brand.id)
                            ? prev.filter((b) => b !== brand.id)
                            : [...prev, brand.id]
                        )
                      }}
                      className={cn(
                        "relative flex min-h-[5.5rem] flex-col items-center justify-center gap-1 rounded-none border-2 px-6 py-5 text-center transition-all active:scale-[0.98]",
                        isChecked
                          ? "border-kauri-green bg-kauri-green/15"
                          : "border-border bg-muted/50 hover:border-foreground/50"
                      )}
                    >
                      {isChecked && (
                        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center">
                          <Check className="h-5 w-5 text-kauri-green" />
                        </div>
                      )}
                      <span className={cn(
                        "font-sans text-[1.6rem] font-medium",
                        isChecked ? "text-kauri-green" : "text-foreground"
                      )}>
                        {brand.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 font-heading text-[2rem] uppercase tracking-wide text-foreground">
                Main Material
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {MATERIALS.map((material) => {
                  const isChecked = selectedMaterials.includes(material.id)
                  return (
                    <button
                      key={material.id}
                      onClick={() => {
                        setSelectedMaterials((prev) =>
                          prev.includes(material.id)
                            ? prev.filter((m) => m !== material.id)
                            : [...prev, material.id]
                        )
                      }}
                      className={cn(
                        "relative flex min-h-[5.5rem] flex-col items-center justify-center gap-1 rounded-none border-2 px-6 py-5 text-center transition-all active:scale-[0.98]",
                        isChecked
                          ? "border-kauri-green bg-kauri-green/15"
                          : "border-border bg-muted/50 hover:border-foreground/50"
                      )}
                    >
                      {isChecked && (
                        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center">
                          <Check className="h-5 w-5 text-kauri-green" />
                        </div>
                      )}
                      <span className={cn(
                        "font-sans text-[1.6rem] font-medium",
                        isChecked ? "text-kauri-green" : "text-foreground"
                      )}>
                        {material.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-4 border-t border-border bg-background/95 p-8 backdrop-blur">
            <button
              onClick={onClearAll}
              className="flex flex-1 items-center justify-center gap-2 rounded-none border-2 border-foreground bg-background px-8 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-muted active:scale-95"
            >
              Clear All
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-none border-2 border-kauri-green bg-kauri-green px-8 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-white transition-all hover:bg-kauri-green/90 active:scale-95"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
