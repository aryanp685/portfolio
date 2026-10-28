import { useEffect, useState } from "react";

export function applyTheme(t) {
  document.documentElement.classList.toggle("dark", t === "dark");
  try {
    localStorage.setItem("theme", t);
  } catch {}
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    setReady(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      let stored = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {}
      if (stored) return;
      const next = e.matches ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
      className="relative flex h-5 w-10 items-center rounded-full border border-fg/30 px-1 opacity-70 hover:opacity-100 transition-opacity"
    >
      <span
        aria-hidden
        className="block h-3 w-3 rounded-full bg-fg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: ready && theme === "dark" ? "translateX(20px)" : "translateX(0)",
        }}
      />
      <span className="sr-only">{theme} mode</span>
    </button>
  );
}
