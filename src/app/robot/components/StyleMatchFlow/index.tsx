"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Camera } from "lucide-react"
import { cn } from "@/lib/utils"
import { BackArrowIcon, ManualPaletteIcon } from "../icons"
import {
  UNDERTONES,
  COLOR_PREFS,
  PALETTE_BY_UNDERTONE,
  STYLE_MATCH_PRODUCTS,
} from "../../data"

type Step = "welcome" | "camera" | "manual" | "analysing" | "results"
type Undertone = "warm" | "cool" | "neutral"

export function StyleMatchFlow ({
  image,
  imageGradient,
  onClose,
}: {
  image: string
  imageGradient: string
  onClose: () => void
}) {
  const [step, setStep] = useState<Step>("welcome")
  const [undertone, setUndertone] = useState<Undertone>("warm")
  const [colorPrefs, setColorPrefs] = useState<string[]>([])

  useEffect(() => {
    if (step !== "analysing") return
    const t = setTimeout(() => setStep("results"), 1500)
    return () => clearTimeout(t)
  }, [step])

  const footerBack = (
    <div className="border-t border-border bg-background/95 p-8 backdrop-blur">
      <button
        onClick={onClose}
        className="flex w-full items-center justify-center gap-3 rounded-none border-2 border-foreground bg-background px-8 py-6 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
      >
        <BackArrowIcon />
        Back to Main Menu
      </button>
    </div>
  )

  if (step === "welcome") {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="relative h-[22vh] w-full shrink-0 overflow-hidden border-b border-border">
          <Image src={image} alt="" fill className="object-cover" sizes="90vw" />
          <div className={cn("absolute inset-0 bg-gradient-to-t", imageGradient)} aria-hidden />
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <h2 className="font-heading text-[3.2rem] uppercase leading-tight tracking-wide text-foreground drop-shadow-md">
              Style Match
            </h2>
            <p className="mt-2 font-sans text-[1.6rem] leading-relaxed text-foreground/90 drop-shadow-sm">
              Find colours that suit you. Choose your preferred way.
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-10">
            <div className="mb-10 rounded-none border border-border bg-muted/50 p-6">
              <p className="font-sans text-[1.4rem] leading-relaxed text-foreground/80">
                <strong className="text-foreground">Your privacy:</strong> We do not store photos. Only colour values are used to suggest products. Data is processed on this device only — nothing is sent to external servers.
              </p>
              <details className="mt-4">
                <summary className="cursor-pointer font-sans text-[1.4rem] font-medium uppercase tracking-wide text-foreground/70 hover:text-foreground">
                  How it works
                </summary>
                <p className="mt-3 font-sans text-[1.3rem] leading-relaxed text-muted-foreground">
                  The camera captures a short live image. Our system extracts colour values from your skin tones. The image is deleted immediately. Only the colour palette is used to filter product recommendations. All processing happens on this device.
                </p>
              </details>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <button
                onClick={() => setStep("camera")}
                className="flex flex-col items-start rounded-none border-2 border-border bg-background p-8 text-left transition-all hover:border-foreground hover:bg-muted/30 active:scale-[0.99]"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-none border border-border bg-muted">
                  <Camera className="h-7 w-7 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-[2rem] uppercase tracking-wide text-foreground">
                  Use camera
                </h3>
                <p className="mt-2 font-sans text-[1.5rem] leading-relaxed text-muted-foreground">
                  We analyse skin tones from a live image. The image is never stored; only colour data is used here in-store.
                </p>
                <span className="mt-6 inline-block rounded-none bg-kauri-green px-[var(--kauri-btn-x)] py-[var(--kauri-btn-y)] font-sans text-[1.5rem] font-medium uppercase tracking-wide text-primary-foreground">
                  Use camera
                </span>
              </button>

              <button
                onClick={() => setStep("manual")}
                className="flex flex-col items-start rounded-none border-2 border-border bg-background p-8 text-left transition-all hover:border-foreground hover:bg-muted/30 active:scale-[0.99]"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-none border border-border bg-muted">
                  <ManualPaletteIcon className="h-7 w-7 text-foreground" />
                </div>
                <h3 className="font-heading text-[2rem] uppercase tracking-wide text-foreground">
                  Choose manually
                </h3>
                <p className="mt-2 font-sans text-[1.5rem] leading-relaxed text-muted-foreground">
                  I know my undertone. I'll pick my palette.
                </p>
                <span className="mt-6 inline-block rounded-none border-2 border-foreground bg-background px-[var(--kauri-btn-x)] py-[var(--kauri-btn-y)] font-sans text-[1.5rem] font-medium uppercase tracking-wide text-foreground">
                  Choose my palette
                </span>
              </button>
            </div>
          </div>
          {footerBack}
        </div>
      </div>
    )
  }

  if (step === "camera") {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="border-b border-border bg-background/80 px-10 py-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setStep("welcome")}
              className="flex items-center gap-2 rounded-none border-2 border-foreground bg-background px-6 py-3 font-sans text-[1.5rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
            >
              <BackArrowIcon />
              Back
            </button>
            <h2 className="font-heading text-[2.4rem] uppercase tracking-wide text-foreground">
              Use camera
            </h2>
          </div>
          <p className="mt-2 font-sans text-[1.5rem] text-muted-foreground">
            We only use colour information. The image is not saved.
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-10 p-10">
          <div className="relative flex h-64 w-64 shrink-0 items-center justify-center rounded-none border-2 border-foreground bg-muted">
            <div className="absolute inset-3 rounded-none border border-dashed border-foreground/30" aria-hidden />
            <Camera className="h-16 w-16 text-foreground/40" strokeWidth={1.5} />
          </div>
          <p className="max-w-md text-center font-sans text-[1.6rem] text-foreground/80">
            Position your face in the frame, then tap Capture.
          </p>
          <button
            onClick={() => {
              setUndertone("warm")
              setStep("analysing")
            }}
            className="rounded-none bg-kauri-green px-[var(--kauri-btn-x)] py-[var(--kauri-btn-y)] font-sans text-[1.8rem] font-medium uppercase tracking-wide text-primary-foreground transition-all hover:bg-kauri-green/90 active:scale-95"
          >
            Capture
          </button>
        </div>
      </div>
    )
  }

  if (step === "analysing") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-10">
        <p className="font-heading text-[2.8rem] uppercase tracking-wide text-foreground">
          Analysing…
        </p>
        <p className="font-sans text-[1.6rem] text-muted-foreground">
          Matching colours to your skin tone.
        </p>
      </div>
    )
  }

  if (step === "manual") {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="border-b border-border bg-background/80 px-10 py-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setStep("welcome")}
              className="flex items-center gap-2 rounded-none border-2 border-foreground bg-background px-6 py-3 font-sans text-[1.5rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
            >
              <BackArrowIcon />
              Back
            </button>
            <h2 className="font-heading text-[2.4rem] uppercase tracking-wide text-foreground">
              Choose your palette
            </h2>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-10">
            <h3 className="mb-4 font-heading text-[2rem] uppercase tracking-wide text-foreground">
              Your undertone
            </h3>
            <div className="flex flex-wrap gap-4">
              {UNDERTONES.map((u) => {
                const isActive = undertone === u.id
                return (
                  <button
                    key={u.id}
                    onClick={() => setUndertone(u.id)}
                    className={cn(
                      "rounded-none border-2 px-8 py-5 font-sans text-[1.6rem] font-medium uppercase tracking-wide transition-all active:scale-95",
                      isActive ? "border-kauri-green bg-kauri-green/10 text-kauri-green" : "border-border bg-background text-foreground hover:border-foreground hover:bg-muted"
                    )}
                  >
                    {u.label}
                  </button>
                )
              })}
            </div>

            <h3 className="mb-4 mt-10 font-heading text-[2rem] uppercase tracking-wide text-foreground">
              Colours you like <span className="font-sans text-[1.4rem] font-normal normal-case text-muted-foreground">(optional)</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {COLOR_PREFS.map((c) => {
                const on = colorPrefs.includes(c.id)
                return (
                  <button
                    key={c.id}
                    onClick={() => setColorPrefs((p) => (on ? p.filter((x) => x !== c.id) : [...p, c.id]))}
                    className={cn(
                      "rounded-none border-2 px-6 py-3 font-sans text-[1.5rem] font-medium uppercase tracking-wide transition-all active:scale-95",
                      on ? "border-kauri-green bg-kauri-green/10 text-kauri-green" : "border-border bg-background text-foreground hover:border-foreground"
                    )}
                  >
                    {c.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-12">
              <button
                onClick={() => setStep("results")}
                className="w-full rounded-none bg-kauri-green px-[var(--kauri-btn-x)] py-[var(--kauri-btn-y)] font-sans text-[1.8rem] font-medium uppercase tracking-wide text-primary-foreground transition-all hover:bg-kauri-green/90 active:scale-95"
              >
                See recommendations
              </button>
            </div>
          </div>
          {footerBack}
        </div>
      </div>
    )
  }

  // ——— Results ———
  const swatches = PALETTE_BY_UNDERTONE[undertone] ?? PALETTE_BY_UNDERTONE.warm
  const undertoneLabel = UNDERTONES.find((u) => u.id === undertone)?.label ?? "Warm"

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-border bg-background/80 px-10 py-8 backdrop-blur">
        <h2 className="font-heading text-[3.2rem] uppercase leading-tight tracking-wide text-foreground">
          Recommended for you
        </h2>
        <p className="mt-2 font-sans text-[1.8rem] leading-relaxed text-foreground/70">
          Based on your {undertoneLabel} undertone — {STYLE_MATCH_PRODUCTS.length} products
        </p>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-10">
          <section className="mb-10">
            <h3 className="mb-3 font-heading text-[1.8rem] uppercase tracking-wide text-foreground">
              Your palette
            </h3>
            <div className="flex flex-wrap gap-4">
              {swatches.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className={cn("h-10 w-10 shrink-0 rounded-none border border-border", s.token)} />
                  <span className="font-sans text-[1.4rem] text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {STYLE_MATCH_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-none border border-border bg-background transition-all hover:border-foreground hover:shadow-lg"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="300px"
                  />
                  {product.isNew && (
                    <div className="absolute left-0 top-0 bg-kauri-blue px-4 py-2 font-sans text-[1.2rem] font-bold uppercase tracking-wider text-primary-foreground">
                      NEW
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 p-6 text-left">
                  <h4 className="line-clamp-2 font-sans text-[1.6rem] font-medium leading-snug text-foreground">
                    {product.name}
                  </h4>
                  <p className="font-sans text-[1.8rem] font-bold text-foreground">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 border-t border-border bg-background/95 p-8 backdrop-blur">
          <button
            onClick={() => setStep("welcome")}
            className="flex flex-1 items-center justify-center gap-2 rounded-none border-2 border-foreground bg-background px-8 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
          >
            Choose again
          </button>
          <button
            onClick={onClose}
            className="flex flex-1 items-center justify-center gap-2 rounded-none border-0 bg-kauri-green px-8 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-primary-foreground transition-all hover:bg-kauri-green/90 active:scale-95"
          >
            Back to Main Menu
          </button>
        </div>
      </div>
    </div>
  )
}
