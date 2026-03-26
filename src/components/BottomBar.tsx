import { Phone } from "lucide-react";

export default function BottomBar() {
  const phoneNumberDisplay = "+962 6 593 1620";
  const phoneNumberTel = "+96265931620";
  const whatsappNumber = "962796033600";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      {/* Main CTA bar */}
      <div className="bg-black/70 backdrop-blur border-t border-yellow-500/20 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-3 flex items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-sm text-white/80 truncate">
              <span className="text-yellow-400 font-semibold">AlKhlaif Villas</span>
              <span className="text-white/60"> — Interested in a viewing?</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${phoneNumberTel}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:border-white/30 hover:bg-white/10 transition"
              aria-label={`Call now ${phoneNumberDisplay}`}
            >
              <Phone size={16} className="text-white/70" />
              <span>Call Now</span>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-400 transition"
              aria-label="Open WhatsApp"
            >
              <span className="h-2 w-2 rounded-full bg-white/90" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
