import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

/**
 * Hero section with an auto-advancing background carousel.
 *
 * Notes:
 * - Preloads images to avoid flashes
 * - Honors prefers-reduced-motion
 */
export default function Hero() {
  const heroImages = useMemo(
    () => [
      "/hero-bg.png",
      "/living-room-1.jpg",
      "/gallery-living.png",
      "/gallery-kitchen.png",
      "/1_10-Photo.jpg",
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => {
    setActiveIndex((current) =>
      (current - 1 + heroImages.length) % heroImages.length,
    );
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % heroImages.length);
  };

  useEffect(() => {
    // Preload so the first paint doesn't show a grey/blank placeholder.
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [heroImages]);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 6000);

    return () => window.clearInterval(id);
  }, [heroImages]);

  return (
    <section className="h-screen relative overflow-hidden bg-black">
      {/* Sliding Background */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out " +
              (i === activeIndex ? "opacity-100" : "opacity-0")
            }
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : undefined}
            draggable={false}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Arrows */}
      {heroImages.length > 1 && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={goPrev}
            className="pointer-events-auto grid place-items-center h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-yellow-500/50 bg-black/50 text-yellow-400 backdrop-blur transition hover:bg-black/70 hover:border-yellow-500/70"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="pointer-events-auto grid place-items-center h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-yellow-500/50 bg-black/50 text-yellow-400 backdrop-blur transition hover:bg-black/70 hover:border-yellow-500/70"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 md:px-8">

        {/* Hero Logo */}
        <img
          src="/JAMIL-KHLAIF-logo-final-480x139.png"
          alt="Jamil Khalif"
          className="w-72 sm:w-[420px] md:w-[520px] h-auto mb-8 drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
          loading="eager"
        />

       
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

          {/* Primary Button */}
          <a
            href="#properties"
            className="bg-yellow-500 text-black px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold tracking-wide hover:bg-yellow-400 transition shadow-[0_0_20px_rgba(250,204,21,0.2)]"
          >
            EXPLORE VILLAS
          </a>

          {/* Secondary Button */}
          <a
            href="#contact"
            className="border border-gray-400 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base tracking-wide hover:border-white hover:bg-white hover:text-black transition"
          >
            CONTACT SALES
          </a>

        </div>

      </div>
    </section>
  );
}