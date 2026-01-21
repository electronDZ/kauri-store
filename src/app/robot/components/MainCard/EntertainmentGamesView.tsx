"use client"

import Image from "next/image"
import { DialogTitle } from "@/components/ui/dialog"
import { BackArrowIcon } from "../icons"
import { GAMES } from "../../data"

export function EntertainmentGamesView ({
  hero,
  description,
  image,
  onSelectGame,
  onBack,
}: {
  hero: string
  description: string
  image?: string
  onSelectGame: (gameId: string) => void
  onBack: () => void
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative h-[30vh] w-full overflow-hidden border-b border-border">
        {image && (
          <Image
            src={image}
            alt={hero}
            fill
            className="object-cover"
            sizes="90vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <DialogTitle className="font-heading text-[4.5rem] uppercase leading-tight tracking-wide text-foreground drop-shadow-lg">
            {hero}
          </DialogTitle>
          <p className="mt-3 font-sans text-[2rem] leading-relaxed text-foreground/80 drop-shadow-md">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-12">
          <h3 className="mb-8 font-heading text-[2.4rem] uppercase tracking-wide text-foreground">
            Select a Game
          </h3>
          <div className="grid grid-cols-2 gap-6 pt-6 md:grid-cols-4">
            {GAMES.map((game) => (
              <button
                key={game.id}
                onClick={() => onSelectGame(game.id)}
                className="group relative aspect-square overflow-hidden rounded-none border border-border bg-background transition-all hover:border-foreground active:scale-[0.98]"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={game.image}
                    alt={game.name}
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6">
                  <h4 className="font-heading text-[1.8rem] uppercase tracking-wide text-white">
                    {game.name}
                  </h4>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-border bg-background/95 p-8 backdrop-blur">
          <button
            onClick={onBack}
            className="flex w-full items-center justify-center gap-3 rounded-none border-2 border-foreground bg-background px-8 py-6 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
          >
            <BackArrowIcon />
            Back to Main Menu
          </button>
        </div>
      </div>
    </div>
  )
}
