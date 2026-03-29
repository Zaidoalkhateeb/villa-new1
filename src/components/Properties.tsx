import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

/**
 * Properties section.
 *
 * Includes:
 * - Two property cards with overview/floorplan tabs
 * - A lightbox with optional multi-image navigation
 * - A “flip card” interaction inside the lightbox (front image / back details)
 * - A details overlay opened via the CTA button
 */

type TabKey = "overview" | "floorplan";

type LightboxImage = { src: string; alt: string; description?: string };

type LightboxState = {
  images: LightboxImage[];
  index: number;
};

type DetailsState = {
  title: string;
  stats: [string, string, string, string];
  bedsSources: string[];
  bathsSources: string[];
};

const defaultRoomGallery = [
  "/gallery-master.png",
  "/gallery-living.png",
  "/gallery-kitchen.png",
  "/living-room-1.jpg",
];

const floorPlan8000Images = (Object.values(
  import.meta.glob("../../public/alkhlaif-*-floor.jpg", {
    eager: true,
    as: "url",
  }),
) as string[]).slice();

const floorPlan550Images = (Object.values(
  import.meta.glob("../../public/alkhlaif-*-floor-550.jpg", {
    eager: true,
    as: "url",
  }),
) as string[]).slice();

// Decode filenames from Vite asset URLs so we can rank and describe images.

function getDecodedFileName(url: string) {
  const raw = url.split("/").pop() ?? "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function getImageDescription(src: string) {
  const fileName = getDecodedFileName(src).toLowerCase();

  if (fileName.includes("floorplan-800")) {
    return "800 m² floor plan overview with key zoning and circulation.";
  }
  if (fileName.includes("floorplan-550")) {
    return "550 m² floor plan overview with a balanced indoor-outdoor layout.";
  }
  if (fileName.includes("grand") && fileName.includes("floor")) {
    return "Grand floor plan — main living areas and primary access.";
  }
  if (fileName.includes("first") && fileName.includes("floor")) {
    return "First floor plan — bedroom suites and private spaces.";
  }
  if (fileName.includes("roof") && fileName.includes("floor")) {
    return "Roof floor plan — terrace and upper amenities.";
  }
  if (fileName.includes("basment") || fileName.includes("basement")) {
    return "Basement floor plan — storage, service areas, and utilities.";
  }

  if (/^\d+\.(jpe?g|png|webp)$/.test(fileName) || fileName.startsWith("whatsapp image")) {
    return "Bedroom suite — premium finishes, warm lighting, and a calm palette.";
  }

  return "Elegant interior — high-end materials and refined detailing.";
}

function floorPlanRank(url: string) {
  const name = url.toLowerCase();
  if (name.includes("grand")) return 0;
  if (name.includes("first")) return 1;
  if (name.includes("roof")) return 2;
  // Folder uses "Basment" in filename; handle both spellings.
  if (name.includes("basment") || name.includes("basement")) return 3;
  return 99;
}

floorPlan8000Images.sort((a, b) => {
  const byRank = floorPlanRank(a) - floorPlanRank(b);
  if (byRank !== 0) return byRank;
  return a.localeCompare(b);
});

floorPlan550Images.sort((a, b) => {
  const byRank = floorPlanRank(a) - floorPlanRank(b);
  if (byRank !== 0) return byRank;
  return a.localeCompare(b);
});

const beds8000Images = (Object.values(
  import.meta.glob("../../public/*.jpeg", {
    eager: true,
    as: "url",
  }),
) as string[])
  .filter((url) => {
    const fileName = getDecodedFileName(url).toLowerCase();
    return /^\d+\.jpeg$/.test(fileName) || fileName.startsWith("whatsapp image");
  })
  .slice();

function bedsRank(url: string) {
  const fileName = getDecodedFileName(url).toLowerCase();
  const match = fileName.match(/^(\d+)\.jpeg$/);
  if (match?.[1]) return Number(match[1]);
  if (fileName.startsWith("whatsapp image")) return 1000;
  return 2000;
}

beds8000Images.sort((a, b) => {
  const byRank = bedsRank(a) - bedsRank(b);
  if (byRank !== 0) return byRank;
  return a.localeCompare(b);
});

function PropertyCard(props: {
  title: string;
  overviewImageSrc: string;
  floorPlanImageSrc: string;
  floorPlanImages?: string[];
  roomGallery: string[];
  bedsGallery?: string[];
  bathsGallery?: string[];
  description: string;
  badgeLeft: string;
  badgeRight: string;
  stats: [string, string, string, string];
  ctaText: string;
  onOpenLightbox: (images: LightboxImage[], startIndex?: number) => void;
  onOpenDetails: (details: DetailsState) => void;
}) {
  const {
    title,
    overviewImageSrc,
    floorPlanImageSrc,
    floorPlanImages,
    roomGallery,
    bedsGallery,
    bathsGallery,
    description,
    badgeLeft,
    badgeRight,
    stats,
    ctaText,
    onOpenLightbox,
    onOpenDetails,
  } = props;

  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const floorPlanSources =
    floorPlanImages && floorPlanImages.length ? floorPlanImages : [floorPlanImageSrc];

  const bedsSources = bedsGallery && bedsGallery.length ? bedsGallery : roomGallery;
  const bathsSources = bathsGallery && bathsGallery.length ? bathsGallery : roomGallery;

  const activeImageSrc =
    activeTab === "overview" ? overviewImageSrc : (floorPlanSources[0] ?? floorPlanImageSrc);

  const activeImageAlt =
    activeTab === "overview" ? `${title} overview` : `${title} floor plan`;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 transition-all duration-300 transform-gpu hover:border-yellow-500/70 hover:bg-yellow-500/5 dark:hover:bg-yellow-500/10 hover:-translate-y-1 hover:scale-[1.01] flex flex-col h-full">
      {/* Image */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            if (activeTab === "floorplan") {
              onOpenLightbox(
                floorPlanSources.map((src, index) => ({
                  src,
                  alt:
                    floorPlanSources.length > 1
                      ? `${title} floor plan ${index + 1}`
                      : `${title} floor plan`,
                  description: getImageDescription(src),
                })),
                0,
              );
              return;
            }

            onOpenLightbox(
              [
                {
                  src: overviewImageSrc,
                  alt: `${title} overview`,
                  description: getImageDescription(overviewImageSrc),
                },
              ],
              0,
            );
          }}
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

          {activeTab === "floorplan" && floorPlanSources.length > 1 && (
            <span className="absolute bottom-3 right-3 text-[10px] tracking-[0.25em] px-2 py-1 rounded-md border border-white/15 bg-black/55 text-white/85 backdrop-blur pointer-events-none">
              1/{floorPlanSources.length}
            </span>
          )}
        </button>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full">
          {badgeLeft}
        </div>

        <div className="absolute top-4 right-4 bg-white/85 dark:bg-neutral-950/80 text-neutral-900 dark:text-neutral-50 text-xs px-3 py-1 rounded-full border border-black/10 dark:border-white/10">
          {badgeRight}
        </div>

        {/* Title */}
        <h3 className="absolute bottom-4 left-4 text-xl font-serif text-yellow-400 bg-black/60 backdrop-blur px-3 py-1 rounded-lg border border-yellow-500/30">
          {title}
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-black/10 dark:border-white/10 text-sm">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={
            activeTab === "overview"
              ? "px-4 py-3 text-yellow-400 border-b-2 border-yellow-400"
              : "px-4 py-3 text-neutral-500 dark:text-neutral-400"
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
              : "px-4 py-3 text-neutral-500 dark:text-neutral-400"
          }
        >
          FLOOR PLAN
        </button>
      </div>

      {/* Description */}
      <div className="p-6 text-neutral-700 dark:text-neutral-200 text-sm leading-relaxed flex-1">
        {description}
      </div>

      {/* Stats */}
      <div className="flex justify-between px-6 pb-4 text-xs text-neutral-500 dark:text-neutral-400">
        <span>{stats[0]}</span>
        <span>{stats[1]}</span>
        <button
          type="button"
          onClick={() => {
            onOpenLightbox(
              bedsSources.map((src, index) => ({
                src,
                alt: `${title} bedroom image ${index + 1}`,
                description: getImageDescription(src),
              })),
              0,
            );
          }}
          className="text-neutral-700 dark:text-neutral-200 hover:text-yellow-600 dark:hover:text-yellow-400 transition"
          aria-label={`Open ${title} beds gallery`}
        >
          {stats[2]}
        </button>
        <button
          type="button"
          onClick={() => {
            onOpenLightbox(
              bathsSources.map((src, index) => ({
                src,
                alt: `${title} bathroom image ${index + 1}`,
                description: getImageDescription(src),
              })),
              0,
            );
          }}
          className="text-neutral-700 dark:text-neutral-200 hover:text-yellow-600 dark:hover:text-yellow-400 transition"
          aria-label={`Open ${title} baths gallery`}
        >
          {stats[3]}
        </button>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <button
          type="button"
          onClick={() => {
            onOpenDetails({
              title,
              stats,
              bedsSources,
              bathsSources,
            });
          }}
          className="w-full bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 border border-neutral-900 dark:border-neutral-50 py-3 text-sm tracking-wide transition hover:bg-yellow-500 hover:border-yellow-500 hover:text-black"
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}

export default function Properties() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [details, setDetails] = useState<DetailsState | null>(null);

  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") {
        setIsCardFlipped(false);
        setLightbox((current) => {
          if (!current) return null;
          if (current.images.length <= 1) return current;
          const nextIndex =
            (current.index - 1 + current.images.length) % current.images.length;
          return { ...current, index: nextIndex };
        });
      }
      if (e.key === "ArrowRight") {
        setIsCardFlipped(false);
        setLightbox((current) => {
          if (!current) return null;
          if (current.images.length <= 1) return current;
          const nextIndex = (current.index + 1) % current.images.length;
          return { ...current, index: nextIndex };
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  useEffect(() => {
    if (!details) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDetails(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [details]);

  const bedsGallery = beds8000Images.length ? beds8000Images : defaultRoomGallery;
  const floorPlans800 = (() => {
    const primary = "/floorplan-800.png";
    const rest = floorPlan8000Images.filter((src) => src !== primary);
    return [primary, ...rest];
  })();

  const floorPlans550 = (() => {
    const primary = "/floorplan-550.png";
    const rest = floorPlan550Images.filter((src) => src !== primary).slice(0, 2);
    return [primary, ...rest];
  })();

  return (
    <section
      id="properties"
      className="bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 py-20 px-6 scroll-mt-24"
    >
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-4xl font-serif mb-4">
          Exclusive <span className="text-yellow-600 italic">Properties</span>
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-xl">
          Discover our two distinctive villa models, each designed to provide an unmatched standard of living.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <PropertyCard
          title="The Grand Estate"
          overviewImageSrc="/villa-1.png"
          floorPlanImageSrc="/floorplan-800.png"
          floorPlanImages={floorPlans800}
          bedsGallery={bedsGallery}
          roomGallery={defaultRoomGallery}
          description="A premium standalone villa with four levels, double-height living spaces, central air conditioning, and underfloor heating. Experience the pinnacle of architectural excellence."
          badgeLeft="READY TO VIEW"
          badgeRight="PRICE ON REQUEST"
          stats={["800 m²", "900 m²", "6 Beds", "9 Baths"]}
          ctaText="View Details "
          onOpenLightbox={(images, startIndex = 0) =>
            (setIsCardFlipped(false), setLightbox({ images, index: startIndex }))
          }
          onOpenDetails={(nextDetails) => setDetails(nextDetails)}
        />

        <PropertyCard
          title="The Elegant Residence"
          overviewImageSrc="/villa-2.png"
          floorPlanImageSrc="/floorplan-550.png"
          floorPlanImages={floorPlans550}
          bedsGallery={bedsGallery}
          roomGallery={defaultRoomGallery}
          description="A refined two-floor villa designed for elegant family living with premium finishes, thoughtful functionality, and seamless indoor-outdoor flow."
          badgeLeft="READY TO VIEW"
          badgeRight="PRICE ON REQUEST"
          stats={["550 m²", "900 m²", "5 Beds", "7 Baths"]}
          ctaText="View Details "
          onOpenLightbox={(images, startIndex = 0) =>
            (setIsCardFlipped(false), setLightbox({ images, index: startIndex }))
          }
          onOpenDetails={(nextDetails) => setDetails(nextDetails)}
        />
      </div>

      {/* Details Overlay */}
      {details && (
        <div
          className="fixed inset-0 z-50 bg-black/80 p-4 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setDetails(null)}
        >
          <div
            className="w-full max-w-xl rounded-xl border border-white/15 bg-neutral-950/80 text-white backdrop-blur p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 mb-4">
              <div>
                <p className="text-xs tracking-[0.25em] text-yellow-400 mb-2">
                  VIEW DETAILS
                </p>
                <h3 className="text-xl font-serif">{details.title}</h3>
              </div>
              <button
                type="button"
                className="text-sm text-white/80 hover:text-white"
                onClick={() => setDetails(null)}
                aria-label="Close details"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {details.stats.map((value) => (
                <div
                  key={value}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                >
                  <p className="text-sm text-white/90">{value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm tracking-wide transition hover:bg-yellow-500 hover:border-yellow-500 hover:text-black"
                onClick={() => {
                  const images = details.bedsSources.map((src, index) => ({
                    src,
                    alt: `${details.title} bedroom image ${index + 1}`,
                    description: getImageDescription(src),
                  }));
                  setDetails(null);
                  setIsCardFlipped(false);
                  setLightbox({ images, index: 0 });
                }}
              >
                Open Beds
              </button>
              <button
                type="button"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm tracking-wide transition hover:bg-yellow-500 hover:border-yellow-500 hover:text-black"
                onClick={() => {
                  const images = details.bathsSources.map((src, index) => ({
                    src,
                    alt: `${details.title} bathroom image ${index + 1}`,
                    description: getImageDescription(src),
                  }));
                  setDetails(null);
                  setIsCardFlipped(false);
                  setLightbox({ images, index: 0 });
                }}
              >
                Open Baths
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 p-4 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={() => (setIsCardFlipped(false), setLightbox(null))}
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-white/70">
                {lightbox.images.length > 1
                  ? `${lightbox.index + 1} / ${lightbox.images.length}`
                  : ""}
              </p>
              <button
                type="button"
                className="text-sm text-white/80 hover:text-white"
                onClick={() => (setIsCardFlipped(false), setLightbox(null))}
                aria-label="Close image"
              >
                Close
              </button>
            </div>

            <div className="relative">
              {lightbox.images.length > 1 && (
                <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 pointer-events-none">
                  <button
                    type="button"
                    className="pointer-events-auto grid place-items-center h-10 w-10 rounded-full border border-white/15 bg-black/50 text-white/85 backdrop-blur transition hover:bg-black/70"
                    aria-label="Previous image"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsCardFlipped(false);
                      setLightbox((current) => {
                        if (!current) return null;
                        const nextIndex =
                          (current.index - 1 + current.images.length) %
                          current.images.length;
                        return { ...current, index: nextIndex };
                      });
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="pointer-events-auto grid place-items-center h-10 w-10 rounded-full border border-white/15 bg-black/50 text-white/85 backdrop-blur transition hover:bg-black/70"
                    aria-label="Next image"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsCardFlipped(false);
                      setLightbox((current) => {
                        if (!current) return null;
                        const nextIndex = (current.index + 1) % current.images.length;
                        return { ...current, index: nextIndex };
                      });
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

              <div className="mx-auto w-full max-w-5xl">
                <button
                  type="button"
                  onClick={() => setIsCardFlipped((v) => !v)}
                  className="block w-full text-left"
                  aria-label="Flip card"
                >
                  <div className="w-full [perspective:1200px]">
                    <div
                      className={
                        "relative w-full transition-transform duration-500 [transform-style:preserve-3d] " +
                        (isCardFlipped ? "[transform:rotateY(180deg)]" : "")
                      }
                    >
                      {/* Front */}
                      <div className="[backface-visibility:hidden]">
                        <img
                          src={lightbox.images[lightbox.index]?.src}
                          alt={lightbox.images[lightbox.index]?.alt}
                          className="w-full max-h-[80vh] object-contain rounded-lg"
                        />
                      </div>

                      {/* Back */}
                      <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <div className="w-full h-full min-h-[40vh] max-h-[80vh] rounded-lg border border-white/15 bg-neutral-950/80 text-white backdrop-blur p-6 flex items-center justify-center">
                          <div className="max-w-2xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>yes 
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}