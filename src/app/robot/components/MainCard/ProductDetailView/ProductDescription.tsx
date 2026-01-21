import { PRODUCT_DETAILS } from "./constants"

export function ProductDescription () {
  return (
    <div className="max-h-[32rem] overflow-y-auto border-t border-border/50 pt-5 pr-2">
      <div className="flex flex-col gap-5 font-sans text-[2rem] leading-relaxed text-foreground">
        <p>
          The Mora Skier Sweater by Dedicated combines vintage ski charm with a timeless, sustainable design. Featuring a bold jacquard-knit skier motif, this sweater is crafted from 100% organic cotton, offering a soft, breathable feel—perfect for cooler days without compromising the planet.
        </p>
        <p>
          Designed with a regular fit and a 12-gauge knit, it features ribbed cuffs and neckline for a clean, structured look. The detailed jacquard pattern adds personality, while sustainable materials ensure a garment that&apos;s as responsible as it is stylish.
        </p>

        <div>
          <h3 className="mb-2 font-sans text-[1.6rem] font-medium text-foreground/65">
            Product details
          </h3>
          <ul className="flex flex-col gap-2 border-l-2 border-foreground/20 pl-4">
            {PRODUCT_DETAILS.map(({ label, value }, i) => (
              <li key={i} className="flex flex-wrap gap-2 text-foreground/90">
                {label && <span className="font-medium text-foreground">{label}:</span>}
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-sans text-[1.6rem] font-medium text-foreground/65">
            Why you&apos;ll love it
          </h3>
          <p className="text-foreground/90">
            The Mora Skier is a comfortable and bold pullover, responsibly crafted, richly textured and ready to hit the slopes in style.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-4 font-sans text-[1.8rem] text-foreground/70">
          <span><strong className="text-foreground/80">Manufacturer:</strong> DEDICATED</span>
          <span><strong className="text-foreground/80">Product code:</strong> 23201</span>
        </div>
      </div>
    </div>
  )
}
