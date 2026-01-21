"use client"

import Image from "next/image"
import { BRAND_INFO } from "./constants"

export function ProductHeader ({
  isNew,
  brand,
  title,
}: {
  isNew: boolean
  brand: string | null
  title: string
}) {
  const brandKey = brand ? brand.toUpperCase().replace(/\s+/g, "") : null
  const brandInfo = brandKey && brandKey in BRAND_INFO ? BRAND_INFO[brandKey] : null

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {isNew && (
          <span className="bg-kauri-blue px-4 py-1.5 font-sans text-[1.5rem] font-bold uppercase tracking-wider text-white">
            NEW
          </span>
        )}
      </div>
      {brandInfo && brandInfo.logo && (
        <div className="flex items-center gap-4 mb-2">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-none border-2 border-foreground bg-background">
            <Image
              src={brandInfo.logo}
              alt={brandInfo.name}
              fill
              className="object-contain p-2"
              sizes="5rem"
            />
          </div>
          <span className="font-sans text-[2.4rem] font-medium uppercase tracking-wide text-foreground">
            {brandInfo.name}
          </span>
        </div>
      )}
      {brand && !brandInfo && (
        <div className="mb-2">
          <span className="font-sans text-[2.4rem] font-medium uppercase tracking-wide text-foreground/70">
            {brand}
          </span>
        </div>
      )}
      <h2 className="font-heading text-[2.8rem] font-semibold uppercase leading-tight tracking-wide text-foreground lg:text-[3.2rem]">
        {title}
      </h2>
    </>
  )
}
