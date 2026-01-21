import { cn } from "@/lib/utils"

export function SizeSelector ({
  sizes,
  selectedSize,
  unavailableSizes,
  onSelect,
}: {
  sizes: readonly string[]
  selectedSize: string | null
  unavailableSizes: Set<string>
  onSelect: (size: string) => void
}) {
  return (
    <div>
      <label className="mb-2 block font-sans text-[1.8rem] font-medium uppercase tracking-wide text-foreground/80">
        Size <span className="font-normal normal-case text-foreground/60">(for saving)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const isUnavailable = unavailableSizes.has(s)
          return (
            <button
              key={s}
              type="button"
              disabled={isUnavailable}
              onClick={() => !isUnavailable && onSelect(s)}
              className={cn(
                "min-w-[5.6rem] border-2 px-5 py-4 font-sans text-[1.7rem] font-medium uppercase transition-all",
                isUnavailable
                  ? "cursor-not-allowed border-border bg-muted/50 text-muted-foreground line-through"
                  : selectedSize === s
                    ? "border-foreground bg-foreground text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-foreground/60"
              )}
              title={isUnavailable ? "Unavailable" : undefined}
            >
              {s}
            </button>
          )
        })}
      </div>
    </div>
  )
}
