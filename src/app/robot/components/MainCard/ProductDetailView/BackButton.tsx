import { BackArrowIcon } from "../../icons"

export function BackButton ({ onBack }: { onBack: () => void }) {
  return (
    <div className="border-t border-border bg-background/95 p-8 backdrop-blur">
      <button
        onClick={onBack}
        className="flex w-full items-center justify-center gap-3 rounded-none border-2 border-foreground bg-background px-8 py-7 font-sans text-[2.1rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
      >
        <BackArrowIcon className="size-8 shrink-0" />
        Back to products
      </button>
    </div>
  )
}
