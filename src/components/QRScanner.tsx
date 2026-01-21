"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"

export function QRScanner ({
  onScanSuccess,
  onClose,
}: {
  onScanSuccess: (decodedText: string) => void
  onClose: () => void
}) {
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    if (isScanning) {
      // Pick a random product ID between 1 and 24
      const randomProductId = Math.floor(Math.random() * 24) + 1
      
      const timer = setTimeout(() => {
        onScanSuccess(String(randomProductId))
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isScanning, onScanSuccess])

  const startScanning = () => {
    setIsScanning(true)
  }

  const handleClose = () => {
    setIsScanning(false)
    onClose()
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="relative flex w-full max-w-2xl items-center justify-center overflow-hidden rounded-lg border-2 border-border bg-muted">
        <div className="flex aspect-square w-full items-center justify-center">
          {isScanning ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full border-4 border-kauri-blue opacity-75" />
                <div className="relative flex size-32 items-center justify-center rounded-full border-4 border-kauri-blue bg-kauri-blue/10">
                  <QrCode className="size-16 text-kauri-blue" />
                </div>
              </div>
              <p className="font-sans text-[1.6rem] font-medium text-foreground">
                Scanning...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex size-32 items-center justify-center rounded-full border-4 border-border bg-background">
                <QrCode className="size-16 text-muted-foreground" />
              </div>
              <p className="font-sans text-[1.6rem] text-muted-foreground">
                Ready to scan
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        {!isScanning ? (
          <Button onClick={startScanning} className="uppercase tracking-wide">
            Start Scanner
          </Button>
        ) : (
          <Button disabled className="uppercase tracking-wide">
            Scanning...
          </Button>
        )}
        <Button onClick={handleClose} variant="outline" className="uppercase tracking-wide">
          Close
        </Button>
      </div>
      {isScanning && (
        <p className="font-sans text-[1.4rem] text-muted-foreground">
          Scanning QR code...
        </p>
      )}
    </div>
  )
}
