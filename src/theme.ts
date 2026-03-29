export type Theme = "light" | "dark";

/**
 * Theme utilities.
 *
 * - Stores user choice in localStorage
 * - Applies the Tailwind `dark` class to <html>
 * - Broadcasts theme changes via a DOM CustomEvent
 */
const STORAGE_KEY = "theme";
const DARK_CLASS = "dark";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function getStoredTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return isTheme(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getPreferredTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function getCurrentThemeFromDom(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains(DARK_CLASS) ? "dark" : "light";
}

/** Apply theme to the DOM and notify listeners. */
export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.toggle(DARK_CLASS, theme === "dark");
  root.dataset.theme = theme;
  // Hint to the browser for built-in UI (form controls, scrollbars, etc.)
  root.style.colorScheme = theme;

  window.dispatchEvent(
    new CustomEvent("theme:change", {
      detail: { theme },
    }),
  );
}

/** Persist and apply the theme as an explicit user choice. */
export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore storage errors
  }

  // Treat any user-set theme as an explicit choice.
  markThemeAsStored();
  applyTheme(theme);
}

export function toggleTheme(): Theme {
  const next: Theme = getCurrentThemeFromDom() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

/**
 * Initializes theme on startup.
 *
 * If no stored theme exists, follows system theme changes until the user
 * explicitly toggles (then it “locks” to the stored preference).
 */
export function initTheme(): Theme {
  const stored = getStoredTheme();
  const initial = stored ?? getSystemTheme();
  applyTheme(initial);

  // If user hasn't chosen explicitly, keep following system changes.
  if (!stored && typeof window !== "undefined" && window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(getSystemTheme());

    try {
      mq.addEventListener("change", onChange);
      window.addEventListener(
        "theme:store",
        () => {
          mq.removeEventListener("change", onChange);
        },
        { once: true },
      );
    } catch {
      // Safari < 14
      mq.addListener(onChange);
      window.addEventListener(
        "theme:store",
        () => {
          mq.removeListener(onChange);
        },
        { once: true },
      );
    }
  }

  return initial;
}

/** Stops following system theme updates (used after first explicit user choice). */
export function markThemeAsStored() {
  window.dispatchEvent(new Event("theme:store"));
}
