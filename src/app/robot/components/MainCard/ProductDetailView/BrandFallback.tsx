"use client"

type BrandFallbackProps = {
  brand: string
  noMargin?: boolean
}

export function BrandFallback ({ brand, noMargin = false }: BrandFallbackProps) {
  return (
    <div className={`${noMargin ? "" : "mt-4"} flex flex-col gap-4 rounded-none border-2 border-border bg-muted/20 p-[var(--kauri-card-x)]`}>
      <h4 className="font-heading text-[2.6rem] font-normal uppercase tracking-wide text-foreground">
        About {brand}
      </h4>
      <p className="font-sans text-[2.2rem] leading-relaxed text-foreground/90">
        {brand} is committed to sustainable and ethical production practices, ensuring high-quality products that respect both people and the planet.
      </p>
    </div>
  )
}
