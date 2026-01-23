"use client"

import Image from "next/image"
import { DialogTitle } from "@/components/ui/dialog"
import { BackArrowIcon, CartEmptyIcon, HeartFilledIcon } from "../icons"

type Product = {
  id: number
  name: string
  price: string
  image: string
  isNew: boolean
  category: string
}

export function SavedProductsView({
  savedProducts,
  onRemove,
  onSelectProduct,
  onBack,
}: {
  savedProducts: readonly Product[]
  onRemove: (id: number) => void
  onSelectProduct: (id: number) => void
  onBack: () => void
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-border bg-background/80 px-12 py-8 backdrop-blur">
        <DialogTitle className="font-heading text-[4rem] uppercase leading-tight tracking-wide text-foreground">
          Your saved
        </DialogTitle>
        <p className="mt-2 font-sans text-[1.8rem] leading-relaxed text-foreground/70">
          Products you&apos;re interested in. Browsing only — no purchase.
        </p>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-12">
          {savedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
              {savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-none border border-border bg-background transition-all hover:border-foreground hover:shadow-lg"
                >
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product.id)}
                    className="flex flex-col text-left"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="300px"
                      />
                      {product.isNew && (
                        <div className="absolute left-0 top-0 bg-kauri-green px-4 py-2 font-sans text-[1.2rem] font-bold uppercase tracking-wider text-white">
                          NEW
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 p-6">
                      <h4 className="line-clamp-2 font-sans text-[1.6rem] font-medium leading-snug text-foreground">
                        {product.name}
                      </h4>
                      <p className="font-sans text-[1.8rem] font-bold text-foreground">
                        {product.price}
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(product.id)}
                    className="absolute right-2 top-2 z-10 flex h-20 w-20 items-center justify-center rounded-none border border-transparent bg-background/90 text-kauri-red transition-colors hover:bg-background"
                    aria-label="Remove from saved"
                  >
                    <HeartFilledIcon className="size-10" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-none border-2 border-border bg-muted">
                <CartEmptyIcon className="text-foreground/40" />
              </div>
              <p className="font-sans text-[1.8rem] text-foreground/60">
                No saved products yet
              </p>
              <p className="font-sans text-[1.4rem] text-foreground/50">
                Tap the heart on products while browsing to save them here.
              </p>
            </div>
          )}
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
