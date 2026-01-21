"use client"

import Image from "next/image"

type BrandInfoData = {
  name: string
  description: string
  mission?: string
  values: string[]
  logo?: string
}

type BrandInfoProps = {
  brandInfo: BrandInfoData
}

type BrandInfoPropsWithMargin = BrandInfoProps & {
  noMargin?: boolean
}

export function BrandInfo ({ brandInfo, noMargin = false }: BrandInfoPropsWithMargin) {
  return (
    <div className={`${noMargin ? "" : "mt-4"} flex flex-col gap-5 rounded-none border-2 border-kauri-green/30 bg-kauri-green/5 p-[var(--kauri-modal)]`}>
      <div className="flex items-center gap-4">
        {brandInfo.logo ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-none border-2 border-foreground bg-background">
            <Image
              src={brandInfo.logo}
              alt={brandInfo.name}
              fill
              className="object-contain p-2"
              sizes="5rem"
            />
          </div>
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-none border-2 border-foreground bg-foreground">
            <span className="font-sans text-[2.4rem] font-bold uppercase tracking-wider text-primary-foreground">
              {brandInfo.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className="font-heading text-[3rem] font-normal uppercase tracking-wide text-foreground">
            About {brandInfo.name}
          </h4>
          {brandInfo.mission && (
            <p className="mt-1 font-sans text-[2rem] italic text-foreground/70">
              {brandInfo.mission}
            </p>
          )}
        </div>
      </div>
      <p className="font-sans text-[2.2rem] leading-relaxed text-foreground/90">
        {brandInfo.description}
      </p>
      <div className="mt-2">
        <h5 className="mb-3 font-heading text-[2.4rem] font-normal uppercase tracking-wide text-foreground">
          Our Commitment
        </h5>
        <ul className="flex flex-col gap-3 border-l-2 border-kauri-green/30 pl-4">
          {brandInfo.values.map((value, i) => (
            <li key={i} className="flex items-start gap-2 font-sans text-[2rem] text-foreground/90">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kauri-green" />
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
