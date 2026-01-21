"use client"

import { useState } from "react"
import Image from "next/image"
import { LanguageSelector, VoiceFab, MainCard, SavedModal } from "./components"
import { HeartFilledIcon } from "./components/icons"
import { MAIN_CARDS } from "./data"
import { SAMPLE_PRODUCTS } from "./data/products"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { QRScanner } from "@/components/QRScanner"
import { QrCode } from "lucide-react"
import { ProductDetailView } from "./components/MainCard/ProductDetailView"

function toggleSaved (ids: number[], id: number): number[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
}

export default function RobotPage () {
  const [savedProductIds, setSavedProductIds] = useState<number[]>([])
  const [savedModalOpen, setSavedModalOpen] = useState(false)
  const [qrScannerOpen, setQrScannerOpen] = useState(false)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [scannedProductId, setScannedProductId] = useState<number | null>(null)

  const handleScanSuccess = (decodedText: string) => {
    // Extract product ID from URL or use the decoded text directly
    let productId: string | null = null

    if (decodedText.includes("/product/")) {
      productId = decodedText.split("/product/")[1]?.split("?")[0] ?? null
    } else if (/^\d+$/.test(decodedText)) {
      productId = decodedText
    } else {
      const match = decodedText.match(/\d+/)
      productId = match?.[0] ?? null
    }

    if (productId) {
      const id = Number(productId)
      setQrScannerOpen(false)
      setScannedProductId(id)
      setProductModalOpen(true)
    } else {
      alert("Invalid QR code. Please scan a product QR code.")
    }
  }

  const scannedProduct = scannedProductId != null
    ? SAMPLE_PRODUCTS.find((p) => p.id === scannedProductId)
    : null

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
          <Dialog open={qrScannerOpen} onOpenChange={setQrScannerOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="flex min-h-[4.8rem] items-center gap-2 rounded-none border-2 border-kauri-blue bg-background px-5 py-3 font-sans text-[1.6rem] font-medium uppercase tracking-wide text-kauri-blue transition-all hover:bg-kauri-blue hover:text-primary-foreground active:scale-95"
                aria-label="Scan QR code"
              >
                <QrCode className="size-6 shrink-0" />
                Scan QR
              </button>
            </DialogTrigger>
            <DialogContent className="!max-w-4xl w-[90vw] sm:w-[80vw]">
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[2rem] uppercase tracking-wide text-foreground">
                  Scan Product QR Code
                </h3>
                <QRScanner
                  onScanSuccess={handleScanSuccess}
                  onClose={() => setQrScannerOpen(false)}
                />
              </div>
            </DialogContent>
          </Dialog>
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

      {scannedProduct && (
        <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
          <DialogContent className="max-w-[98vw] gap-0 border-none bg-transparent p-0 shadow-none outline-none sm:max-w-[98vw]" showCloseButton={false}>
            <div className="relative flex h-[96vh] w-full flex-col overflow-hidden rounded-none border border-white/20 bg-background/95 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95">
              <ProductDetailView
                product={scannedProduct}
                onBack={() => setProductModalOpen(false)}
                isSaved={savedProductIds.includes(scannedProduct.id)}
                onToggleSaved={() => setSavedProductIds((prev) => toggleSaved(prev, scannedProduct.id))}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <VoiceFab />
    </div>
  )
}
