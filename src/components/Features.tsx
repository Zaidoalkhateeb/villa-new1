import { Home, Sparkles, ShieldCheck, TreePalm, MapPin, CheckCircle } from "lucide-react";

const TOP_FEATURES = [
  { icon: <Home size={22} />, text: "Modern Architecture" },
  { icon: <Sparkles size={22} />, text: "Premium Finishes" },
  { icon: <ShieldCheck size={22} />, text: "Reliable Delivery" },
  { icon: <TreePalm size={22} />, text: "Luxury Outdoor Spaces" },
  { icon: <MapPin size={22} />, text: "Prime Location" },
  { icon: <CheckCircle size={22} />, text: "Turnkey Ready" },
] as const;

/** Highlights and quick stats strip under the hero. */
export default function Features() {
  return (
    <section className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">

      {/* TOP FEATURES */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-2 py-12 px-4 sm:px-6 border-b border-black/10 dark:border-white/10">

        {TOP_FEATURES.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-3 text-neutral-600 dark:text-neutral-300">

            {/* Icon circle */}
            <div className="w-11 h-11 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-yellow-600">
              {item.icon}
            </div>

            <p className="text-xs tracking-wide text-center">
              {item.text}
            </p>
          </div>
        ))}

      </div>

      {/* STATS (UPDATED) */}
      <div className="bg-gradient-to-r from-neutral-50 via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 py-20">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 text-center gap-12 px-6">

          <div>
            <h2 className="text-5xl font-serif text-yellow-600 mb-3">
              13+
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-xs tracking-[0.2em] leading-relaxed">
              YEARS OF <br /> EXCELLENCE
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-serif text-yellow-600 mb-3">
              100+
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-xs tracking-[0.2em]">
              SATISFIED<br/>FAMILIES
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-serif text-yellow-600 mb-3">
              2
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-xs tracking-[0.2em] leading-relaxed">
              EXCLUSIVE VILLA <br /> MODELS
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-serif text-yellow-600 mb-3">
              100%
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-xs tracking-[0.2em]">
              PREMIUM<br/>
              FINISHES
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}