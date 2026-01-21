"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { motion, AnimatePresence } from "framer-motion"
import { productJourney, type JourneyStep } from "../../../data/productJourney"
import { CloseIcon } from "../../icons"

type ProductJourneyModalProps = {
  onClose: () => void
}

const STEP_ICONS: Record<JourneyStep["type"], string> = {
  RAW_MATERIAL: "🌱",
  MANUFACTURING: "🏭",
  DYEING: "🎨",
  ASSEMBLY: "✂️",
  DELIVERY: "📦"
}

// Fix for default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
})

export function ProductJourneyModal ({ onClose }: ProductJourneyModalProps) {
  const [activeStepId, setActiveStepId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const polylineRef = useRef<L.Polyline | null>(null)
  const playTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const flyToLocation = (lat: number, lng: number) => {
    if (!map.current) return
    map.current.flyTo([lat, lng], 6, {
      duration: 1.5
    })
  }

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = L.map(mapContainer.current, {
      center: [22.2587, 71.1924], // First step location [lat, lng]
      zoom: 2.5
    })

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map.current)

    // Add zoom controls
    L.control.zoom({
      position: "topright"
    }).addTo(map.current)

    // Create custom icon function
    const createCustomIcon = (stepType: JourneyStep["type"], isActive: boolean) => {
      return L.divIcon({
        className: "journey-marker",
        html: `<div class="marker-pin ${isActive ? "active" : ""}">${STEP_ICONS[stepType]}</div>`,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
      })
    }

    // Add markers for all steps
    productJourney.steps.forEach((step, index) => {
      const isFirst = index === 0
      const icon = createCustomIcon(step.type, isFirst)
      
      const marker = L.marker([step.location.lat, step.location.lng], { icon })
        .addTo(map.current!)
        .on("click", () => {
          setActiveStepId(step.id)
          flyToLocation(step.location.lat, step.location.lng)
        })

      markersRef.current.push(marker)
    })

    // Draw path between steps
    const coordinates = productJourney.steps.map(step => [step.location.lat, step.location.lng] as [number, number])
    polylineRef.current = L.polyline(coordinates, {
      color: "#3b82f6",
      weight: 2,
      opacity: 0.6
    }).addTo(map.current!)

    // Set first step as active
    setActiveStepId(productJourney.steps[0].id)

    return () => {
      markersRef.current.forEach(marker => marker.remove())
      if (polylineRef.current) {
        polylineRef.current.remove()
      }
      playTimeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      playTimeoutsRef.current = []
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Update active marker styling
  useEffect(() => {
    if (!map.current) return

    markersRef.current.forEach((marker, index) => {
      const step = productJourney.steps[index]
      if (!step) return
      
      const isActive = step.id === activeStepId
      const icon = L.divIcon({
        className: "journey-marker",
        html: `<div class="marker-pin ${isActive ? "active" : ""}">${STEP_ICONS[step.type]}</div>`,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
      })
      
      marker.setIcon(icon)
    })
  }, [activeStepId])

  const handleStepClick = (step: JourneyStep) => {
    setActiveStepId(step.id)
    flyToLocation(step.location.lat, step.location.lng)
  }

  const playJourney = () => {
    if (isPlaying) {
      // Stop playing
      playTimeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      playTimeoutsRef.current = []
      setIsPlaying(false)
      setCompletedSteps(new Set())
      return
    }

    setIsPlaying(true)
    setCompletedSteps(new Set())
    setActiveStepId(productJourney.steps[0].id)
    flyToLocation(productJourney.steps[0].location.lat, productJourney.steps[0].location.lng)

    productJourney.steps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setActiveStepId(step.id)
        setCompletedSteps(prev => new Set([...prev, step.id]))
        flyToLocation(step.location.lat, step.location.lng)

        if (index === productJourney.steps.length - 1) {
          setIsPlaying(false)
        }
      }, index * 2500)
      playTimeoutsRef.current.push(timeout)
    })
  }

  const activeStep = productJourney.steps.find(s => s.id === activeStepId) || productJourney.steps[0]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="relative flex h-[90vh] w-[min(1400px,96vw)] flex-col gap-6 rounded-none border-2 border-foreground bg-background p-[var(--kauri-container)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-sans text-[1.6rem] uppercase tracking-widest text-foreground/60">
              Sustainability
            </p>
            <h3 className="font-heading text-[2.8rem] font-normal uppercase tracking-wide text-foreground">
              Product Journey
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={playJourney}
              className="flex min-h-[5rem] items-center justify-center gap-3 rounded-none border-2 border-kauri-blue bg-kauri-blue/10 px-6 py-3 font-sans text-[1.6rem] font-medium uppercase tracking-wide text-kauri-blue transition-all hover:bg-kauri-blue hover:text-white active:scale-95"
            >
              {isPlaying ? "⏸ Stop" : "▶ Play Journey"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-none border-2 border-foreground bg-background font-sans text-[1.6rem] font-bold text-foreground transition hover:bg-foreground hover:text-primary-foreground active:scale-95"
              aria-label="Close journey modal"
            >
              <CloseIcon className="size-8" />
            </button>
          </div>
        </div>

        {/* Main Content: Timeline + Map */}
        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Left: Timeline */}
          <div className="flex w-[400px] flex-col gap-4 overflow-y-auto border-r border-border pr-6">
            <div className="flex flex-col gap-2">
              <h4 className="font-heading text-[2.2rem] font-normal uppercase tracking-wide text-foreground">
                {productJourney.product.name}
              </h4>
              <p className="font-sans text-[1.6rem] text-foreground/70">
                {productJourney.product.description}
              </p>
              <div className="flex gap-6 pt-2">
                <div>
                  <p className="font-sans text-[1.4rem] text-foreground/60">Total CO₂</p>
                  <p className="font-sans text-[2rem] font-bold text-foreground">
                    {productJourney.product.totalCO2} kg
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[1.4rem] text-foreground/60">Distance</p>
                  <p className="font-sans text-[2rem] font-bold text-foreground">
                    {productJourney.product.totalDistanceKm.toLocaleString()} km
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              {productJourney.steps.map((step, index) => {
                const isActive = step.id === activeStepId
                const isCompleted = completedSteps.has(step.id)

                return (
                  <motion.button
                    key={step.id}
                    type="button"
                    onClick={() => handleStepClick(step)}
                    className={`relative flex flex-col gap-2 rounded-none border-2 p-4 text-left transition-all ${
                      isActive
                        ? "border-kauri-blue bg-kauri-blue/10"
                        : "border-border bg-background hover:border-foreground/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-none border-2 text-[2rem] transition-colors ${
                          isActive || isCompleted
                            ? "border-kauri-green bg-kauri-green/10"
                            : "border-border bg-muted"
                        }`}
                      >
                        {STEP_ICONS[step.type]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-heading text-[1.8rem] font-normal uppercase tracking-wide text-foreground">
                            {step.title}
                          </h5>
                          {isCompleted && <span className="text-kauri-green">✓</span>}
                        </div>
                        <p className="font-sans text-[1.4rem] text-foreground/60">
                          {step.location.name}, {step.location.country}
                        </p>
                        <p className="font-sans text-[1.2rem] text-foreground/50">
                          {step.dateRange}
                        </p>
                      </div>
                    </div>
                    {step.transport && (
                      <div className="ml-[60px] border-t border-border pt-2">
                        <p className="font-sans text-[1.2rem] text-foreground/60">
                          {step.transport.method} • {step.transport.distanceKm.toLocaleString()} km
                        </p>
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Right: Map + Story */}
          <div className="flex flex-1 flex-col gap-6 overflow-hidden">
            {/* Map */}
            <div className="relative h-[400px] flex-1 overflow-hidden rounded-none border-2 border-border">
              <div ref={mapContainer} className="h-full w-full" />
              <style jsx global>{`
                .journey-marker {
                  background: transparent !important;
                  border: none !important;
                }
                .journey-marker .marker-pin {
                  width: 48px;
                  height: 48px;
                  border-radius: 50%;
                  background: white;
                  border: 3px solid #3b82f6;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 24px;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                  transition: all 0.3s ease;
                }
                .journey-marker .marker-pin.active {
                  border-color: #10b981;
                  border-width: 4px;
                  transform: scale(1.2);
                  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
                }
                .leaflet-container {
                  font-family: inherit;
                }
              `}</style>
            </div>

            {/* Active Step Story */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 rounded-none border-2 border-border bg-muted/20 p-6"
              >
                <div>
                  <h4 className="font-heading text-[2.2rem] font-normal uppercase tracking-wide text-foreground">
                    {activeStep.title}
                  </h4>
                  <p className="font-sans text-[1.6rem] text-foreground/70">
                    {activeStep.location.name}, {activeStep.location.country}
                  </p>
                </div>

                <p className="font-sans text-[1.8rem] leading-relaxed text-foreground/90">
                  {activeStep.story}
                </p>

                {/* Sustainability Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {activeStep.sustainability.co2EmissionsKg && (
                    <div className="flex flex-col gap-1">
                      <p className="font-sans text-[1.4rem] text-foreground/60">CO₂ Emissions</p>
                      <p className="font-sans text-[2rem] font-bold text-foreground">
                        {activeStep.sustainability.co2EmissionsKg} kg
                      </p>
                    </div>
                  )}
                  {activeStep.sustainability.waterUsedLiters && (
                    <div className="flex flex-col gap-1">
                      <p className="font-sans text-[1.4rem] text-foreground/60">Water Used</p>
                      <p className="font-sans text-[2rem] font-bold text-foreground">
                        {activeStep.sustainability.waterUsedLiters} L
                      </p>
                    </div>
                  )}
                  {activeStep.sustainability.energyType && (
                    <div className="flex flex-col gap-1">
                      <p className="font-sans text-[1.4rem] text-foreground/60">Energy</p>
                      <p className="font-sans text-[1.6rem] text-foreground">
                        {activeStep.sustainability.energyType}
                      </p>
                    </div>
                  )}
                  {activeStep.sustainability.materialsUsed && (
                    <div className="flex flex-col gap-1">
                      <p className="font-sans text-[1.4rem] text-foreground/60">Materials</p>
                      <p className="font-sans text-[1.6rem] text-foreground">
                        {activeStep.sustainability.materialsUsed.join(", ")}
                      </p>
                    </div>
                  )}
                </div>

                {activeStep.sustainability.certifications && activeStep.sustainability.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeStep.sustainability.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="rounded-none border border-kauri-green bg-kauri-green/10 px-3 py-1 font-sans text-[1.2rem] text-kauri-green"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
