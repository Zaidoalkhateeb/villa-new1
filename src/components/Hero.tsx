import { useEffect, useRef, useState } from "react";

/**
 * Hero section with a background video.
 *
 * Notes:
 * - Honors prefers-reduced-motion (falls back to a static poster image)
 */
export default function Hero() {
  const heroVideoSrc = "/hero-optimized.mp4";
  const heroVideoFallbackSrc = "/Clip%201%20(1).mp4";
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener?.("change", update);

    return () => {
      mediaQuery.removeEventListener?.("change", update);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        await video.play();
        setAutoplayBlocked(false);
      } catch {
        setAutoplayBlocked(true);
      }
    };

    tryPlay();
  }, [prefersReducedMotion]);

  const handleTapToPlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setAutoplayBlocked(false);
    } catch {
      setAutoplayBlocked(true);
    }
  };

  return (
    <section className="h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        {prefersReducedMotion ? (
          <img
            src="/hero-bg.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onPlay={() => setAutoplayBlocked(false)}
          >
            <source src={heroVideoSrc} type="video/mp4" />
            <source src={heroVideoFallbackSrc} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

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

        {!prefersReducedMotion && autoplayBlocked && (
          <button
            type="button"
            onClick={handleTapToPlay}
            className="mt-5 border border-white/40 bg-black/40 px-5 py-2 text-sm tracking-wide backdrop-blur hover:border-white hover:bg-black/55 transition"
          >
            TAP TO PLAY VIDEO
          </button>
        )}

      </div>
    </section>
  );
}