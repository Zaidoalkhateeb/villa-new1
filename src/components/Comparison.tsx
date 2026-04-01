export default function Comparison() {
  /**
   * Simple feature comparison table for the two villa models.
   * Data is kept inline for easy edits by non-devs.
   */
  const rows = [
    ["Floor Area", "800 m²", "550 m²"],
    ["Plot Size (Land )", "900 m²", "900 m²"],
    ["Floors", "4", "2"],
    ["Master Bedrooms", "5", "4"],
    ["Bathrooms", "8", "6"],
    ["Air Conditioning", "Central", "Central"],
    ["Underfloor Heating", "✔ Yes", "✔ Yes"],
    ["Double-Height Ceiling", "✔ Yes", "✔ Yes"],
    ["Status", "Ready to View", "OFF Plan"],
  ] as const;

  return (
    <section className="bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 py-24 px-6">

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
      <div className="max-w-3xl mx-auto border border-black/10 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-neutral-900">

        {/* Table Head */}
        <div className="grid grid-cols-3 bg-neutral-100 dark:bg-neutral-900/60 text-center text-xs sm:text-sm">

          <div className="p-3 sm:p-4 text-neutral-600 dark:text-neutral-300 text-left">
            FEATURE
          </div>

          <div className="p-3 sm:p-4">
            <p className="text-yellow-600 font-serif">800 m²</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Grand Estate</p>
          </div>

          <div className="p-3 sm:p-4">
            <p className="text-yellow-600 font-serif">550 m²</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Elegant Residence</p>
          </div>

        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-3 border-t border-black/10 dark:border-white/10 text-center text-xs sm:text-sm"
          >
            <div className="p-3 sm:p-4 text-neutral-600 dark:text-neutral-300 text-left">
              {row[0]}
            </div>
            <div className="p-3 sm:p-4">{row[1]}</div>
            <div className="p-3 sm:p-4">{row[2]}</div>
          </div>
        ))}

      </div>

    
      

    </section>
  );
}