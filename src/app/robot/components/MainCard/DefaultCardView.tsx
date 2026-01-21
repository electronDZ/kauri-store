"use client"

import Image from "next/image"
import { DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { BackArrowIcon } from "../icons"

export function DefaultCardView ({
  hero,
  description,
  image,
  video,
  isCarousel,
  carouselImages,
  currentSlide,
  imageGradient,
  onBack,
}: {
  hero: string
  description: string
  image?: string
  video?: string
  isCarousel?: boolean
  carouselImages?: readonly string[]
  currentSlide: number
  imageGradient: string
  onBack: () => void
}) {
  return (
    <>
      <div className="relative h-[40vh] w-full overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={hero}
            fill
            className="object-cover"
            sizes="90vw"
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
                sizes="90vw"
              />
            ))}
          </div>
        )}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t",
            imageGradient
          )}
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-12">
          <DialogTitle className="font-heading text-[4.5rem] uppercase leading-tight tracking-wide text-foreground">
            {hero}
          </DialogTitle>
          <p className="mt-6 font-sans text-[2rem] leading-relaxed text-foreground/80">
            {description}
          </p>
          <div className="mt-8">
            <p className="font-sans text-[1.8rem] leading-relaxed text-foreground/70">
              Explore more about this section. Additional content and details will be displayed here.
            </p>
          </div>
        </div>

        <div className="border-t border-border bg-background/95 p-8 backdrop-blur">
          <button
            onClick={onBack}
            className="flex w-full items-center justify-center gap-3 rounded-none border-2 border-foreground bg-background px-8 py-6 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
          >
            <BackArrowIcon />
            Back
          </button>
        </div>
      </div>
    </>
  )
}
