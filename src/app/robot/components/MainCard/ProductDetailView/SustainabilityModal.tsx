"use client"

import Image from "next/image"
import { CloseIcon } from "../../icons"
import { SUSTAINABILITY_HOW, SUSTAINABILITY_WHERE, SUSTAINABILITY_IMAGES } from "./ProductDetailView"

type SustainabilityModalProps = {
  type: "how" | "where"
  brand?: string | null
  onClose: () => void
}

const BRAND_INFO = {
  DEDICATED: {
    name: "DEDICATED",
    description: "DEDICATED is a sustainable fashion brand committed to creating high-quality, ethically produced clothing. Founded with a mission to make sustainable fashion accessible, DEDICATED works exclusively with GOTS-certified organic cotton and Fair Trade Certified™ facilities.",
    values: [
      "100% organic cotton (GOTS certified)",
      "Fair Trade Certified™ manufacturing",
      "Vegan-approved materials",
      "Transparent supply chain",
      "Carbon-neutral shipping",
    ],
  },
}

export function SustainabilityModal ({ type, brand, onClose }: SustainabilityModalProps) {
  const items = type === "how" ? SUSTAINABILITY_HOW : SUSTAINABILITY_WHERE
  const brandInfo = brand ? BRAND_INFO[brand.toUpperCase() as keyof typeof BRAND_INFO] : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 backdrop-blur">
      <div className="relative flex w-[min(1260px,96vw)] max-h-[90vh] min-h-[520px] flex-col gap-6 rounded-none border-2 border-foreground bg-background p-6 shadow-2xl lg:min-h-[620px]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-sans text-[1.2rem] uppercase tracking-widest text-foreground/60">
              Sustainability
            </p>
            <h3 className="font-heading text-[2.2rem] font-normal uppercase tracking-wide text-foreground">
              {type === "how" ? "How it's made" : "Where is it made"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none border-2 border-foreground bg-background font-sans text-[1.6rem] font-bold text-foreground transition hover:bg-foreground hover:text-primary-foreground active:scale-95"
            aria-label="Close sustainability modal"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-none border border-border bg-muted/20 p-6"
              >
                <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={SUSTAINABILITY_IMAGES[item.imageKey]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="12rem"
                  />
                </div>
                <h4 className="text-center font-sans text-[2rem] font-semibold uppercase tracking-wide text-foreground">
                  {item.title}
                </h4>
                <p className="text-center font-sans text-[1.8rem] leading-relaxed text-foreground/90">
                  {item.description}
                </p>
              </div>
            ))}

            {brandInfo && (
              <div className="mt-4 flex flex-col gap-4 rounded-none border-2 border-kauri-green/30 bg-kauri-green/5 p-6">
                <h4 className="font-sans text-[2rem] font-semibold uppercase tracking-wide text-foreground">
                  About {brandInfo.name}
                </h4>
                <p className="font-sans text-[1.8rem] leading-relaxed text-foreground/90">
                  {brandInfo.description}
                </p>
                <div className="mt-2">
                  <h5 className="mb-3 font-sans text-[1.6rem] font-medium uppercase tracking-wide text-foreground/80">
                    Our Commitment
                  </h5>
                  <ul className="flex flex-col gap-2 border-l-2 border-kauri-green/30 pl-4">
                    {brandInfo.values.map((value, i) => (
                      <li key={i} className="font-sans text-[1.6rem] text-foreground/90">
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
