"use client"

import { DialogTitle } from "@/components/ui/dialog"
import { BackArrowIcon, VideoPlaceholderIcon } from "../icons"

export function GamePlayerView ({
  gameName,
  onBackToGames,
}: {
  gameName: string
  onBackToGames: () => void
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between border-b border-border bg-background/80 px-8 py-6 backdrop-blur">
        <DialogTitle className="font-heading text-[2.8rem] uppercase tracking-wide text-foreground">
          {gameName}
        </DialogTitle>
        <button
          onClick={onBackToGames}
          className="flex items-center gap-2 rounded-none border-2 border-foreground bg-background px-6 py-3 font-sans text-[1.6rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
        >
          <BackArrowIcon />
          Back to Games
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center bg-muted/30 p-12">
        <div className="flex max-w-lg flex-col items-center gap-6 text-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-none border-2 border-foreground bg-background">
            <VideoPlaceholderIcon className="text-foreground/50" />
          </div>
          <h3 className="font-heading text-[2.8rem] uppercase tracking-wide text-foreground">
            Game Prototype
          </h3>
          <p className="font-sans text-[1.8rem] leading-relaxed text-foreground/70">
            This is a placeholder for the {gameName}. In the final version, interactive games will be available here.
          </p>
          <div className="mt-4 rounded-none border border-border bg-muted/50 px-6 py-4">
            <p className="font-sans text-[1.4rem] text-foreground/60">
              High-fidelity prototype — Interactive features coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
