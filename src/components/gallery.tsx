import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";

type LightboxImage = { src: string; alt: string };

export default function Gallery() {
  const images: LightboxImage[] = [
    { src: "/gallery-living.png", alt: "Living area" },
    { src: "/gallery-kitchen.png", alt: "Kitchen" },
    { src: "/gallery-master.png", alt: "Master bedroom" },
    { src: "/gallery-pool.png", alt: "Pool" },
  ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current - 1 + images.length) % images.length;
    });
  };

  const goNext = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + 1) % images.length;
    });
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  return (
    <section
      id="gallery"
      className="bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 py-24 px-6 scroll-mt-24"
    >

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-10 bg-yellow-400" />
          <p className="text-yellow-600 text-xs tracking-[0.3em]">
            INTERIOR & EXTERIOR
          </p>
          <span className="h-px w-10 bg-yellow-400" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif">
          Property Gallery
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* Large Left Image */}
        <div className="md:col-span-2">
          <div className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 h-[320px] sm:h-[380px] md:h-[520px]">
            <img
              src="/gallery-living.png"
              alt="Living area"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition"
              aria-label="Zoom living area image"
            >
              <span className="grid place-items-center h-12 w-12 rounded-full border border-yellow-500/60 bg-black/60 text-yellow-400 backdrop-blur">
                <ZoomIn size={22} />
              </span>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">

          <div className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 h-[200px] sm:h-[230px] md:h-[248px]">
            <img
              src="/gallery-kitchen.png"
              alt="Kitchen"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />
            <button
              type="button"
              onClick={() => setLightboxIndex(1)}
              className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition"
              aria-label="Zoom kitchen image"
            >
              <span className="grid place-items-center h-11 w-11 rounded-full border border-yellow-500/60 bg-black/60 text-yellow-400 backdrop-blur">
                <ZoomIn size={20} />
              </span>
            </button>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 h-[200px] sm:h-[230px] md:h-[248px]">
            <img
              src="/gallery-master.png"
              alt="Master bedroom"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />
            <button
              type="button"
              onClick={() => setLightboxIndex(2)}
              className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition"
              aria-label="Zoom master bedroom image"
            >
              <span className="grid place-items-center h-11 w-11 rounded-full border border-yellow-500/60 bg-black/60 text-yellow-400 backdrop-blur">
                <ZoomIn size={20} />
              </span>
            </button>
          </div>

        </div>

        {/* Bottom Full Image */}
        <div className="md:col-span-3">
          <div className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 h-[220px] sm:h-[260px] md:h-[320px]">
            <img
              src="/gallery-pool.png"
              alt="Pool"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />
            <button
              type="button"
              onClick={() => setLightboxIndex(3)}
              className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition"
              aria-label="Zoom pool image"
            >
              <span className="grid place-items-center h-12 w-12 rounded-full border border-yellow-500/60 bg-black/60 text-yellow-400 backdrop-blur">
                <ZoomIn size={22} />
              </span>
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 grid place-items-center"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-3 -right-3 grid place-items-center h-10 w-10 rounded-full border border-white/10 bg-black/80 text-gray-200 hover:text-white hover:border-white/25 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full border border-white/10 bg-black/70 text-gray-200 hover:text-white hover:border-white/25 transition"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full border border-white/10 bg-black/70 text-gray-200 hover:text-white hover:border-white/25 transition"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="w-full max-h-[80vh] object-contain rounded-xl border border-white/10 bg-black"
            />
          </div>
        </div>
      )}

    </section>
  );
}