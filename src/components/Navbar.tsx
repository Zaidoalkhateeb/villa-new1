import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoImageOk, setLogoImageOk] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300 " +
        (isScrolled
          ? "bg-neutral-50/85 backdrop-blur border-b border-black/10"
          : "bg-transparent")
      }
    >

      <div
        className={
          "mx-auto w-full max-w-7xl px-6 lg:px-10 py-4 flex items-center justify-between transition-colors duration-300 " +
          (isScrolled ? "text-neutral-900" : "text-white")
        }
      >

      {/* Logo */}
      <a href="#" className="group flex items-center select-none">
        {logoImageOk ? (
          <img
            src="/JAMIL-KHLAIF-logo-final-480x139.png"
            alt="Jamil Khalif Luxury Villas"
            className="h-10 sm:h-11 w-auto transition-opacity duration-200 group-hover:opacity-90"
            onError={() => setLogoImageOk(false)}
          />
        ) : (
          <div className="flex items-center gap-2">
            <div className="bg-yellow-500 text-black px-2 py-1 font-bold transition-colors duration-200 group-hover:bg-yellow-400 group-hover:shadow-[0_0_16px_rgba(250,204,21,0.22)]">
              A
            </div>
            <span className="font-serif text-lg tracking-widest transition-colors duration-200 group-hover:text-white">
              ALKHLAIF
            </span>
          </div>
        )}
      </a>

      {/* Menu */}
      <ul
        className={
          "hidden md:flex gap-10 text-sm tracking-[0.2em] font-light transition-colors duration-300 " +
          (isScrolled ? "text-neutral-700" : "text-white/85")
        }
      >
        <li>
          <a href="#properties" className="hover:text-yellow-500 transition">PROPERTIES</a>
        </li>
        <li>
          <a href="#location" className="hover:text-yellow-500 transition">LOCATION</a>
        </li>
        <li>
          <a href="#gallery" className="hover:text-yellow-500 transition">GALLERY</a>
        </li>
        <li>
          <a href="#team" className="hover:text-yellow-500 transition">TEAM</a>
        </li>
        <li>
          <a href="#contact" className="hover:text-yellow-500 transition">CONTACT</a>
        </li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Phone */}
        <div
          className={
            "group flex items-center gap-2 text-sm cursor-pointer transition hover:text-yellow-500 hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.45)] " +
            (isScrolled ? "text-neutral-700" : "text-white/85")
          }
        >
        <Phone size={16} className={"transition group-hover:text-yellow-500 " + (isScrolled ? "text-neutral-500" : "text-white/70")} />
        <span>+962 6 593 1620</span>
        </div>

        {/* Inquire Button (FIXED) */}
        <button className="border border-yellow-500 px-5 py-2 text-sm tracking-wide text-yellow-600 hover:bg-yellow-500 hover:text-black transition">
          INQUIRE NOW
        </button>

      </div>

      </div>

    </nav>
  );
}