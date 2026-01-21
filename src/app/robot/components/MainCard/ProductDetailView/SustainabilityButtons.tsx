import { BrandIcon, FactoryIcon, MapPinIcon } from "../../icons"

export function SustainabilityButtons ({
  brand,
  onHowClick,
  onWhereClick,
  onBrandClick,
}: {
  brand: string | null
  onHowClick: () => void
  onWhereClick: () => void
  onBrandClick: () => void
}) {
  return (
    <div className="border-t border-border pt-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={onHowClick}
          className="flex min-h-[7.2rem] w-full items-center justify-center gap-4 rounded-none border-2 border-kauri-green bg-kauri-green/10 px-6 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-kauri-green transition-all hover:bg-kauri-green hover:text-white active:scale-95"
        >
          <FactoryIcon className="size-10 shrink-0" />
          <span>How it&apos;s made</span>
        </button>
        <button
          type="button"
          onClick={onWhereClick}
          className="flex min-h-[7.2rem] w-full items-center justify-center gap-4 rounded-none border-2 border-kauri-blue bg-kauri-blue/10 px-6 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-kauri-blue transition-all hover:bg-kauri-blue hover:text-white active:scale-95"
        >
          <MapPinIcon className="size-10 shrink-0" />
          <span>Where is it made</span>
        </button>
        <button
          type="button"
          onClick={onBrandClick}
          className="flex min-h-[7.2rem] w-full items-center justify-center gap-4 rounded-none border-2 border-kauri-red bg-kauri-red/10 px-6 py-5 font-sans text-[1.8rem] font-medium uppercase tracking-wide text-kauri-red transition-all hover:bg-kauri-red hover:text-white active:scale-95"
        >
          <BrandIcon className="size-10 shrink-0" />
          <span>About {brand || "Brand"}</span>
        </button>
      </div>
    </div>
  )
}
