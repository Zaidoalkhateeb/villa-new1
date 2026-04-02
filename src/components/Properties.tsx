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
  "/01.png",
  "/02.png",
  "/03.png",
  "/04.png",
  "/05.png",
  "/06.png",
  "/07.png",
  "/08.png",
  "/09.png",
  "/10.png",
  "/11.png",
  "/12.png",
  "/13.png",
  "/14.png",
  "/15.png",
  "/16.png",
];

const floorPlan8000Images = [
  "/alkhlaif-Grand-floor.jpg",
  "/alkhlaif-First-floor.jpg",
  "/alkhlaif-Roof-floor.jpg",
  "/alkhlaif-Basment-floor.jpg",
];

const floorPlan550Images = ["/alkhlaif-Grand-floor-550.jpg", "/alkhlaif-First-floor-550.jpg"];

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
    return "800 m² planning with clear zoning and elegant circulation.";
  }
  if (fileName.includes("floorplan-550")) {
    return "550 m² planning with balanced flow and refined proportions.";
  }
  if (fileName.includes("grand") && fileName.includes("floor")) {
    return "Main level plan with generous living zones and seamless transitions.";
  }
  if (fileName.includes("first") && fileName.includes("floor")) {
    return "Upper level plan focused on private suites and quiet separation.";
  }
  if (fileName.includes("roof") && fileName.includes("floor")) {
    return "Roof plan designed for terrace living and open-air amenities.";
  }
  if (fileName.includes("basment") || fileName.includes("basement")) {
    return "Basement plan with service, storage, and utilities thoughtfully organized.";
  }

  if (/^\d+\.(jpe?g|png|webp)$/.test(fileName) || fileName.startsWith("whatsapp image")) {
    return "Luxury Bedroom — Experience refined living with premium finishes and modern elegance.";
  }

  return "Refined interior with premium materials and clean detailing.";
}

function getFlashCardCopy(image?: LightboxImage) {
  const alt = image?.alt ?? "Image details";
  const src = image?.src ?? "";
  const base = image?.description ?? (src ? getImageDescription(src) : "");

  const altLower = alt.toLowerCase();
  const isFloor = altLower.includes("floor plan") || src.toLowerCase().includes("floorplan");
  const isBedroom = altLower.includes("bedroom");
  const isBathroom = altLower.includes("bathroom");

  const title = isFloor ? "Plan Notes" : "Design Notes";

  const highlights = isFloor
    ? ["Clear zoning", "Natural flow", "Practical scale"]
    : isBedroom
      ? ["Comfort first", "Soft lighting", "Tailored finishes"]
      : isBathroom
        ? ["Spa feel", "Clean lines", "Premium surfaces"]
        : ["Premium materials", "Balanced tones", "Quiet detailing"];

  const body = base || (isFloor ? "A thoughtfully arranged plan." : "A refined interior moment.");

  return { heading: title, subtitle: '', body, highlights };
}

function getFloorPlanLabel(src: string) {
  const name = getDecodedFileName(src).toLowerCase();
  if (name.includes("grand") && name.includes("floor")) return "Grand Floor";
  if (name.includes("first") && name.includes("floor")) return "First Floor";
  if (name.includes("roof") && name.includes("floor")) return "Roof Floor";
  if (name.includes("basment") || name.includes("basement")) return "Basement Floor";
  return "Floor Plan";
}
const beds8000Images = defaultRoomGallery;

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

  const activeFloorLabel =
    activeTab === "floorplan" ? getFloorPlanLabel(activeImageSrc) : null;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 transition-all duration-300 transform-gpu hover:border-yellow-500/70 hover:bg-yellow-500/5 dark:hover:bg-yellow-500/10 hover:-translate-y-1 hover:scale-[1.01] flex flex-col h-full">
      {/* Image */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            if (activeTab === "floorplan") {
              onOpenLightbox(
                floorPlanSources.map((src) => ({
                  src,
                  alt: `${title} ${getFloorPlanLabel(src)}`,
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
            className="w-full h-56 sm:h-72 object-cover cursor-zoom-in"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width={1200}
            height={800}
            draggable={false}
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

          {activeFloorLabel && (
            <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded-md border border-yellow-400/40 bg-black/60 text-yellow-300 backdrop-blur pointer-events-none">
              {activeFloorLabel}
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
      <div className="grid grid-cols-2 sm:grid-cols-4 items-center text-center gap-x-3 gap-y-2 px-6 pb-4 text-xs text-neutral-500 dark:text-neutral-400">
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
        <span>{stats[3]}</span>
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

  const activeLightboxImage = lightbox?.images[lightbox.index];
  const flashCard = getFlashCardCopy(activeLightboxImage);

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

  const floorPlans550 = floorPlan550Images.length
    ? floorPlan550Images
    : ["/floorplan-550.png"];

  return (
    <section
      id="properties"
      className="bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 py-20 px-4 sm:px-6 scroll-mt-24"
    >
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif mb-4">
          Exclusive <span className="text-yellow-600 italic">Properties</span>
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-xl">
          Discover our two distinctive villa models, each designed to provide an unmatched standard of living.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-10">
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
          stats={["800 m²", "900 m²", "5 Beds", "8 Baths"]}
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
          stats={["550 m²", "900 m²", "4 Beds", "6 Baths"]}
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
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/15 bg-neutral-950/80 text-white backdrop-blur p-5 sm:p-6"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {details.stats.map((value) => (
                <div
                  key={value}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                >
                  <p className="text-sm text-white/90">{value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
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
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                          draggable={false}
                        />
                      </div>

                      {/* Back */}
                      <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <div className="w-full h-full min-h-[40vh] max-h-[80vh] rounded-lg border border-white/15 bg-neutral-950/80 text-white backdrop-blur p-6 flex items-center justify-center">
                          <div className="max-w-2xl">
                            <p className="text-2xl md:text-3xl font-bold tracking-[0.25em] text-yellow-400 mb-4">
                              {flashCard.heading}
                            </p>
                            <p className="text-lg md:text-xl font-semibold leading-relaxed text-white mb-4">{flashCard.body}</p>

                            <div className="mt-4 flex flex-wrap gap-3">
                              {flashCard.highlights.map((item) => (
                                <span
                                  key={item}
                                  className="text-base md:text-lg font-semibold tracking-wide px-4 py-2 rounded-full border border-white/15 bg-white/10 text-white/90"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                            {/* Removed 'Tap to return to the image.' */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}