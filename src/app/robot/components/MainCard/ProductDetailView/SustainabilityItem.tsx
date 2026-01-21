"use client"

import Image from "next/image"
import { SUSTAINABILITY_IMAGES } from "./constants"

type SustainabilityItemProps = {
  title: string
  description: string
  imageKey: string
}

export function SustainabilityItem ({ title, description, imageKey }: SustainabilityItemProps) {
  return (
    <div className="flex flex-col gap-4 rounded-none border border-border bg-muted/20 p-[var(--kauri-card-x)]">
      <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full bg-muted">
        <Image
          src={SUSTAINABILITY_IMAGES[imageKey]}
          alt={title}
          fill
          className="object-cover"
          sizes="12rem"
        />
      </div>
      <h4 className="text-center font-heading text-[2rem] font-normal uppercase tracking-wide text-foreground">
        {title}
      </h4>
      <p className="text-center font-sans text-[1.8rem] leading-relaxed text-foreground/90">
        {description}
      </p>
    </div>
  )
}
