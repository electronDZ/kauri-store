"use client"

import { forwardRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "../icons"

type MainCardTriggerProps = React.HTMLAttributes<HTMLDivElement> & {
  hero: string
  description: string
  gridClass?: string
  imageGradient: string
  isCarousel?: boolean
  image?: string
  video?: string
  carouselImages?: readonly string[]
  currentSlide: number
  onSlideChange: (index: number) => void
}

export const MainCardTrigger = forwardRef<HTMLDivElement, MainCardTriggerProps>(function MainCardTrigger (
  {
    hero,
    description,
    gridClass,
    imageGradient,
    isCarousel,
    image,
    video,
    carouselImages,
    currentSlide,
    onSlideChange,
    ...rest
  },
  ref
) {
  return (
    <div
      {...rest}
      ref={ref}
      className={cn(
        "group relative flex min-h-[32rem] cursor-pointer flex-col justify-end overflow-hidden bg-muted transition-all hover:scale-[1.02] active:scale-[0.98]",
        gridClass
      )}
    >
      {image && (
        <Image
          src={image}
          alt={hero}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      )}

      {video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {isCarousel && carouselImages && (
        <div className="absolute inset-0">
          {carouselImages.map((img, index) => (
            <Image
              key={img}
              src={img}
              alt={`${hero} slide ${index + 1}`}
              fill
              className={cn(
                "object-cover transition-opacity duration-1000",
                currentSlide === index ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          ))}
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t transition-opacity",
          imageGradient
        )}
        aria-hidden
      />

      <div className="relative z-10 p-10">
        <h2 className="font-heading text-[3.2rem] font-semibold uppercase leading-tight tracking-wide text-white drop-shadow-lg">
          {hero}
        </h2>
        <p className="mt-3 font-sans text-[1.6rem] leading-relaxed text-white/90 drop-shadow-md">
          {description}
        </p>
        <button className="mt-6 flex items-center gap-2 font-sans text-[1.6rem] font-medium text-white drop-shadow-md transition-all hover:gap-4">
          View all
          <ChevronRightIcon />
        </button>
      </div>

      {isCarousel && carouselImages && (
        <div className="absolute bottom-4 left-10 z-20 flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                onSlideChange(index)
              }}
              className={cn(
                "h-2 rounded-full transition-all",
                currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
})
