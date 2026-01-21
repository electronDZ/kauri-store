"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SAMPLE_PRODUCTS } from "@/app/robot/data/products"
import { ProductDetailView } from "@/app/robot/components/MainCard/ProductDetailView"
import Image from "next/image"

export default function ProductPage () {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(
    SAMPLE_PRODUCTS.find((p) => p.id === Number(params.id))
  )
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const savedIds = JSON.parse(
      localStorage.getItem("savedProductIds") ?? "[]"
    ) as number[]
    setIsSaved(savedIds.includes(Number(params.id)))
  }, [params.id])

  const handleToggleSaved = () => {
    const savedIds = JSON.parse(
      localStorage.getItem("savedProductIds") ?? "[]"
    ) as number[]
    const productId = Number(params.id)
    const newSavedIds = savedIds.includes(productId)
      ? savedIds.filter((id) => id !== productId)
      : [...savedIds, productId]
    localStorage.setItem("savedProductIds", JSON.stringify(newSavedIds))
    setIsSaved(!isSaved)
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-[var(--kauri-container)]">
        <h1 className="font-heading text-[2.4rem] uppercase tracking-wide text-foreground">
          Product Not Found
        </h1>
        <p className="font-sans text-[1.6rem] text-muted-foreground">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-none border-2 border-foreground bg-background px-6 py-3 font-sans text-[1.6rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground"
        >
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-background font-sans">
      <header className="flex items-center justify-between border-b border-border bg-background px-[var(--kauri-container)] py-4">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex shrink-0"
          aria-label="KAURI home"
        >
          <Image
            src="/images/KAURI_logo.png"
            alt="KAURI"
            width={120}
            height={44}
            className="h-11 w-auto"
            priority
          />
        </button>
      </header>

      <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-[var(--kauri-container)] pb-24 pt-8">
        <div className="w-full max-w-[140rem]">
          <ProductDetailView
            product={product}
            onBack={() => router.push("/")}
            isSaved={isSaved}
            onToggleSaved={handleToggleSaved}
          />
        </div>
      </main>
    </div>
  )
}
