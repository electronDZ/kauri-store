import Link from "next/link";

export default function MobilePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex w-full max-w-sm flex-col items-center justify-center gap-6 px-6 py-16 md:mx-auto md:border md:border-zinc-200 md:shadow-lg md:min-h-[600px]">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-black">
          Mobile app
        </h1>
        <p className="text-center text-zinc-600">
          Mobile layout: phone-like on big screens, adapted on small screens. (Placeholder.)
        </p>
        <Link href="/" className="text-foreground underline hover:no-underline">
          ← Back
        </Link>
      </main>
    </div>
  );
}
