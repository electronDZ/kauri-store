"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { QRScanner } from "@/components/QRScanner"
import { QrCode } from "lucide-react"

export default function Home () {
  const router = useRouter()
  const [qrScannerOpen, setQrScannerOpen] = useState(false)

  const handleScanSuccess = (decodedText: string) => {
    // Extract product ID from URL or use the decoded text directly
    // QR codes can contain URLs like /product/1 or just the product ID
    let productId: string | null = null

    if (decodedText.includes("/product/")) {
      productId = decodedText.split("/product/")[1]?.split("?")[0] ?? null
    } else if (/^\d+$/.test(decodedText)) {
      // If it's just a number, treat it as product ID
      productId = decodedText
    } else {
      // Try to extract any number from the text
      const match = decodedText.match(/\d+/)
      productId = match?.[0] ?? null
    }

    if (productId) {
      setQrScannerOpen(false)
      router.push(`/product/${productId}`)
    } else {
      alert("Invalid QR code. Please scan a product QR code.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <header>
        {/* Announcement bar: full width, dark */}
        <div className="w-full bg-foreground text-primary-foreground">
          <div className="flex min-h-16 items-center justify-center px-[var(--kauri-container)]">
            <span className="font-sans text-[1.4rem] font-medium tracking-wide">
              KAURI HCI — HIGH-FIDELITY PROTOTYPE
            </span>
          </div>
        </div>
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
      <main className="flex flex-1 flex-col items-center justify-center px-[var(--kauri-container)] py-24">
        <div className="flex w-full max-w-5xl flex-col items-center gap-16">
          <section className="flex flex-col items-center gap-[1.6rem] text-center">
            <h2 className="font-heading uppercase tracking-wide text-foreground">
              Pick an experience
            </h2>
            <p className="max-w-md font-sans text-[1.6rem] leading-normal text-muted-foreground">
              High-fidelity prototype. Choose Robot touch screen or Mobile app.
            </p>
          </section>

          <div className="flex flex-col gap-[1.6rem] sm:flex-row sm:gap-8">
            <Button asChild className="w-full uppercase tracking-wide sm:w-auto">
              <Link href="/robot">Robot touch screen</Link>
            </Button>
            <Button asChild variant="outline" className="w-full uppercase tracking-wide sm:w-auto">
              <Link href="/mobile">Mobile app</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
