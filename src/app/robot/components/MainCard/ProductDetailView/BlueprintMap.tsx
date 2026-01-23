"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"

function StoreLayout() {
  return (
    <>
      {/* Outer Walls */}
      <rect x="5" y="5" width="390" height="490" fill="none" stroke="currentColor" strokeWidth="6" className="text-foreground/20" />

      {/* --- TOP SECTION --- */}

      {/* Back Stock Room */}
      <rect x="5" y="5" width="390" height="60" fill="currentColor" fillOpacity="0.1" className="text-foreground/20" />
      <text x="200" y="35" dominantBaseline="middle" textAnchor="middle" className="text-[12px] font-bold fill-muted-foreground uppercase tracking-widest">
        [ BACK STOCK ROOM ]
      </text>

      {/* Fitting Rooms */}
      {/* Left */}
      <g transform="translate(5, 5)">
        <rect width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/20" />
        <text x="30" y="25" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Fitting Room</text>
        <text x="30" y="40" textAnchor="middle" className="text-[8px] font-bold fill-muted-foreground">[CURTAIN]</text>
      </g>
      {/* Right */}
      <g transform="translate(335, 5)">
        <rect width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/20" />
        <text x="30" y="25" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Fitting Room</text>
        <text x="30" y="40" textAnchor="middle" className="text-[8px] font-bold fill-muted-foreground">[CURTAIN]</text>
      </g>

      {/* Sneaker Wall */}
      <rect x="80" y="80" width="240" height="20" rx="2" fill="currentColor" fillOpacity="0.2" className="text-foreground/20" />
      <text x="200" y="90" dominantBaseline="middle" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">
        [ SNEAKER WALL ]
      </text>

      {/* --- CENTER ISLANDS --- */}

      {/* Island 3 (Top) - Guinadi */}
      <rect x="150" y="140" width="100" height="40" rx="10" fill="currentColor" fillOpacity="0.1" className="text-foreground/20" />
      <text x="200" y="160" textAnchor="middle" className="text-[9px] font-bold fill-muted-foreground">ISLAND 3</text>
      <text x="200" y="172" textAnchor="middle" className="text-[8px] fill-muted-foreground">(Guinadi)</text>

      {/* Island 2 (Mid) - Sacheto */}
      <rect x="150" y="220" width="100" height="40" rx="10" fill="currentColor" fillOpacity="0.1" className="text-foreground/20" />
      <text x="200" y="240" textAnchor="middle" className="text-[9px] font-bold fill-muted-foreground">ISLAND 2</text>
      <text x="200" y="252" textAnchor="middle" className="text-[8px] fill-muted-foreground">(Sacheto/Bags)</text>

      {/* Island 1 (Bottom) - Cosmetics */}
      <rect x="150" y="300" width="100" height="40" rx="10" fill="currentColor" fillOpacity="0.1" className="text-foreground/20" />
      <text x="200" y="320" textAnchor="middle" className="text-[9px] font-bold fill-muted-foreground">ISLAND 1</text>
      <text x="200" y="332" textAnchor="middle" className="text-[8px] fill-muted-foreground">(Cosmetics)</text>

      {/* --- RIGHT SIDE --- */}

      {/* Cashier */}
      <g transform="translate(260, 200)">
        <rect width="30" height="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/20" />
        <text x="15" y="40" textAnchor="middle" transform="rotate(-90, 15, 40)" className="text-[10px] font-bold fill-muted-foreground tracking-widest">CASHIER</text>
      </g>

      {/* Right Wall Sections (Men) */}
      <text x="360" y="140" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Men</text>
      <text x="360" y="152" textAnchor="middle" className="text-[8px] fill-muted-foreground">JACKETS</text>

      <text x="360" y="240" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Men</text>
      <text x="360" y="252" textAnchor="middle" className="text-[8px] fill-muted-foreground">SHIRTS & KNIT</text>

      <rect x="365" y="350" width="10" height="60" fill="currentColor" fillOpacity="0.2" className="text-foreground/20" />
      <text x="350" y="370" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Men</text>
      <text x="350" y="382" textAnchor="middle" className="text-[8px] fill-muted-foreground">PANTS (Racks)</text>

      {/* --- LEFT SIDE --- */}

      {/* Left Wall Sections (Women) */}
      {/* Women Pants (Racks) */}
      <rect x="25" y="140" width="10" height="60" fill="currentColor" fillOpacity="0.2" className="text-foreground/20" />
      <text x="55" y="160" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Women</text>
      <text x="55" y="172" textAnchor="middle" className="text-[8px] fill-muted-foreground">PANTS (Racks)</text>

      {/* Women Shirts */}
      <text x="55" y="240" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Women</text>
      <text x="55" y="252" textAnchor="middle" className="text-[8px] fill-muted-foreground">SHIRTS & KNIT</text>

      {/* Women Jackets */}
      <text x="55" y="370" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Women</text>
      <text x="55" y="382" textAnchor="middle" className="text-[8px] fill-muted-foreground">JACKETS</text>

      {/* --- BOTTOM --- */}

      {/* Main Entrance */}
      <rect x="120" y="460" width="160" height="30" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" className="text-foreground/20" />
      <text x="200" y="475" dominantBaseline="middle" textAnchor="middle" className="text-[12px] font-bold fill-muted-foreground uppercase tracking-widest">
        MAIN ENTRANCE
      </text>
    </>
  )
}

function RobotMarker({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="7" fill="#38bdf8" stroke="#0b1f2e" strokeWidth="1.5" />
      <circle cx={x} cy={y} r="10" fill="#38bdf8" fillOpacity="0.2" />
      <text
        x={x}
        y={y - 12}
        textAnchor="middle"
        fill="#38bdf8"
        fontSize="10"
        fontWeight="bold"
        fontFamily="var(--font-sans, 'Inter', sans-serif)"
      >
        Robot
      </text>
    </g>
  )
}

function ProductMarker({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="6" fill="#4ade80" stroke="#0b1f2e" strokeWidth="1.5" />
      <circle cx={x} cy={y} r="9" fill="#4ade80" fillOpacity="0.2" />
      <text
        x={x}
        y={y - 10}
        textAnchor="middle"
        fill="#4ade80"
        fontSize="10"
        fontWeight="bold"
        fontFamily="var(--font-sans, 'Inter', sans-serif)"
      >
        Product
      </text>
    </g>
  )
}

function LegendSwatch({
  variant,
  label,
}: {
  variant: "robot" | "product" | "path" | "shelves"
  label: string
}) {
  const swatchClass = {
    robot: "h-4 w-8 rounded-none bg-kauri-blue",
    product: "h-4 w-8 rounded-none bg-kauri-green",
    path: "h-4 w-8 rounded-none border-2 border-dashed border-kauri-green bg-transparent",
    shelves: "h-4 w-8 rounded-none bg-kauri-green/50",
  }[variant]
  return (
    <div className="flex items-center gap-2.5 font-sans text-[1rem] font-medium uppercase tracking-wide text-foreground">
      <span className={cn("shrink-0", swatchClass)} aria-hidden />
      <span>{label}</span>
    </div>
  )
}

// Convert from old coordinate system (0-100, 0-70) to new system (0-400, 0-500)
function convertCoordinates(pos: { x: number; y: number }): { x: number; y: number } {
  return {
    x: (pos.x / 100) * 400,
    y: (pos.y / 70) * 500
  }
}

// Clamp coordinates to the new canvas bounds
function clampToNewCanvas(pos: { x: number; y: number }): { x: number; y: number } {
  return {
    x: Math.max(10, Math.min(390, pos.x)),
    y: Math.max(10, Math.min(490, pos.y))
  }
}

// Determine location description based on product position
function getLocationDescription(pos: { x: number; y: number }): string {
  const { x, y } = pos

  // Left side (Women's section)
  if (x < 100) {
    if (y < 200) {
      return "on my left, 1st row along the wall — Women's Pants"
    } else if (y < 300) {
      return "on my left, 2nd row along the wall — Women's Shirts"
    } else {
      return "on my left, 3rd row along the wall — Women's Jackets"
    }
  }

  // Right side (Men's section)
  if (x > 300) {
    if (y < 200) {
      return "on my right, 1st row along the wall — Men's Jackets"
    } else if (y < 300) {
      return "on my right, 2nd row along the wall — Men's Shirts"
    } else {
      return "on my right, 3rd row along the wall — Men's Pants"
    }
  }

  // Center area (Islands)
  if (y < 200) {
    return "straight ahead, at the 1st center display"
  } else if (y < 280) {
    return "straight ahead, at the 2nd center display"
  } else if (y < 360) {
    return "straight ahead, at the 3rd center display"
  } else {
    return "straight ahead, near the entrance"
  }
}

export function BlueprintMap({
  productPosition,
  robotPosition,
  showRoute,
  hasReachedProduct,
  onStartGuidance,
  isGuiding,
  onClose,
}: {
  productPosition: { x: number; y: number }
  robotPosition: { x: number; y: number }
  showRoute: boolean
  hasReachedProduct: boolean
  onStartGuidance: () => void
  isGuiding: boolean
  onClose: () => void
}) {
  const [overlayStage, setOverlayStage] = useState<"follow" | "almost" | "here" | "found" | null>(null)
  const hasTriggeredRef = useRef(false)
  const timersRef = useRef<NodeJS.Timeout[]>([])

  // Convert and clamp positions to new coordinate system
  const convertedProduct = convertCoordinates(productPosition)
  const convertedRobot = convertCoordinates(robotPosition)
  const safeProduct = clampToNewCanvas(convertedProduct)
  const safeRobot = clampToNewCanvas(convertedRobot)

  // Clear all timers helper
  const clearAllTimers = () => {
    timersRef.current.forEach(timer => clearTimeout(timer))
    timersRef.current = []
  }

  // Handle overlay stages when guidance starts - only trigger once
  useEffect(() => {
    if (isGuiding && !hasReachedProduct && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true
      clearAllTimers()

      // Stage 1: Show "Follow me" immediately for 3s
      timersRef.current.push(setTimeout(() => setOverlayStage("follow"), 10))

      // Stage 2: After 3s, show "Almost there" for 2s
      timersRef.current.push(setTimeout(() => setOverlayStage("almost"), 3000))

      // Stage 3: After 5s total (3+2), show "Here is your product" for 1s
      timersRef.current.push(setTimeout(() => setOverlayStage("here"), 5000))

      // Stage 4: After 6s total (3+2+1), show location description + button
      timersRef.current.push(setTimeout(() => setOverlayStage("found"), 6000))
    }

    // Cleanup only on unmount
    return () => {
      if (!isGuiding) {
        clearAllTimers()
      }
    }
  }, [isGuiding, hasReachedProduct])

  // Handle closing the overlay when button is clicked
  const handleFoundIt = () => {
    clearAllTimers()
    setOverlayStage(null)
    hasTriggeredRef.current = false
    onClose()
  }

  // Calculate route through center aisle (x = 200 is center)
  const centerX = 200
  const locationDescription = getLocationDescription(safeProduct)

  return (
    <div className="relative w-full h-full overflow-hidden rounded-none border-2 border-border bg-card">
      {/* Floor Texture/Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <svg
        viewBox="0 0 400 500"
        className="w-full h-full text-foreground/20"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Store floor plan with product location and robot position"
      >
        <StoreLayout />
        {showRoute && (
          <polyline
            points={`${safeRobot.x},${safeRobot.y} ${centerX},${safeRobot.y} ${centerX},${safeProduct.y} ${safeProduct.x},${safeProduct.y}`}
            fill="none"
            stroke="#5eead4"
            strokeWidth="3"
            strokeDasharray="8 4"
            opacity="0.8"
          />
        )}
        <RobotMarker x={safeRobot.x} y={safeRobot.y} />
        <ProductMarker x={safeProduct.x} y={safeProduct.y} />
      </svg>
      <div className="pointer-events-none absolute left-6 right-48 bottom-6 flex flex-wrap items-center gap-3 rounded-none  border-foreground bg-transparent
       px-4 py-3">
        <LegendSwatch variant="robot" label="Robot start" />
        <LegendSwatch variant="product" label="Product location" />
        <LegendSwatch variant="path" label="Guidance path" />
        <LegendSwatch variant="shelves" label="Shelves" />
      </div>
      <button
        type="button"
        onClick={onStartGuidance}
        className="absolute bottom-6 right-6 z-10 flex min-h-[6rem] items-center justify-center gap-3 rounded-none border-2 border-kauri-green bg-kauri-green px-8 py-4 font-sans text-[2rem] font-semibold uppercase tracking-wide text-white transition-all hover:bg-kauri-green/90 active:scale-95"
      >
        Take me to the product
      </button>

      {/* Guidance Overlay */}
      {overlayStage && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="text-center space-y-6 px-8">
            {/* Stage 1: Follow me (3s) */}
            {overlayStage === "follow" && (
              <h2 className="font-heading text-[3.5rem] lg:text-[4.5rem] font-bold uppercase tracking-wider text-foreground animate-pulse">
                Follow me
              </h2>
            )}

            {/* Stage 2: Almost there (2s) */}
            {overlayStage === "almost" && (
              <h2 className="font-heading text-[3.5rem] lg:text-[4.5rem] font-bold uppercase tracking-wider text-foreground animate-pulse">
                Almost there...
              </h2>
            )}

            {/* Stage 3: Here is your product (1s) */}
            {overlayStage === "here" && (
              <h2 className="font-heading text-[3.5rem] lg:text-[4.5rem] font-bold uppercase tracking-wider text-foreground">
                Here is your product
              </h2>
            )}

            {/* Stage 4: Location Description + Button */}
            {overlayStage === "found" && (
              <>
                <h2 className="font-heading text-[3.5rem] lg:text-[4.5rem] font-bold uppercase tracking-wider text-foreground pb-8">
                  Here is your product
                </h2>
                <p className="font-sans text-[1.5rem] lg:text-[2rem] font-medium text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                  Look to my left, 2nd row along the wall.
                </p>
                <button
                  type="button"
                  onClick={handleFoundIt}
                  className="mt-20 flex min-h-[6rem] items-center justify-center gap-3 rounded-none border-2 border-kauri-green bg-kauri-green px-12 py-4 font-sans text-[2rem] font-semibold uppercase tracking-wide text-white transition-all hover:bg-kauri-green/90 active:scale-95 animate-in fade-in duration-300 mx-auto"
                >
                  I found it!
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
