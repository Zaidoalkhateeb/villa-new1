type Testimonial = {
  text: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    text: "We moved into our villa last spring and haven’t looked back. The craftsmanship in every room is exceptional.",
    name: "Fadi Salman",
    role: "Owner, Grand Estate Villa",
  },
  {
    text: "AlKhlaif delivered our dream home on time and on budget. The team was professional and transparent.",
    name: "Mohammed Al mughrabi",
    role: "Homeowner, Elegant Residence",
  },
  {
    text: "As both an investor and homeowner, I’ve seen many developments. AlKhlaif stands apart in quality.",
    name: "Khalid Nasser",
    role: "Investor & Homeowner",
  },
];

/** Customer testimonial cards. */
export default function Testimonials() {
  return (
    <section className="bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 py-24 px-6">
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="h-px w-12 bg-yellow-600" />
          <p className="text-yellow-600 text-sm tracking-[0.3em] font-serif font-semibold">
            CLIENT STORIES
          </p>
          <span className="h-px w-12 bg-yellow-600" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-center">What Our Clients Say</h2>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {TESTIMONIALS.map((item, i) => (
          <div
            key={i}
            className="group relative bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl p-6 hover:border-yellow-500/70 transition-all duration-300 transform-gpu hover:-translate-y-1 hover:scale-[1.01]"
          >
            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100 bg-yellow-500/5 blur-xl" />

            <div className="text-yellow-600 mb-4 tracking-wide">★★★★★</div>

            <p className="text-neutral-700 dark:text-neutral-200 text-sm leading-relaxed mb-6 relative z-10">
              “{item.text}”
            </p>

            <div className="border-t border-black/10 dark:border-white/10 pt-4 relative z-10">
              <div className="flex items-start gap-3">
                <span className="mt-3 h-px w-8 bg-yellow-400/80 shrink-0" />
                <div>
                  <p className="font-serif text-lg leading-snug">{item.name}</p>
                  <p className="mt-1 text-yellow-600 font-serif text-xs tracking-wide">{item.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}