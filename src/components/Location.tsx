export default function Location() {
  /**
   * Location section.
   * Uses an embedded Google Maps iframe and an external link for full navigation.
   */
  return (
    <section
      id="location"
      className="bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 py-20 sm:py-24 px-4 sm:px-6 scroll-mt-24"
    >

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">

        {/* MAP */}
        <div className="relative rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 h-[240px] sm:h-[300px] md:h-[460px]">
          <iframe
            title={"31°49'08.6\"N 35°55'58.5\"E"}
            src="https://www.google.com/maps?q=31%C2%B049%2708.6%22N+35%C2%B055%2758.5%22E&hl=en&z=16&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          <a
            href="https://www.google.com/maps/search/?api=1&query=31%C2%B049%2708.6%22N%2035%C2%B055%2758.5%22E"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 left-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900/90 px-3 py-2 text-xs text-neutral-700 dark:text-neutral-200 backdrop-blur hover:bg-white dark:hover:bg-neutral-900 transition"
            aria-label="Open location in Google Maps"
          >
            Open in Google Maps
          </a>
        </div>

        {/* TEXT CONTENT */}
        <div className="rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 p-5 sm:p-8 md:h-[460px] flex flex-col">

          <div className="flex-1">

          {/* Label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-yellow-600" />
            <p className="text-yellow-600 text-sm tracking-[0.3em] font-serif font-semibold">
              WHY US
            </p>
            <span className="h-px w-10 bg-yellow-600" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-serif mb-5 leading-tight">
            Prime Villa Location
          </h2>

          {/* Description */}
          <p className="text-neutral-700 dark:text-neutral-200 mb-5 leading-relaxed">
            Founded in 2011, Al-Khalif Housing develops high-end residential villas
            designed for elevated living. Located at 31°49'08.6"N 35°55'58.5"E,
            we’re known for quality, detail, and customer satisfaction — delivering
            lasting value in every home.
          </p>

          <p className="text-neutral-700 dark:text-neutral-200 mb-8 leading-relaxed">
            Every villa we deliver is the result of a precise process — from architectural
            design to structural execution — ensuring that what you see in the plans is
            exactly what you live in.
          </p>

          </div>

          {/* Stats Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-auto">

            <div className="border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 rounded-lg px-5 py-4 sm:px-6 sm:py-5">
              <h3 className="text-2xl text-yellow-600 font-serif mb-1">
                13+
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 tracking-wide">
                YEARS OF EXCELLENCE
              </p>
            </div>

            <div className="border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 rounded-lg px-5 py-4 sm:px-6 sm:py-5">
              <h3 className="text-2xl text-yellow-600 font-serif mb-1">
                100%
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 tracking-wide">
                PREMIUM QUALITY
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}