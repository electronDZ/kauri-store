"use client"

import { useState, useEffect } from "react"
import Lottie from "lottie-react"

export function VoiceFab () {
  const [aiAnimation, setAiAnimation] = useState<object | null>(null)

  useEffect(() => {
    fetch("/animations/ai-voice.json")
      .then((res) => res.json())
      .then((data) => setAiAnimation(data))
      .catch(() => console.error("Failed to load AI animation"))
  }, [])

  return (
    <button
      type="button"
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3 rounded-none bg-background p-6 shadow-2xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-foreground"
      aria-label="Talk to AI by voice"
      onClick={(e) => e.preventDefault()}
    >
      {aiAnimation ? (
        <div className="h-32 w-32 overflow-hidden">
          <Lottie animationData={aiAnimation} loop className="h-full w-full" />
        </div>
      ) : (
        <div className="flex h-32 w-32 items-center justify-center">
          <span className="font-heading text-5xl font-bold text-kauri-green">
            AI
          </span>
        </div>
      )}
      <span className="font-heading text-[1.4rem] font-bold uppercase tracking-widest text-foreground">
        AI VOICE
      </span>
    </button>
  )
}
