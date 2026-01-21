"use client"

import { useState } from "react"
import Image from "next/image"
import { DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { BackArrowIcon, CartEmptyIcon, FilterIcon, HeartFilledIcon, HeartIcon } from "../icons"
import { PRODUCT_CATEGORIES, SAMPLE_PRODUCTS } from "../../data"
import { FilterDialog } from "./FilterDialog"

type Product = {
  id: number
  name: string
  price: string
  image: string
  isNew: boolean
  category: string
}

export function ProductsExplorationView ({
  hero,
  description,
  selectedCategory,
  setSelectedCategory,
  filteredProducts,
  onBack,
  onSelectProduct,
  savedProductIds = [],
  onToggleSaved,
  filterOpen,
  setFilterOpen,
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
  onClearFilters,
}: {
  hero: string
  description: string
  selectedCategory: string
  setSelectedCategory: (v: string) => void
  filteredProducts: readonly Product[]
  onBack: () => void
  onSelectProduct?: (id: number) => void
  savedProductIds?: number[]
  onToggleSaved?: (id: number) => void
  filterOpen: boolean
  setFilterOpen: (v: boolean) => void
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
  onClearFilters: () => void
}) {
  const [showSavedView, setShowSavedView] = useState(false)
  const categoryLabel = PRODUCT_CATEGORIES.find((c) => c.id === selectedCategory)?.label
  const savedProducts = SAMPLE_PRODUCTS.filter((p) => savedProductIds.includes(p.id))
  const displayProducts = showSavedView ? savedProducts : filteredProducts

  function renderProductCard (product: Product) {
    const saved = savedProductIds.includes(product.id)
    return (
      <div
        key={product.id}
        className="group relative flex flex-col overflow-hidden rounded-none border border-border bg-background transition-all hover:border-foreground hover:shadow-lg"
      >
        <button
          type="button"
          onClick={() => onSelectProduct?.(product.id)}
          className="flex flex-col text-left"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="300px"
            />
            {product.isNew && (
              <div className="absolute left-0 top-0 bg-kauri-green px-4 py-2 font-sans text-[1.2rem] font-bold uppercase tracking-wider text-white">
                NEW
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 p-6">
            <h4 className="line-clamp-2 font-sans text-[1.6rem] font-medium leading-snug text-foreground">
              {product.name}
            </h4>
            <p className="font-sans text-[1.8rem] font-bold text-foreground">
              {product.price}
            </p>
          </div>
        </button>
        {onToggleSaved != null && (
          <button
            type="button"
            onClick={() => onToggleSaved(product.id)}
            className={cn(
              "absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-none border transition-colors",
              saved
                ? "border-transparent bg-background/90 text-kauri-red hover:bg-background"
                : "border-border bg-background/90 text-foreground/70 hover:bg-background hover:text-foreground"
            )}
            aria-label={saved ? "Remove from saved" : "Save for later"}
          >
            {saved ? <HeartFilledIcon className="size-5" /> : <HeartIcon className="size-5" />}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-border bg-background/80 px-12 py-8 backdrop-blur">
        <DialogTitle className="font-heading text-[4rem] uppercase leading-tight tracking-wide text-foreground">
          {hero}
        </DialogTitle>
        <p className="mt-2 font-sans text-[1.8rem] leading-relaxed text-foreground/70">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 border-b border-border bg-muted/20 px-12 py-4">
        <button
          onClick={() => setShowSavedView(false)}
          className={cn(
            "rounded-none border-2 px-6 py-3 font-sans text-[1.4rem] font-medium uppercase tracking-wide transition-all",
            !showSavedView
              ? "border-foreground bg-foreground text-primary-foreground"
              : "border-border bg-background text-foreground hover:border-foreground/60"
          )}
        >
          Browse
        </button>
        <button
          onClick={() => setShowSavedView(true)}
          className={cn(
            "rounded-none border-2 px-6 py-3 font-sans text-[1.4rem] font-medium uppercase tracking-wide transition-all",
            showSavedView
              ? "border-foreground bg-foreground text-primary-foreground"
              : "border-border bg-background text-foreground hover:border-foreground/60"
          )}
        >
          Your saved ({savedProductIds.length})
        </button>
      </div>

      {!showSavedView && (
        <div className="border-b border-border bg-muted/30 px-12 py-6">
          <div className="flex flex-wrap gap-4">
            {PRODUCT_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "rounded-none border-2 px-10 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide transition-all active:scale-95",
                    isActive
                      ? "border-kauri-green bg-kauri-green/10 text-kauri-green shadow-sm"
                      : "border-border bg-background text-foreground hover:border-foreground hover:bg-muted"
                  )}
                >
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-12">
          {!showSavedView && (
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-[2.4rem] uppercase tracking-wide text-foreground">
                  {categoryLabel}
                </h3>
                <p className="font-sans text-[1.6rem] text-foreground/60">
                  {filteredProducts.length} Products
                </p>
              </div>
              <FilterDialog
                open={filterOpen}
                onOpenChange={setFilterOpen}
                sortBy={sortBy}
                setSortBy={setSortBy}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedMaterials={selectedMaterials}
                setSelectedMaterials={setSelectedMaterials}
                onClearAll={onClearFilters}
                trigger={
                  <button className="flex items-center gap-3 rounded-none border-2 border-foreground bg-background px-8 py-4 font-sans text-[1.6rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95">
                    <FilterIcon />
                    Filter & Sort
                  </button>
                }
              />
            </div>
          )}

          {showSavedView && savedProducts.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-none border-2 border-border bg-muted">
                <CartEmptyIcon className="text-foreground/40" />
              </div>
              <p className="font-sans text-[1.8rem] text-foreground/60">
                No saved products yet
              </p>
              <p className="font-sans text-[1.4rem] text-foreground/50">
                Tap the heart on products while browsing to save them here.
              </p>
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
              {displayProducts.map((p) => renderProductCard(p))}
            </div>
          ) : (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-none border-2 border-border bg-muted">
                <CartEmptyIcon className="text-foreground/40" />
              </div>
              <p className="font-sans text-[1.8rem] text-foreground/60">
                No products in this category yet
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-border bg-background/95 p-8 backdrop-blur">
          <button
            onClick={onBack}
            className="flex w-full items-center justify-center gap-3 rounded-none border-2 border-foreground bg-background px-8 py-6 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
          >
            <BackArrowIcon />
            Back to Main Menu
          </button>
        </div>
      </div>
    </div>
  )
}
