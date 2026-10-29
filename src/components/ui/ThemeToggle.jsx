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
    // mirror whatever the blocking inline script already decided
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    setReady(true);

    // follow the OS only while the user hasn't chosen explicitly
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
      data-cursor="link"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
      className="meta relative flex h-6 w-12 items-center rounded-full border border-current opacity-70 transition-opacity hover:opacity-100 px-0.5"
    >
      <span
        aria-hidden
        className="block h-4 w-4 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
        style={{
          transform: ready && theme === "dark" ? "translateX(24px)" : "translateX(0)",
        }}
      />
      <span className="sr-only">{theme} mode</span>
    </button>
  );
}
