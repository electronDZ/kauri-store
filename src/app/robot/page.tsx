"use client"

import { useState } from "react"
import Image from "next/image"
import { LanguageSelector, VoiceFab, MainCard, SavedModal } from "./components"
import { HeartFilledIcon } from "./components/icons"
import { MAIN_CARDS } from "./data"

function toggleSaved (ids: number[], id: number): number[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
}

export default function RobotPage () {
  const [savedProductIds, setSavedProductIds] = useState<number[]>([])
  const [savedModalOpen, setSavedModalOpen] = useState(false)

  return (
    <div className="min-h-screen w-full bg-background font-sans">
      <header className="flex items-center justify-between border-b border-border bg-background px-[var(--kauri-container)] py-4">
        <Image
          src="/images/KAURI_logo.png"
          alt="KAURI"
          width={120}
          height={44}
          className="h-11 w-auto"
          priority
        />
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSavedModalOpen(true)}
            className="flex min-h-[4.8rem] items-center gap-2 rounded-none border-2 border-foreground bg-background px-5 py-3 font-sans text-[1.6rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
            aria-label="View saved products"
          >
            <HeartFilledIcon className="size-6 shrink-0" />
            Saved ({savedProductIds.length})
          </button>
          <LanguageSelector />
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-[var(--kauri-container)] pb-24 pt-8 md:pt-10">
        <div className="grid w-full max-w-[140rem] grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2 md:gap-8">
          {MAIN_CARDS.map((card) => (
            <MainCard
              key={card.hero}
              hero={card.hero}
              description={card.description}
              gridClass={card.gridClass}
              imageGradient={card.imageGradient}
              isCarousel={card.isCarousel}
              image={"image" in card ? card.image : undefined}
              video={undefined}
              carouselImages={"carouselImages" in card ? card.carouselImages : undefined}
              savedProductIds={savedProductIds}
              onToggleSaved={(id) => setSavedProductIds((prev) => toggleSaved(prev, id))}
            />
          ))}
        </div>
      </main>

      <SavedModal
        open={savedModalOpen}
        onOpenChange={setSavedModalOpen}
        savedProductIds={savedProductIds}
        onToggleSaved={(id) => setSavedProductIds((prev) => toggleSaved(prev, id))}
      />
      <VoiceFab />
    </div>
  )
}
