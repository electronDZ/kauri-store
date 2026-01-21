"use client"

import { CloseIcon } from "../../icons"

type ModalHeaderProps = {
  isBrandOnly: boolean
  title: string
  onClose: () => void
}

export function ModalHeader ({ isBrandOnly, title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-sans text-[1.6rem] uppercase tracking-widest text-foreground/60">
          {isBrandOnly ? "Brand" : "Sustainability"}
        </p>
        <h3 className="font-heading text-[2.8rem] font-normal uppercase tracking-wide text-foreground">
          {title}
        </h3>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-none border-2 border-foreground bg-background font-sans text-[1.6rem] font-bold text-foreground transition hover:bg-foreground hover:text-primary-foreground active:scale-95"
        aria-label="Close sustainability modal"
      >
        <CloseIcon className="size-8" />
      </button>
    </div>
  )
}
