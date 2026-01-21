"use client"

import { cn } from "@/lib/utils"
import { clampToCanvas } from "./utils"

function BlueprintZones () {
  const zones = [
    { x: 6, y: 10, w: 18, h: 12, label: "Entrance" },
    { x: 6, y: 48, w: 18, h: 12, label: "Checkout" },
    { x: 32, y: 8, w: 26, h: 14, label: "Section A" },
    { x: 32, y: 26, w: 26, h: 14, label: "Section B" },
    { x: 32, y: 44, w: 26, h: 14, label: "Section C" },
    { x: 64, y: 8, w: 26, h: 16, label: "Premium" },
    { x: 64, y: 30, w: 26, h: 16, label: "Storage" },
  ]
  const shelves = [
    { x: 36, y: 13, w: 4, h: 2, label: "A1" },
    { x: 44, y: 13, w: 4, h: 2, label: "A2" },
    { x: 52, y: 13, w: 4, h: 2, label: "A3" },
    { x: 36, y: 17.5, w: 4, h: 2, label: "A4" },
    { x: 44, y: 17.5, w: 4, h: 2, label: "A5" },
    { x: 52, y: 17.5, w: 4, h: 2, label: "A6" },
    { x: 36, y: 31, w: 4.5, h: 2, label: "B1" },
    { x: 44.5, y: 31, w: 4.5, h: 2, label: "B2" },
    { x: 53, y: 31, w: 4.5, h: 2, label: "B3" },
    { x: 36, y: 35.5, w: 4.5, h: 2, label: "B4" },
    { x: 44.5, y: 35.5, w: 4.5, h: 2, label: "B5" },
    { x: 53, y: 35.5, w: 4.5, h: 2, label: "B6" },
    { x: 36, y: 49.5, w: 4.5, h: 2, label: "C1" },
    { x: 44.5, y: 49.5, w: 4.5, h: 2, label: "C2" },
    { x: 53, y: 49.5, w: 4.5, h: 2, label: "C3" },
    { x: 69, y: 12.5, w: 4, h: 2.5, label: "P1" },
    { x: 77, y: 12.5, w: 4, h: 2.5, label: "P2" },
    { x: 69, y: 19.5, w: 4, h: 2.5, label: "P3" },
    { x: 77, y: 19.5, w: 4, h: 2.5, label: "P4" },
    { x: 69, y: 36.5, w: 4, h: 2.5, label: "S1" },
    { x: 77, y: 36.5, w: 4, h: 2.5, label: "S2" },
    { x: 69, y: 42.5, w: 4, h: 2.5, label: "S3" },
    { x: 77, y: 42.5, w: 4, h: 2.5, label: "S4" },
  ]
  const aisles = [
    "M 28 6 L 28 64",
    "M 30 6 L 30 64",
    "M 28 24 L 92 24",
    "M 28 40 L 92 40",
    "M 28 56 L 92 56",
    "M 64 8 L 64 64",
  ]
  return (
    <>
      {zones.map((z) => (
        <g key={z.label}>
          <rect
            x={z.x}
            y={z.y}
            width={z.w}
            height={z.h}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.5"
          />
          <rect
            x={z.x + 1.2}
            y={z.y + 1.2}
            width={z.label.length * 1.9 + 3.2}
            height="3.6"
            fill="rgba(13,40,60,0.9)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.4"
            rx="0.9"
          />
          <text
            x={z.x + 2.4}
            y={z.y + 3.9}
            fill="rgba(255,255,255,0.85)"
            fontSize="2.1"
            textAnchor="start"
            fontFamily="var(--font-sans, 'Inter', sans-serif)"
          >
            {z.label}
          </text>
        </g>
      ))}
      {aisles.map((d, i) => (
        <path
          key={d}
          d={d}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.35"
          strokeDasharray={i % 2 === 0 ? "2.4 2" : "1 1.8"}
          fill="none"
        />
      ))}
      {shelves.map((s) => (
        <g key={s.label}>
          <rect
            x={s.x}
            y={s.y}
            width={s.w}
            height={s.h}
            fill="rgba(94,234,212,0.08)"
            stroke="rgba(94,234,212,0.5)"
            strokeWidth="0.45"
            rx="0.5"
          />
          <text
            x={s.x + s.w / 2}
            y={s.y + s.h / 2 + 0.6}
            textAnchor="middle"
            fill="rgba(94,234,212,0.9)"
            fontSize="1.6"
            fontFamily="var(--font-sans, 'Inter', sans-serif)"
          >
            {s.label}
          </text>
        </g>
      ))}
    </>
  )
}

function Marker ({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  return (
    <>
      <circle cx={x} cy={y} r="1.6" fill={color} stroke="#0b1f2e" strokeWidth="0.5" />
      <text
        x={x + 2.6}
        y={y + 0.8}
        fill={color}
        fontSize="2"
        fontFamily="var(--font-sans, 'Inter', sans-serif)"
      >
        {label}
      </text>
    </>
  )
}

function LegendSwatch ({
  variant,
  label,
}: {
  variant: "robot" | "product" | "path" | "shelves"
  label: string
}) {
  const swatchClass = {
    robot: "h-3 w-6 rounded-none bg-kauri-blue",
    product: "h-3 w-6 rounded-none bg-kauri-green",
    path: "h-3 w-6 rounded-none border-2 border-dashed border-kauri-green bg-transparent",
    shelves: "h-3 w-6 rounded-none bg-kauri-green/50",
  }[variant]
  return (
    <div className="flex items-center gap-2 font-sans text-[1rem] font-medium uppercase tracking-wide text-foreground">
      <span className={cn("shrink-0", swatchClass)} aria-hidden />
      <span>{label}</span>
    </div>
  )
}

export function BlueprintMap ({
  productPosition,
  robotPosition,
  showRoute,
  hasReachedProduct,
  onStartGuidance,
  isGuiding,
}: {
  productPosition: { x: number; y: number }
  robotPosition: { x: number; y: number }
  showRoute: boolean
  hasReachedProduct: boolean
  onStartGuidance: () => void
  isGuiding: boolean
}) {
  const safeProduct = clampToCanvas(productPosition)
  const safeRobot = clampToCanvas(robotPosition)
  const spineX = 28
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-none border-2 border-border bg-[#0b1f2e] lg:min-h-[460px]">
      <svg
        viewBox="0 0 100 70"
        className="h-full w-full"
        role="img"
        aria-label="Store floor plan with product location and robot position"
      >
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" />
          </pattern>
        </defs>
        <rect width="100" height="70" fill="#0b1f2e" />
        <rect width="100" height="70" fill="url(#grid)" />
        <BlueprintZones />
        {showRoute && (
          <polyline
            points={`${safeRobot.x},${safeRobot.y} ${spineX},${safeRobot.y} ${spineX},${safeProduct.y} ${safeProduct.x},${safeProduct.y}`}
            fill="none"
            stroke="#5eead4"
            strokeWidth="1.4"
            strokeDasharray="2.5 1.6"
          />
        )}
        <Marker x={safeRobot.x} y={safeRobot.y} color="#38bdf8" label="Robot" />
        <Marker x={safeProduct.x} y={safeProduct.y} color="#4ade80" label="Product" />
      </svg>
      <div className="pointer-events-none absolute left-4 right-72 bottom-4 flex flex-wrap items-center gap-4 rounded-none border-2 border-foreground bg-background px-4 py-3">
        <LegendSwatch variant="robot" label="Robot start" />
        <LegendSwatch variant="product" label="Product location" />
        <LegendSwatch variant="path" label="Guidance path" />
        <LegendSwatch variant="shelves" label="Shelves" />
      </div>
      <button
        type="button"
        onClick={onStartGuidance}
        className="absolute bottom-5 right-5 z-10 flex min-h-[6.4rem] items-center justify-center gap-2 rounded-none border-2 border-kauri-green bg-kauri-green px-8 py-6 font-sans text-[2rem] font-semibold uppercase tracking-wide text-white transition-all hover:bg-kauri-green/90 active:scale-95"
      >
        {hasReachedProduct
          ? "Here is your product"
          : isGuiding
            ? "Guiding..."
            : "Take me to the product"}
      </button>
    </div>
  )
}
