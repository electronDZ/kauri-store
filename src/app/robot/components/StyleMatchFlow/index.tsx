"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import { Camera } from "lucide-react"
import { cn } from "@/lib/utils"
import { BackArrowIcon, HeartFilledIcon, HeartIcon } from "../icons"
import {
  UNDERTONES,
  COLOR_PREFS,
  PALETTE_BY_UNDERTONE,
  SAMPLE_PRODUCTS,
} from "../../data"
import { MOCK_OUTFIT } from "../../data/style-match-outfit"

type Product = {
  id: number
  name: string
  price: string
  image: string
  isNew: boolean
  category: string
}

type Step = "camera" | "scanning" | "processing" | "results"
type Undertone = "warm" | "cool" | "neutral"

export function StyleMatchFlow({
  image,
  imageGradient,
  onClose,
  savedProductIds,
  onToggleSaved,
}: {
  image: string
  imageGradient: string
  onClose: () => void
  savedProductIds?: number[]
  onToggleSaved?: (id: number) => void
}) {
  const [step, setStep] = useState<Step>("camera")
  const [undertone, setUndertone] = useState<Undertone>("warm")
  const [colorPrefs, setColorPrefs] = useState<string[]>([])
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [visibleDots, setVisibleDots] = useState<Set<string>>(new Set())
  const [imageLoaded, setImageLoaded] = useState(false)
  const scanningTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Map hotspots to generated product images
  const hotspotProducts = useMemo(() => {
    const generatedImages: Record<string, string> = {
      "item_1": "/images/robot-screen/generated-products/cap.jpg", // Headwear
      "item_2": "/images/robot-screen/generated-products/jacket.jpg", // Outerwear
      "item_3": "/images/robot-screen/generated-products/shirt.jpg", // Top
      "item_4": "/images/robot-screen/generated-products/pant.jpg", // Bottom
      "item_5": "/images/robot-screen/generated-products/bag.jpg", // Socks
      "item_6": "/images/robot-screen/generated-products/gloves.jpg", // Accessory
    }

    const mapping: Record<string, Product> = {}
    MOCK_OUTFIT.items.forEach((item) => {
      const image = generatedImages[item.id]
      if (image) {
        mapping[item.id] = {
          id: parseInt(item.id.replace("item_", "")),
          name: item.name,
          price: `€${item.price.toFixed(2)}`,
          image: image,
          isNew: item.status === "new",
          category: item.category.toLowerCase().replace(/\s+/g, "-"),
        }
      }
    })
    return mapping
  }, [])

  // Handle scanning phase (3 seconds)
  useEffect(() => {
    if (step === "scanning") {
      scanningTimeoutRef.current = setTimeout(() => {
        setStep("processing")
      }, 3000)
      return () => {
        if (scanningTimeoutRef.current) {
          clearTimeout(scanningTimeoutRef.current)
        }
      }
    }
  }, [step])

  // Handle processing phase
  useEffect(() => {
    if (step === "processing") {
      processingTimeoutRef.current = setTimeout(() => {
        setStep("results")
      }, 2000)
      return () => {
        if (processingTimeoutRef.current) {
          clearTimeout(processingTimeoutRef.current)
        }
      }
    }
  }, [step])

  // Animate dots popping in one by one
  useEffect(() => {
    if (step === "results" && imageLoaded) {
      const items = MOCK_OUTFIT.items
      items.forEach((item, index) => {
        setTimeout(() => {
          setVisibleDots((prev) => new Set([...prev, item.id]))
        }, index * 100)
      })
    }
  }, [step, imageLoaded])

  const handleDotClick = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedItemId(itemId)
  }

  const handleBackgroundClick = () => {
    setSelectedItemId(null)
  }

  const footerBack = (
    <div className="border-t border-border bg-background/95 p-8 backdrop-blur">
      <button
        onClick={onClose}
        className="flex w-full items-center justify-center gap-3 rounded-none border-2 border-foreground bg-background px-8 py-6 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
      >
        <BackArrowIcon />
        Back to Main Menu
      </button>
    </div>
  )

  if (step === "camera") {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="border-b border-border bg-background/80 px-10 py-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 rounded-none border-2 border-foreground bg-background px-6 py-3 font-sans text-[1.5rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
            >
              <BackArrowIcon />
              Back
            </button>
            <h2 className="font-heading text-[2.4rem] uppercase tracking-wide text-foreground">
              Use camera
            </h2>
          </div>
          <p className="mt-2 font-sans text-[1.5rem] text-muted-foreground">
            We only use colour information. The image is not saved.
          </p>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-10">
            <div className="mb-10 rounded-none border border-border bg-muted/50 p-6">
              <p className="font-sans text-[1.4rem] leading-relaxed text-foreground/80">
                <strong className="text-foreground">Your privacy:</strong> We do not store photos. Only colour values are used to suggest products. Your images are never saved or stored.
              </p>
              <details className="mt-4">
                <summary className="cursor-pointer font-sans text-[1.4rem] font-medium uppercase tracking-wide text-foreground/70 hover:text-foreground">
                  How it works
                </summary>
                <p className="mt-3 font-sans text-[1.3rem] leading-relaxed text-muted-foreground">
                  The camera captures a short live image. Our system analyzes the overall colour palette from the image to suggest complementary products. The image is deleted immediately. Only the colour information is used to filter product recommendations. We do not store your images.
                </p>
              </details>
            </div>
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="relative flex h-64 w-64 shrink-0 items-center justify-center rounded-none border-2 border-foreground bg-muted">
                <div className="absolute inset-3 rounded-none border border-dashed border-foreground/30" aria-hidden />
                <Camera className="h-16 w-16 text-foreground/40" strokeWidth={1.5} />
              </div>
              <p className="max-w-md text-center font-sans text-[1.6rem] text-foreground/80">
                Position your face in the frame, then tap Capture.
              </p>
              <button
                onClick={() => {
                  setUndertone("warm")
                  setStep("scanning")
                }}
                className="rounded-none bg-kauri-green px-[var(--kauri-btn-x)] py-[var(--kauri-btn-y)] font-sans text-[1.8rem] font-medium uppercase tracking-wide text-primary-foreground transition-all hover:bg-kauri-green/90 active:scale-95"
              >
                Capture
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Scanning phase with scanning line animation
  if (step === "scanning") {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="border-b border-border bg-background/80 px-10 py-6 backdrop-blur">
          <h2 className="font-heading text-[2.4rem] uppercase tracking-wide text-foreground">
            Scanning
          </h2>
        </div>
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-10">
          <div className="relative h-96 w-full max-w-2xl overflow-hidden rounded-none border-2 border-foreground bg-muted">
            <div className="absolute inset-3 rounded-none border border-dashed border-foreground/30" aria-hidden />
            <Camera className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-foreground/40" strokeWidth={1.5} />
            {/* Scanning line animation */}
            <div className="absolute left-0 right-0 h-1 bg-kauri-green shadow-[0_0_20px_rgba(34,197,94,0.8)] animate-scan" />
          </div>
          <p className="mt-8 font-sans text-[1.6rem] text-foreground/80">
            Analyzing your style...
          </p>
        </div>
      </div>
    )
  }

  // Processing phase
  if (step === "processing") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-10">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-4 border-kauri-green/30" />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border-4 border-kauri-green" />
        </div>
        <p className="font-heading text-[2.8rem] uppercase tracking-wide text-foreground">
          Generating your style...
        </p>
        <p className="font-sans text-[1.6rem] text-muted-foreground">
          Creating your perfect outfit match.
        </p>
      </div>
    )
  }

  // Results phase
  const outfit = MOCK_OUTFIT

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-border bg-background/80 px-10 py-8 backdrop-blur">
        <h2 className="font-heading text-[3.2rem] uppercase leading-tight tracking-wide text-foreground">
          Your Style Match
        </h2>
        <p className="mt-2 font-sans text-[1.8rem] leading-relaxed text-foreground/70">
          {outfit.theme} — {outfit.items.length} items
        </p>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 gap-6 overflow-hidden p-10">
          {/* Left side: AI-generated image with hotspots (30% width) */}
          <div className="relative w-[30%] shrink-0 overflow-hidden rounded-none border border-border bg-muted">
            <div
              className="relative h-full w-full cursor-pointer"
              onClick={handleBackgroundClick}
            >
              <Image
                src="/images/robot-screen/ai-generated/1.jpg"
                alt="AI Generated Outfit"
                fill
                className={cn(
                  "object-cover transition-opacity duration-1000",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                sizes="30vw"
                onLoad={() => setImageLoaded(true)}
              />
              {/* Hotspot dots */}
              {outfit.items.map((item) => {
                const isVisible = visibleDots.has(item.id)
                const isSelected = selectedItemId === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={(e) => handleDotClick(item.id, e)}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    )}
                    style={{
                      left: `${item.hotspot.x}%`,
                      top: `${item.hotspot.y}%`,
                    }}
                    aria-label={`Select ${item.name}`}
                  >
                    <div
                      className={cn(
                        "relative h-10 w-10 rounded-full border-2 border-foreground bg-background transition-all",
                        isSelected
                          ? "border-kauri-green shadow-[0_0_0_4px_rgba(83,154,58,0.3)] scale-125"
                          : "hover:scale-110 hover:border-kauri-green"
                      )}
                    >
                      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right side: Product cards grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {outfit.items.map((item) => {
                const product = hotspotProducts[item.id]
                if (!product) return null

                const isSelected = selectedItemId === item.id
                const isDimmed = selectedItemId !== null && selectedItemId !== item.id

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "group relative flex flex-col overflow-hidden rounded-none border border-border bg-background transition-all",
                      isSelected
                        ? "border-kauri-green shadow-lg scale-[1.02]"
                        : isDimmed
                          ? "opacity-30"
                          : "hover:border-foreground hover:shadow-lg"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedItemId(isSelected ? null : item.id)}
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
                    {onToggleSaved && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleSaved(product.id)
                        }}
                        className={cn(
                          "absolute right-2 top-2 z-10 flex h-20 w-20 items-center justify-center rounded-none border transition-colors",
                          savedProductIds?.includes(product.id)
                            ? "border-transparent bg-background/90 text-kauri-red hover:bg-background"
                            : "border-border bg-background/90 text-foreground/70 hover:bg-background hover:text-foreground"
                        )}
                        aria-label={savedProductIds?.includes(product.id) ? "Remove from saved" : "Save for later"}
                      >
                        {savedProductIds?.includes(product.id) ? (
                          <HeartFilledIcon className="size-10" />
                        ) : (
                          <HeartIcon className="size-10" />
                        )}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-4 border-t border-border bg-background/95 p-8 backdrop-blur">
          <button
            onClick={() => {
              setStep("camera")
              setSelectedItemId(null)
              setVisibleDots(new Set())
              setImageLoaded(false)
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-none border-0 bg-foreground px-8 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-primary-foreground transition-all hover:bg-foreground/90 active:scale-95"
          >
            Scan Again
          </button>
          <button
            onClick={() => {
              // Placeholder for "More suggestions"
              alert("Generating more suggestions...")
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-none border-0 bg-foreground px-8 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-primary-foreground transition-all hover:bg-foreground/90 active:scale-95"
          >
            More Options
          </button>
          <button
            onClick={onClose}
            className="flex flex-1 items-center justify-center gap-2 rounded-none border-0 bg-kauri-green px-8 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-primary-foreground transition-all hover:bg-kauri-green/90 active:scale-95"
          >
            Back to Main Menu
          </button>
        </div>
      </div>
    </div>
  )
}
