import { useEffect, useState } from "react";
import { ZoomIn } from "lucide-react";

type TabKey = "overview" | "floorplan";

function PropertyCard(props: {
  title: string;
  overviewImageSrc: string;
  floorPlanImageSrc: string;
  description: string;
  badgeLeft: string;
  badgeRight: string;
  stats: [string, string, string, string];
  ctaText: string;
  onOpenImage: (src: string, alt: string) => void;
}) {
  const {
    title,
    overviewImageSrc,
    floorPlanImageSrc,
    description,
    badgeLeft,
    badgeRight,
    stats,
    ctaText,
    onOpenImage,
  } = props;

  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const activeImageSrc = activeTab === "overview" ? overviewImageSrc : floorPlanImageSrc;
  const activeImageAlt = `${title} ${activeTab === "overview" ? "overview" : "floor plan"}`;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-black/10 transition-all duration-300 transform-gpu hover:border-yellow-500/70 hover:bg-yellow-500/5 hover:-translate-y-1 hover:scale-[1.01] flex flex-col h-full">

      {/* Image */}
      <div className="relative">
        <button
          type="button"
          onClick={() => onOpenImage(activeImageSrc, activeImageAlt)}
          className="relative block w-full group"
          aria-label="Open image preview"
        >
          <img
            src={activeImageSrc}
            alt={activeImageAlt}
            className="w-full h-72 object-cover cursor-zoom-in"
            loading="lazy"
          />

          {/* Enlarge icon (center) */}
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/55 text-white border border-white/15 opacity-90 group-hover:opacity-100">
              <ZoomIn size={20} aria-hidden="true" />
            </span>
          </span>
        </button>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full">
          {badgeLeft}
        </div>

        <div className="absolute top-4 right-4 bg-white/85 text-neutral-900 text-xs px-3 py-1 rounded-full border border-black/10">
          {badgeRight}
        </div>

        {/* Title */}
        <h3 className="absolute bottom-4 left-4 text-xl font-serif text-yellow-400 bg-black/60 backdrop-blur px-3 py-1 rounded-lg border border-yellow-500/30">
          {title}
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-black/10 text-sm">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={
            activeTab === "overview"
              ? "px-4 py-3 text-yellow-400 border-b-2 border-yellow-400"
              : "px-4 py-3 text-neutral-500"
          }
        >
          OVERVIEW
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("floorplan")}
          className={
            activeTab === "floorplan"
              ? "px-4 py-3 text-yellow-400 border-b-2 border-yellow-400"
              : "px-4 py-3 text-neutral-500"
          }
        >
          FLOOR PLAN
        </button>
      </div>

      {/* Description */}
      <div className="p-6 text-neutral-700 text-sm leading-relaxed flex-1">
        {description}
      </div>

      {/* Stats */}
      <div className="flex justify-between px-6 pb-4 text-xs text-neutral-500">
        <span>{stats[0]}</span>
        <span>{stats[1]}</span>
        <span>{stats[2]}</span>
        <span>{stats[3]}</span>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <button
          type="button"
          className="w-full bg-neutral-900 text-white border border-neutral-900 py-3 text-sm tracking-wide transition hover:bg-yellow-500 hover:border-yellow-500 hover:text-black"
        >
          {ctaText}
        </button>
      </div>

    </div>
  );
}

export default function Properties() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <section
      id="properties"
      className="bg-neutral-100 text-neutral-900 py-20 px-6 scroll-mt-24"
    >

      {/* Title */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-4xl font-serif mb-4">
          Exclusive <span className="text-yellow-600 italic">Properties</span>
        </h2>
        <p className="text-neutral-600 max-w-xl">
          Discover our two distinctive villa models, each designed to provide an unmatched standard of living.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        <PropertyCard
          title="The Grand Estate"
          overviewImageSrc="/villa-1.png"
          floorPlanImageSrc="/floorplan-800.png"
          description="A premium standalone villa with four levels, double-height living spaces, central air conditioning, and underfloor heating. Experience the pinnacle of architectural excellence."
          badgeLeft="READY TO VIEW"
          badgeRight="PRICE ON REQUEST"
          stats={["800 m²", "900 m²", "6 Beds", "9 Baths"]}
          ctaText="View Details / Inquire"
          onOpenImage={(src, alt) => setLightbox({ src, alt })}
        />

        <PropertyCard
          title="The Elegant Residence"
          overviewImageSrc="/villa-2.png"
          floorPlanImageSrc="/floorplan-550.png"
          description="A refined two-floor villa designed for elegant family living with premium finishes, thoughtful functionality, and seamless indoor-outdoor flow."
          badgeLeft="READY TO VIEW"
          badgeRight="PRICE ON REQUEST"
          stats={["550 m²", "900 m²", "5 Beds", "7 Baths"]}
          ctaText="View Details / Inquire"
          onOpenImage={(src, alt) => setLightbox({ src, alt })}
        />

      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 p-4 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-3">
              <button
                type="button"
                className="text-sm text-white/80 hover:text-white"
                onClick={() => setLightbox(null)}
                aria-label="Close image"
              >
                Close
              </button>
            </div>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

    </section>
  );
}