import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type LightboxImage = { src: string; alt: string };

const images: LightboxImage[] = Array.from({ length: 16 }, (_, index) => {
  const n = index + 1;
  const baseName = String(n).padStart(2, "0");
  return {
    src: `/${baseName}.png`,
    alt: `Villa photo ${n}`,
  };
});

/**
 * Simple gallery section with a basic lightbox.
 *
 * Supports:
 * - Click to open
 * - ESC to close
 * - Arrow keys / buttons to navigate
 */
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current - 1 + images.length) % images.length;
    });
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + 1) % images.length;
    });
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, goNext, goPrev]);

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
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={image.src}
            className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 aspect-[4/3]"
          >
            <picture className="block w-full h-full">
              <source
                type="image/webp"
                srcSet={image.src.replace(/\.png$/i, ".webp")}
              />
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width={1200}
                height={900}
                draggable={false}
              />
            </picture>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition"
              aria-label={`Zoom ${image.alt} image`}
            >
              <span className="grid place-items-center h-11 w-11 rounded-full border border-yellow-500/60 bg-black/60 text-yellow-400 backdrop-blur">
                <ZoomIn size={20} />
              </span>
            </button>
          </div>
        ))}
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

            <picture className="block w-full">
              <source
                type="image/webp"
                srcSet={images[lightboxIndex].src.replace(/\.png$/i, ".webp")}
              />
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                className="w-full max-h-[80vh] object-contain rounded-xl border border-white/10 bg-black"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={2400}
                height={1800}
                draggable={false}
              />
            </picture>
          </div>
        </div>
      )}

    </section>
  );
}