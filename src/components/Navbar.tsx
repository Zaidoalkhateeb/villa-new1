import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentThemeFromDom, toggleTheme, type Theme } from "../theme";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoImageOk, setLogoImageOk] = useState(true);
  const [theme, setTheme] = useState<Theme>(() => getCurrentThemeFromDom());

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onThemeChange = (event: Event) => {
      const next = (event as CustomEvent<{ theme: Theme }>).detail?.theme;
      if (next === "light" || next === "dark") setTheme(next);
      else setTheme(getCurrentThemeFromDom());
    };

    window.addEventListener("theme:change", onThemeChange as EventListener);
    setTheme(getCurrentThemeFromDom());

    return () =>
      window.removeEventListener("theme:change", onThemeChange as EventListener);
  }, []);

  return (
    <nav
      className={
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300 " +
        (isScrolled
          ? "bg-neutral-50/85 dark:bg-neutral-950/85 backdrop-blur border-b border-black/10 dark:border-white/10"
          : "bg-transparent")
      }
    >

      {/* Theme Toggle (Top Right) */}
      <button
        type="button"
        onClick={() => setTheme(toggleTheme())}
        className={
          "absolute top-4 right-6 lg:right-10 inline-flex items-center justify-center h-8 px-2 rounded-lg border text-[10px] tracking-[0.25em] transition hover:text-yellow-500 " +
          (isScrolled
            ? "border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-200 bg-white/60 dark:bg-neutral-950/40 backdrop-blur"
            : "border-white/30 text-white/85 bg-black/10 backdrop-blur")
        }
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? "LIGHT" : "DARK"}
      </button>

      <div
        className={
          "mx-auto w-full max-w-7xl px-6 lg:px-10 py-4 flex items-center justify-between transition-colors duration-300 " +
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
      <div className="flex items-center gap-6">

        {/* Phone */}
        <a
          href="tel:+96265931620"
          aria-label="Call +962 6 593 1620"
          className={
            "group flex items-center gap-2 text-sm cursor-pointer transition hover:text-yellow-500 hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.45)] " +
            (isScrolled ? "text-neutral-700 dark:text-neutral-200" : "text-white/85")
          }
        >
        <Phone size={16} className={"transition group-hover:text-yellow-500 " + (isScrolled ? "text-neutral-500 dark:text-neutral-300" : "text-white/70")} />
        <span>+962 6 593 1620</span>
        </a>

        {/* Inquire Button (FIXED) */}
        <button className="border border-yellow-500 px-5 py-2 text-sm tracking-wide text-yellow-600 hover:bg-yellow-500 hover:text-black transition">
          INQUIRE NOW
        </button>

      </div>

      </div>

    </nav>
  );
}