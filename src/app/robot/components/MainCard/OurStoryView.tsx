"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { BackArrowIcon } from "../icons"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface StoryStep {
  id: string
  title: string
  content: React.ReactNode
  image?: string
  imagePosition?: "top" | "bottom" | "left" | "right"
}

const STORY_STEPS: StoryStep[] = [
  {
    id: "mission",
    title: "Our Mission",
    image: "/images/robot-screen/about-us/1.webp",
    imagePosition: "left",
    content: (
      <div className="space-y-6">
        <p className="font-sans text-[2rem] leading-relaxed text-foreground/90">
          Our mission is to provide innovative solutions to sectors with high impact on people's health and the environment. We also want to change the way we consume, by educating and offering our customers a mix of sustainable, innovative and high-quality products.
        </p>
        <p className="font-sans text-[2rem] leading-relaxed text-foreground/90">
          Therefore, we are here to promote conscious and responsible consumption, for today's and tomorrow's world.
        </p>
      </div>
    ),
  },
  {
    id: "values",
    title: "Our Values",
    image: "/images/robot-screen/about-us/2.jpg",
    imagePosition: "top",
    content: (
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-heading text-[2.8rem] uppercase tracking-wide text-foreground">
            Responsible Innovation
          </h3>
          <p className="font-sans text-[1.8rem] leading-relaxed text-foreground/80">
            VALUE N 01
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-heading text-[2.8rem] uppercase tracking-wide text-foreground">
            Slow Revolution
          </h3>
          <p className="font-sans text-[1.8rem] leading-relaxed text-foreground/80">
            VALUE N 02
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-heading text-[2.8rem] uppercase tracking-wide text-foreground">
            Health & Respect
          </h3>
          <p className="font-sans text-[1.8rem] leading-relaxed text-foreground/80">
            VALUE N 03
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-heading text-[2.8rem] uppercase tracking-wide text-foreground">
            Ethics & Sustainability
          </h3>
          <p className="font-sans text-[1.8rem] leading-relaxed text-foreground/80">
            VALUE N 04
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "team",
    title: "Our Team",
    image: "/images/robot-screen/about-us/3.webp",
    imagePosition: "right",
    content: (
      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="font-heading text-[2.8rem] uppercase tracking-wide text-foreground">
            Daniel Tocca
          </h3>
          <p className="font-sans text-[1.6rem] font-medium uppercase tracking-wide text-foreground/70">
            Founder
          </p>
          <p className="font-sans text-[1.8rem] leading-relaxed text-foreground/90">
            I want to make the people around me happy, contributing to reducing the environmental impact of the fashion industry.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-heading text-[2.8rem] uppercase tracking-wide text-foreground">
            Bernhard Schönhuber
          </h3>
          <p className="font-sans text-[1.6rem] font-medium uppercase tracking-wide text-foreground/70">
            Founder
          </p>
          <p className="font-sans text-[1.8rem] leading-relaxed text-foreground/90">
            My vision is to contribute in my own small way to a better world by managing a sustainable business model for all stakeholders involved.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-heading text-[2.8rem] uppercase tracking-wide text-foreground">
            Sara Pacifici
          </h3>
          <p className="font-sans text-[1.6rem] font-medium uppercase tracking-wide text-foreground/70">
            Marketing Manager
          </p>
          <p className="font-sans text-[1.8rem] leading-relaxed text-foreground/90">
            I believe that by educating customers towards a more sustainable lifestyle, the message of the green economy can be understood and spread to involve the world in a green revolution.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "philosophy",
    title: "Our Philosophy",
    image: "/images/robot-screen/about-us/4.webp",
    imagePosition: "bottom",
    content: (
      <div className="space-y-8">
        <blockquote className="border-l-4 border-kauri-green pl-8">
          <p className="font-heading text-[3.2rem] leading-tight tracking-wide text-foreground">
            "What really matters are the experiences we have lived, the people we know and the values we believe in..."
          </p>
        </blockquote>
      </div>
    ),
  },
  {
    id: "name",
    title: "Why the Name Kauri",
    image: "/images/robot-screen/about-us/5.webp",
    imagePosition: "left",
    content: (
      <div className="space-y-6">
        <p className="font-sans text-[2rem] leading-relaxed text-foreground/90">
          Kauri is among the largest tree species in the world. These trees were felled by cataclysms and buried in the mud of swamps; a combination of climatic conditions left them intact for a period ranging from 20,000 to 50,000 years.
        </p>
        <p className="font-sans text-[2rem] leading-relaxed text-foreground/90">
          What makes Kauri incredibly unique and fascinating is that despite its long stay under the mud, it is neither rotten nor petrified, allowing man to work it like freshly cut wood. Furthermore, Kauri can be considered the most ecological wood in the world. No deforestation is necessary to work it.
        </p>
      </div>
    ),
  },
]

export function OurStoryView ({
  onBack,
}: {
  onBack: () => void
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)
  const endX = useRef<number | null>(null)
  const endY = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)
  const isDragging = useRef(false)

  const minSwipeDistance = 50

  const handleStart = (clientX: number, clientY: number) => {
    endX.current = null
    endY.current = null
    startX.current = clientX
    startY.current = clientY
    isScrolling.current = false
    isDragging.current = true
    
    // Prevent text selection during drag
    if (containerRef.current) {
      containerRef.current.style.userSelect = 'none'
      containerRef.current.style.webkitUserSelect = 'none'
    }
  }

  const handleMove = (clientX: number, clientY: number, preventDefault?: () => void) => {
    if (!startX.current || !startY.current || !isDragging.current) return
    
    const deltaX = Math.abs(clientX - startX.current)
    const deltaY = Math.abs(clientY - startY.current)
    
    // If vertical movement is greater, it's a scroll, not a swipe
    if (deltaY > deltaX) {
      isScrolling.current = true
      return
    }
    
    // Prevent default scrolling if it's a horizontal swipe
    if (deltaX > 10 && deltaX > deltaY && preventDefault) {
      preventDefault()
    }
    
    endX.current = clientX
    endY.current = clientY
  }

  const handleEnd = () => {
    // Restore text selection
    if (containerRef.current) {
      containerRef.current.style.userSelect = ''
      containerRef.current.style.webkitUserSelect = ''
    }
    
    if (!startX.current || !endX.current || isScrolling.current || !isDragging.current) {
      startX.current = null
      startY.current = null
      isDragging.current = false
      return
    }
    
    const distanceX = startX.current - endX.current
    const distanceY = startY.current && endY.current 
      ? Math.abs(startY.current - endY.current) 
      : 0
    
    // Only process if horizontal swipe is dominant
    if (Math.abs(distanceX) > distanceY && Math.abs(distanceX) > minSwipeDistance) {
      const isLeftSwipe = distanceX > minSwipeDistance
      const isRightSwipe = distanceX < -minSwipeDistance

      if (isLeftSwipe && currentStep < STORY_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1)
      }
      if (isRightSwipe && currentStep > 0) {
        setCurrentStep((prev) => prev - 1)
      }
    }
    
    startX.current = null
    startY.current = null
    endX.current = null
    endY.current = null
    isDragging.current = false
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.targetTouches[0].clientX, e.targetTouches[0].clientY, () => {
      e.preventDefault()
      e.stopPropagation()
    })
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't interfere with buttons, links, or other interactive elements
    const target = e.target as HTMLElement
    if (target.closest('button, a, input, select, textarea')) return
    if (e.button !== 0) return // Only handle left mouse button
    
    // Prevent text selection
    e.preventDefault()
    handleStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    // Prevent text selection during drag
    if (isDragging.current) {
      e.preventDefault()
    }
    handleMove(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleEnd()
    }
  }

  const goToNext = () => {
    if (currentStep < STORY_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const currentStory = STORY_STEPS[currentStep]

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full flex-col overflow-hidden [touch-action:pan-y_pinch-zoom] [user-select:none] [&_img]:[user-select:none] [&_img]:select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onSelectStart={(e) => {
        if (isDragging.current) {
          e.preventDefault()
        }
      }}
      onDragStart={(e) => {
        if (isDragging.current) {
          e.preventDefault()
        }
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-background/95 p-8 backdrop-blur">
        <button
          onClick={onBack}
          className="flex items-center gap-3 rounded-none border-2 border-foreground bg-background px-6 py-4 font-sans text-[1.6rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
        >
          <BackArrowIcon />
          Back
        </button>
        <div className="flex items-center gap-4">
          <span className="font-sans text-[1.6rem] font-medium text-foreground/70">
            {currentStep + 1} / {STORY_STEPS.length}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div 
        className="relative flex flex-1 items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navigation Buttons */}
        {currentStep > 0 && (
          <button
            onClick={goToPrevious}
            className="absolute left-8 z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground bg-background/95 backdrop-blur transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
            aria-label="Previous step"
          >
            <ChevronLeftIcon className="size-8" />
          </button>
        )}
        {currentStep < STORY_STEPS.length - 1 && (
          <button
            onClick={goToNext}
            className="absolute right-8 z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground bg-background/95 backdrop-blur transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
            aria-label="Next step"
          >
            <ChevronRightIcon className="size-8" />
          </button>
        )}

        {/* Step Content */}
        <div 
          className="flex h-full w-full items-center justify-center overflow-y-auto px-16 py-12 [user-select:none]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onSelectStart={(e) => {
            if (isDragging.current) {
              e.preventDefault()
            }
          }}
          onDragStart={(e) => {
            if (isDragging.current) {
              e.preventDefault()
            }
          }}
        >
          <div
            key={currentStep}
            className="w-full max-w-480 space-y-8 animate-in fade-in-0 slide-in-from-right-4 duration-300"
          >
            <h2 className="font-heading text-[4.5rem] uppercase leading-tight tracking-wide text-foreground">
              {currentStory.title}
            </h2>
            
            {currentStory.image && currentStory.imagePosition === "top" && (
              <div className="relative h-[35vh] w-full overflow-hidden rounded-lg">
                <Image
                  src={currentStory.image}
                  alt={currentStory.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 120rem) 100vw, 120rem"
                />
              </div>
            )}

            <div className={cn(
              "flex gap-8",
              currentStory.imagePosition === "left" || currentStory.imagePosition === "right"
                ? "flex-row items-start"
                : "flex-col"
            )}>
              {currentStory.image && currentStory.imagePosition === "left" && (
                <div className="relative h-[50vh] w-full shrink-0 max-w-[45%] overflow-hidden rounded-lg">
                  <Image
                    src={currentStory.image}
                    alt={currentStory.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 120rem) 45vw, 45rem"
                  />
                </div>
              )}

              <div className={cn(
                "font-sans text-[1.8rem] leading-relaxed",
                (currentStory.imagePosition === "left" || currentStory.imagePosition === "right") && "flex-1"
              )}>
                {currentStory.content}
              </div>

              {currentStory.image && currentStory.imagePosition === "right" && (
                <div className="relative h-[50vh] w-full shrink-0 max-w-[45%] overflow-hidden rounded-lg">
                  <Image
                    src={currentStory.image}
                    alt={currentStory.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 120rem) 45vw, 45rem"
                  />
                </div>
              )}
            </div>

            {currentStory.image && currentStory.imagePosition === "bottom" && (
              <div className="relative h-[35vh] w-full overflow-hidden rounded-lg">
                <Image
                  src={currentStory.image}
                  alt={currentStory.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 120rem) 100vw, 120rem"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-3 border-t border-border bg-background/95 p-6 backdrop-blur">
        {STORY_STEPS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={cn(
              "h-3 rounded-full transition-all",
              index === currentStep
                ? "w-12 bg-kauri-green"
                : "w-3 bg-foreground/30 hover:bg-foreground/50"
            )}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
