"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Home() {
    const router = useRouter()

    return (
        <div className="relative flex h-screen flex-col bg-background font-sans text-foreground">
            {/* Simple line pattern background */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 2px,
                            currentColor 2px,
                            currentColor 4px
                        )
                    `,
                }}
            />
            <div className="relative z-10 flex flex-1 flex-col">
            <header>
                {/* Main nav: logo left */}
                <nav className="flex w-full items-center justify-between border-b border-border bg-background px-[var(--kauri-container)] py-[1.6rem]">
                    <Link href="/" className="flex shrink-0" aria-label="KAURI home">
                        <Image
                            src="/images/KAURI_logo.png"
                            alt="KAURI"
                            width={160}
                            height={48}
                            className="h-[3.2rem] w-auto object-contain"
                        />
                    </Link>
                </nav>
            </header>

            {/* Main: launcher links */}
            <main className="flex flex-1 flex-col items-center justify-center px-[var(--kauri-container)]">
                <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-16">
                    <section className="flex flex-col items-center gap-[1.6rem] text-center">
                        <h2 className="font-heading uppercase tracking-wide text-foreground">
                            Pick an experience
                        </h2>
                        <p className="max-w-md font-sans text-[1.6rem] leading-normal text-muted-foreground">
                            High-fidelity prototype. Choose Robot touch screen or Mobile app.
                        </p>
                    </section>

                    <div className="flex flex-col items-center justify-center gap-[1.6rem] sm:flex-row sm:gap-8">
                        <Button asChild className="w-full uppercase tracking-wide sm:w-auto">
                            <Link href="/robot/login">Robot touch screen</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full uppercase tracking-wide sm:w-auto">
                            <Link href="/mobile/login">Mobile app</Link>
                        </Button>
                    </div>
                </div>
            </main>
            </div>
        </div>
    )
}
