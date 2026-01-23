"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { GAMES, PRODUCT_CATEGORIES, SAMPLE_PRODUCTS } from "../../data"
import { StyleMatchFlow } from "../StyleMatchFlow"
import { MainCardTrigger } from "./MainCardTrigger"
import { GamePlayerView } from "./GamePlayerView"
import { EntertainmentGamesView } from "./EntertainmentGamesView"
import { ProductsExplorationView } from "./ProductsExplorationView"
import { ProductDetailView } from "./ProductDetailView"
import { DefaultCardView } from "./DefaultCardView"
import { OurStoryView } from "./OurStoryView"

export function MainCard ({
  hero,
  description,
  gridClass,
  imageGradient,
  isCarousel,
  image,
  video,
  carouselImages,
  savedProductIds = [],
  onToggleSaved,
}: {
  hero: string
  description: string
  gridClass?: string
  imageGradient: string
  isCarousel?: boolean
  image?: string
  video?: string
  carouselImages?: readonly string[]
  savedProductIds?: number[]
  onToggleSaved?: (id: number) => void
}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>(PRODUCT_CATEGORIES[0].id)
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState<string>("date-new")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])

  const isEntertainment = hero === "KIDS ENTERTAINMENT"
  const isProducts = hero === "EXPLORE PRODUCTS"
  const isFeatured = hero === "FEATURED"
  const isStyleMatch = hero === "STYLE MATCH"
  const isOurStory = hero === "OUR STORY"
  const isSaved = (id: number) => savedProductIds.includes(id)

  const filteredProducts = SAMPLE_PRODUCTS.filter(
    (product) => product.category === selectedCategory
  )

  useEffect(() => {
    if (!isCarousel || !carouselImages) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isCarousel, carouselImages])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setSelectedGame(null)
      setSelectedProductId(null)
      setSelectedCategory(PRODUCT_CATEGORIES[0].id)
    }
  }

  const clearFilters = () => {
    setSortBy("date-new")
    setSelectedTypes([])
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange([0, 200])
    setSelectedBrands([])
    setSelectedMaterials([])
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <MainCardTrigger
          hero={hero}
          description={description}
          gridClass={gridClass}
          imageGradient={imageGradient}
          isCarousel={isCarousel}
          image={image}
          video={video}
          carouselImages={carouselImages}
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
        />
      </DialogTrigger>
      <DialogContent className="max-w-[98vw] gap-0 border-none bg-transparent p-0 shadow-none outline-none sm:max-w-[98vw]" showCloseButton={false}>
        <div className="relative flex h-[96vh] w-full flex-col overflow-hidden rounded-none border border-white/20 bg-background/95 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95">
          {isEntertainment && selectedGame ? (
            <GamePlayerView
              gameName={GAMES.find((g) => g.id === selectedGame)?.name ?? ""}
              onBackToGames={() => setSelectedGame(null)}
            />
          ) : isEntertainment ? (
            <EntertainmentGamesView
              hero={hero}
              description={description}
              image={image}
              onSelectGame={setSelectedGame}
              onBack={() => setOpen(false)}
            />
          ) : (isProducts || isFeatured) && selectedProductId ? (() => {
            const product = SAMPLE_PRODUCTS.find((p) => p.id === selectedProductId)
            return product ? (
              <ProductDetailView
                product={product}
                onBack={() => setSelectedProductId(null)}
                isSaved={isSaved(product.id)}
                onToggleSaved={() => onToggleSaved?.(product.id)}
              />
            ) : (
              <ProductsExplorationView
                hero={hero}
                description={description}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                filteredProducts={filteredProducts}
                onBack={() => setOpen(false)}
                onSelectProduct={setSelectedProductId}
                savedProductIds={savedProductIds}
                onToggleSaved={onToggleSaved}
                filterOpen={filterOpen}
                setFilterOpen={setFilterOpen}
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
                onClearFilters={clearFilters}
              />
            )
          })() : (isProducts || isFeatured) ? (
            <ProductsExplorationView
              hero={hero}
              description={description}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              filteredProducts={filteredProducts}
              onBack={() => setOpen(false)}
              onSelectProduct={setSelectedProductId}
              savedProductIds={savedProductIds}
              onToggleSaved={onToggleSaved}
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
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
              onClearFilters={clearFilters}
            />
          ) : isStyleMatch ? (
            <StyleMatchFlow
              image={image ?? "/images/robot-screen/main-screen/cam-detection.avif"}
              imageGradient={imageGradient}
              onClose={() => setOpen(false)}
              savedProductIds={savedProductIds}
              onToggleSaved={onToggleSaved}
            />
          ) : isOurStory ? (
            <OurStoryView onBack={() => setOpen(false)} />
          ) : (
            <DefaultCardView
              hero={hero}
              description={description}
              image={image}
              video={video}
              isCarousel={isCarousel}
              carouselImages={carouselImages}
              currentSlide={currentSlide}
              imageGradient={imageGradient}
              onBack={() => setOpen(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
