export default function Comparison() {
  return (
    <section className="bg-neutral-50 text-neutral-900 py-24 px-6">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="h-px w-10 sm:w-16 bg-yellow-700" />
          <p className="text-yellow-700 text-sm tracking-[0.25em]">
            Compare Villas
          </p>
          <span className="h-px w-10 sm:w-16 bg-yellow-700" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif">
          Side-by-Side Comparison
        </h2>
      </div>

      {/* Table */}
      <div className="max-w-3xl mx-auto border border-black/10 rounded-xl overflow-hidden bg-white">

        {/* Table Head */}
        <div className="grid grid-cols-3 bg-neutral-100 text-center text-xs sm:text-sm">

          <div className="p-3 sm:p-4 text-neutral-600 text-left">
            FEATURE
          </div>

          <div className="p-3 sm:p-4">
            <p className="text-yellow-600 font-serif">800 m²</p>
            <p className="text-xs text-neutral-500">Grand Estate</p>
          </div>

          <div className="p-3 sm:p-4">
            <p className="text-yellow-600 font-serif">550 m²</p>
            <p className="text-xs text-neutral-500">Elegant Residence</p>
          </div>

        </div>

        {/* Rows */}
        {[
          ["Floor Area", "800 m²", "550 m²"],
          ["Plot Size", "900 m²", "900 m²"],
          ["Floors", "4", "2"],
          ["Master Bedrooms", "6", "5"],
          ["Bathrooms", "9", "7"],
          ["Air Conditioning", "Central", "Central"],
          ["Underfloor Heating", "✔ Yes", "✔ Yes"],
          ["Double-Height Ceiling", "✔ Yes", "—"],
          ["Status", "Ready to View", "Ready to View"],
        ].map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-3 border-t border-black/10 text-center text-xs sm:text-sm"
          >
            <div className="p-3 sm:p-4 text-neutral-600 text-left">
              {row[0]}
            </div>
            <div className="p-3 sm:p-4">{row[1]}</div>
            <div className="p-3 sm:p-4">{row[2]}</div>
          </div>
        ))}

      </div>

      {/* Button */}
      

    </section>
  );
}