import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";


/**
 * Top navigation bar.
 *
 * - Tracks scroll position for styling
 * - Provides a theme toggle button
 * - Listens to theme changes broadcast by `theme.ts`
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoImageOk, setLogoImageOk] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMenuOpen]);



  return (
    <nav
      className={
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300 " +
        (isScrolled
          ? "bg-neutral-50/85 dark:bg-neutral-950/85 backdrop-blur border-b border-black/10 dark:border-white/10"
          : "bg-transparent")
      }
    >



      <div
        className={
          "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between transition-colors duration-300 " +
          (isScrolled ? "text-neutral-900 dark:text-neutral-50" : "text-white")
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
          (isScrolled ? "text-neutral-700 dark:text-neutral-200" : "text-white/85")
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
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Phone */}
        <a
          href="tel:0796033600"
          aria-label="Call +962 79 603 3600"
          className={
            "group flex items-center gap-2 text-sm cursor-pointer transition hover:text-yellow-500 hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.45)] " +
            (isScrolled ? "text-neutral-700 dark:text-neutral-200" : "text-white/85")
          }
        >
        <Phone size={16} className={"transition group-hover:text-yellow-500 " + (isScrolled ? "text-neutral-500 dark:text-neutral-300" : "text-white/70")} />
        <span className="hidden sm:inline">+962 79 603 3600</span>
        </a>

        {/* Inquire Button (FIXED) */}
        <a
          href="#contact"
          className="hidden sm:inline-block border border-yellow-500 px-4 py-2 text-xs sm:text-sm tracking-wide text-yellow-600 hover:bg-yellow-500 hover:text-black transition"
        >
          INQUIRE NOW
        </a>

        <button
          type="button"
          className={
            "grid place-items-center h-10 w-10 rounded-md md:hidden border transition " +
            (isScrolled
              ? "border-black/10 dark:border-white/10 hover:border-yellow-500"
              : "border-white/20 hover:border-yellow-500")
          }
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

      </div>

      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-neutral-50/95 dark:bg-neutral-950/95 backdrop-blur">
          <div className="mx-auto w-full max-w-7xl px-4 py-3">
            <ul className="flex flex-col gap-1 text-sm tracking-[0.18em]">
              <li>
                <a href="#properties" className="block py-2" onClick={() => setIsMenuOpen(false)}>PROPERTIES</a>
              </li>
              <li>
                <a href="#location" className="block py-2" onClick={() => setIsMenuOpen(false)}>LOCATION</a>
              </li>
              <li>
                <a href="#gallery" className="block py-2" onClick={() => setIsMenuOpen(false)}>GALLERY</a>
              </li>
              <li>
                <a href="#team" className="block py-2" onClick={() => setIsMenuOpen(false)}>TEAM</a>
              </li>
              <li>
                <a href="#contact" className="block py-2" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
              </li>
            </ul>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-3 inline-block border border-yellow-500 px-4 py-2 text-xs tracking-wide text-yellow-600 hover:bg-yellow-500 hover:text-black transition"
            >
              INQUIRE NOW
            </a>
          </div>
        </div>
      )}

    </nav>
  );
}