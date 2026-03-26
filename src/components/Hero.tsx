import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function Hero() {
  const heroImages = useMemo(
    () => [
      "/hero-bg.png",
      "/gallery-living.png",
      "/gallery-kitchen.png",
      "/gallery-master.png",
      "/gallery-pool.png",
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
    <section className="h-screen relative overflow-hidden">
      {/* Sliding Background */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={
              "absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-out " +
              (i === activeIndex ? "opacity-100" : "opacity-0")
            }
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Arrows */}
      {heroImages.length > 1 && (
        <div className="absolute inset-0 z-20 flex items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={goPrev}
            className="grid place-items-center h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-yellow-500/50 bg-black/50 text-yellow-400 backdrop-blur transition hover:bg-black/70 hover:border-yellow-500/70"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="grid place-items-center h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-yellow-500/50 bg-black/50 text-yellow-400 backdrop-blur transition hover:bg-black/70 hover:border-yellow-500/70"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 md:px-8">

        {/* Badge */}
        <div className="mb-6 px-4 sm:px-5 py-2 border border-yellow-500/40 rounded-full text-[10px] sm:text-xs tracking-widest text-yellow-400 bg-black/40 backdrop-blur-md">
          EST. 2011 • AMMAN, JORDAN
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-3 sm:mb-4">
          Elevating
        </h1>

        {/* Gold Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-wide mb-6 sm:mb-8 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">
          Luxury Living
        </h2>

        {/* Description */}
        <p className="max-w-md sm:max-w-lg md:max-w-xl text-gray-300 text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed">
          Luxury villas crafted with modern architecture, precise execution,
          and uncompromising construction standards.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

          {/* Primary Button */}
          <button className="bg-yellow-500 text-black px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold tracking-wide hover:bg-yellow-400 transition shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            EXPLORE VILLAS
          </button>

          {/* Secondary Button */}
          <button className="border border-gray-400 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base tracking-wide hover:border-white hover:bg-white hover:text-black transition">
            CONTACT SALES
          </button>

        </div>

      </div>
    </section>
  );
}