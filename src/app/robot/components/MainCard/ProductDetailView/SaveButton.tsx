import { cn } from "@/lib/utils"
import { HeartFilledIcon, HeartIcon } from "../../icons"

export function SaveButton ({
  isSaved,
  onToggle,
}: {
  isSaved: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex min-h-[6.4rem] w-full items-center justify-center gap-3 rounded-none border-2 px-6 py-5 font-sans text-[2rem] font-medium uppercase tracking-wide transition-all active:scale-[0.98]",
        isSaved
          ? "border-kauri-green bg-kauri-green/10 text-kauri-green"
          : "border-foreground bg-background text-foreground hover:bg-foreground hover:text-primary-foreground"
      )}
    >
      {isSaved ? (
        <>
          <HeartFilledIcon className="size-8 shrink-0 text-kauri-red" />
          Saved
        </>
      ) : (
        <>
          <HeartIcon className="size-8 shrink-0" />
          Save for later
        </>
      )}
    </button>
  )
}
