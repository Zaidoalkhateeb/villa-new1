export default function Location() {
  return (
    <section
      id="location"
      className="bg-neutral-100 text-neutral-900 py-24 px-6 scroll-mt-24"
    >

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">

        {/* MAP */}
        <div className="rounded-xl overflow-hidden border border-black/10 bg-white h-[240px] sm:h-[300px] md:h-[460px]">
          <iframe
            title="Airport Road, Amman"
            src="https://www.google.com/maps?q=Airport%20Road%20Amman&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="rounded-xl bg-white border border-black/10 p-8 md:h-[460px] flex flex-col">

          <div className="flex-1">

          {/* Label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-yellow-400" />
            <p className="text-yellow-400 text-xs tracking-[0.3em]">
              WHY JORDAN
            </p>
            <span className="h-px w-10 bg-yellow-400" />
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-serif mb-5 leading-tight">
            The Prestige of Airport Road
          </h2>

          {/* Description */}
          <p className="text-neutral-700 mb-5 leading-relaxed">
            Founded in 2011, Al-Khalif Housing develops high-end residential villas
            designed for elevated living. Based primarily in the Airport Road area,
            we’re known for quality, detail, and customer satisfaction — delivering
            lasting value in every home.
          </p>

          <p className="text-neutral-700 mb-8 leading-relaxed">
            Every villa we deliver is the result of a precise process — from architectural
            design to structural execution — ensuring that what you see in the plans is
            exactly what you live in.
          </p>

          </div>

          {/* Stats Boxes */}
          <div className="flex gap-6 mt-auto">

            <div className="border border-black/10 bg-neutral-50 rounded-lg px-6 py-5">
              <h3 className="text-2xl text-yellow-600 font-serif mb-1">
                13+
              </h3>
              <p className="text-xs text-neutral-600 tracking-wide">
                YEARS OF EXCELLENCE
              </p>
            </div>

            <div className="border border-black/10 bg-neutral-50 rounded-lg px-6 py-5">
              <h3 className="text-2xl text-yellow-600 font-serif mb-1">
                100%
              </h3>
              <p className="text-xs text-neutral-600 tracking-wide">
                PREMIUM QUALITY
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}