"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { LANGUAGES } from "../data"

export function LanguageSelector () {
  const [open, setOpen] = useState(false)
  const [activeLang, setActiveLang] = useState<string>("EN")

  const activeLanguage = LANGUAGES.find((lang) => lang.code === activeLang)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-3 rounded-none border-2 border-foreground bg-background px-[var(--kauri-btn-x)] py-[var(--kauri-btn-y)] font-sans text-[1.4rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
          aria-label="Change language"
        >
          {activeLanguage && (
            <activeLanguage.Flag className="h-6 w-9 object-cover" />
          )}
          <span>{activeLang}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-0 border-none bg-transparent p-0 shadow-none outline-none sm:max-w-lg">
        <div className="flex w-full flex-col items-center gap-8 rounded-none border border-white/20 bg-background/90 p-10 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90">
          <DialogTitle className="font-heading text-3xl uppercase tracking-wider text-foreground">
            Select Language
          </DialogTitle>
          <div className="grid w-full grid-cols-1 gap-4">
            {LANGUAGES.map(({ code, label, Flag }) => {
              const isActive = activeLang === code
              return (
                <button
                  key={code}
                  onClick={() => {
                    setActiveLang(code)
                    setOpen(false)
                  }}
                  className={cn(
                    "group relative flex w-full items-center gap-6 rounded-none border p-4 transition-all active:scale-[0.98]",
                    isActive
                      ? "border-kauri-green bg-kauri-green/5 ring-1 ring-kauri-green"
                      : "border-transparent bg-muted hover:bg-muted/80 hover:border-border"
                  )}
                >
                  <div className="relative h-10 w-16 overflow-hidden rounded-none shadow-sm">
                    <Flag className="h-full w-full object-cover" />
                  </div>
                  <span
                    className={cn(
                      "font-heading text-[1.8rem] uppercase tracking-wide",
                      isActive ? "text-kauri-green" : "text-foreground"
                    )}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-none bg-kauri-green text-primary-foreground">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
