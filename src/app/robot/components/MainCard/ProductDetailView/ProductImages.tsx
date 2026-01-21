import Image from "next/image"

export function ProductImages ({ images }: { images: string[] }) {
  return (
    <div className="flex min-h-[28rem] basis-full flex-col gap-4 bg-muted/30 p-8 lg:min-h-0 lg:basis-2/3 lg:flex-row lg:gap-6 lg:p-12">
      {images.slice(0, 2).map((src, i) => (
        <div
          key={i}
          className="relative aspect-[4/5] w-full flex-1 overflow-hidden bg-muted lg:max-w-[50%]"
        >
          <Image
            src={src}
            alt={`Product image ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  )
}
