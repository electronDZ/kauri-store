"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { IT, GB, DE } from "country-flag-icons/react/3x2";
import Lottie from "lottie-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "IT", label: "Italiano", Flag: IT },
  { code: "EN", label: "English", Flag: GB },
  { code: "DE", label: "Deutsch", Flag: DE },
] as const;

const MAIN_CARDS = [
  {
    hero: "EXPLORE PRODUCTS",
    description: "Discover our sustainable collection",
    gridClass: "md:row-span-2",
    isCarousel: false,
    image: "/images/robot-screen/main-screen/COLLAGE_5_FOTO_ORIZZONTALI_HP_8.webp",
  },
  {
    hero: "OUR STORY",
    description: "Eco‑friendly values and how we care for the planet",
    gridClass: "",
    isCarousel: false,
    video: "/images/robot-screen/main-screen/discover-kauri-video.mp4",
  },
  {
    hero: "STYLE MATCH",
    description: "Scan your skin tone and get personalized outfit recommendations",
    gridClass: "",
    isCarousel: false,
    image: "/images/robot-screen/main-screen/cam-detection.avif",
  },
  {
    hero: "KIDS ENTERTAINMENT",
    description: "Fun activities and content for the little ones",
    gridClass: "",
    isCarousel: false,
    image: "/images/robot-screen/main-screen/games.avif",
  },
  {
    hero: "FEATURED",
    description: "Discover our latest collections and special offers",
    gridClass: "",
    isCarousel: true,
    carouselImages: [
      "/images/robot-screen/main-screen/home_becks_cognac_apple_front.webp",
      "/images/robot-screen/main-screen/BANNER_MENU_RETTANGOLARI.webp",
      "/images/robot-screen/main-screen/8_671bed23-b8c4-4010-959a-dd52514ac068.webp",
    ],
  },
] as const;

function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<string>("EN");

  const activeLanguage = LANGUAGES.find(lang => lang.code === activeLang);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-3 rounded-none border-2 border-foreground bg-background px-[var(--kauri-btn-x)] py-[var(--kauri-btn-y)] font-sans text-[1.4rem] font-medium uppercase tracking-wide text-foreground transition-all hover:bg-foreground hover:text-primary-foreground active:scale-95"
          aria-label="Change language"
        >
          {activeLanguage && (
            <activeLanguage.Flag className="h-6 w-9 object-cover" />
          )}
          <span>{activeLang}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-0 border-none bg-transparent p-0 shadow-none outline-none sm:max-w-lg">
        <div className="flex w-full flex-col items-center gap-8 rounded-none border border-white/20 bg-background/90 p-10 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90">
          <DialogTitle className="font-heading text-3xl uppercase tracking-wider text-foreground">
            Select Language
          </DialogTitle>
          <div className="grid w-full grid-cols-1 gap-4">
            {LANGUAGES.map(({ code, label, Flag }) => {
              const isActive = activeLang === code;
              return (
                <button
                  key={code}
                  onClick={() => {
                    setActiveLang(code);
                    setOpen(false);
                  }}
                  className={cn(
                    "group relative flex w-full items-center gap-6 rounded-none border p-4 transition-all active:scale-[0.98]",
                    isActive
                      ? "border-kauri-green bg-kauri-green/5 ring-1 ring-kauri-green"
                      : "border-transparent bg-muted hover:bg-muted/80 hover:border-border"
                  )}
                >
                  <div className="relative h-10 w-16 overflow-hidden rounded-none shadow-sm">
                    <Flag className="h-full w-full object-cover" />
                  </div>
                  <span
                    className={cn(
                      "font-heading text-[1.8rem] uppercase tracking-wide",
                      isActive ? "text-kauri-green" : "text-foreground"
                    )}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-none bg-kauri-green text-primary-foreground">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function VoiceFab() {
  const [aiAnimation, setAiAnimation] = useState<object | null>(null);

  useEffect(() => {
    fetch("/animations/ai-voice.json")
      .then((res) => res.json())
      .then((data) => setAiAnimation(data))
      .catch(() => console.error("Failed to load AI animation"));
  }, []);

  return (
    <button
      type="button"
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3 rounded-none bg-background p-6 shadow-2xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-foreground"
      aria-label="Talk to AI by voice"
      onClick={(e) => e.preventDefault()}
    >
      {aiAnimation ? (
        <div className="h-32 w-32 overflow-hidden">
          <Lottie
            animationData={aiAnimation}
            loop
            className="h-full w-full"
          />
        </div>
      ) : (
        <div className="flex h-32 w-32 items-center justify-center">
          <span className="font-heading text-5xl font-bold text-kauri-green">
            AI
          </span>
        </div>
      )}
      <span className="font-heading text-[1.4rem] font-bold uppercase tracking-widest text-foreground">
        AI VOICE
      </span>
    </button>
  );
}

function MainCard({
  hero,
  description,
  gridClass,
  isCarousel,
  image,
  video,
  carouselImages,
}: {
  hero: string;
  description: string;
  gridClass?: string;
  isCarousel?: boolean;
  image?: string;
  video?: string;
  carouselImages?: readonly string[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isCarousel || !carouselImages) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isCarousel, carouselImages]);

  return (
    <div
      className={cn(
        "group relative flex min-h-[32rem] cursor-pointer flex-col justify-end overflow-hidden bg-muted transition-all hover:scale-[1.02] active:scale-[0.98]",
        gridClass
      )}
    >
      {/* Background Image */}
      {image && (
        <Image
          src={image}
          alt={hero}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      )}

      {/* Background Video */}
      {video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {/* Carousel Images */}
      {isCarousel && carouselImages && (
        <div className="absolute inset-0">
          {carouselImages.map((img, index) => (
            <Image
              key={img}
              src={img}
              alt={`${hero} slide ${index + 1}`}
              fill
              className={cn(
                "object-cover transition-opacity duration-1000",
                currentSlide === index ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          ))}
        </div>
      )}

      {/* Gradient overlay - soft dark gradient for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/5"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 p-10">
        <h2 className="font-heading text-[3.2rem] font-semibold uppercase leading-tight tracking-wide text-white drop-shadow-lg">
          {hero}
        </h2>
        <p className="mt-3 font-sans text-[1.6rem] leading-relaxed text-white/90 drop-shadow-md">
          {description}
        </p>
        <button className="mt-6 flex items-center gap-2 font-sans text-[1.6rem] font-medium text-white drop-shadow-md transition-all hover:gap-4">
          View all
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Carousel indicators */}
      {isCarousel && carouselImages && (
        <div className="absolute bottom-4 left-10 z-20 flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
              }}
              className={cn(
                "h-2 rounded-full transition-all",
                currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function RobotPage() {
  return (
    <div className="min-h-screen w-full bg-background font-sans">
      {/* Top bar: logo + language */}
      <header className="flex items-center justify-between border-b border-border bg-background px-[var(--kauri-container)] py-4">
        <Image
          src="/images/KAURI_logo.png"
          alt="KAURI"
          width={120}
          height={44}
          className="h-11 w-auto"
          priority
        />
        <LanguageSelector />
      </header>

      {/* Main: 5 cards in masonry grid */}
      <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-[var(--kauri-container)] pb-24 pt-8 md:pt-10">
        <div className="grid w-full max-w-[140rem] grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2 md:gap-8">
          {MAIN_CARDS.map((card) => (
            <MainCard
              key={card.hero}
              hero={card.hero}
              description={card.description}
              gridClass={card.gridClass}
              isCarousel={card.isCarousel}
              image={"image" in card ? card.image : undefined}
              video={"video" in card ? card.video : undefined}
              carouselImages={"carouselImages" in card ? card.carouselImages : undefined}
            />
          ))}
        </div>
      </main>

      <VoiceFab />
    </div>
  );
}
