import { useEffect, useRef, useState } from "react";
import { gsap, initGsap, ScrollTrigger } from "../../lib/anim";
import ThemeToggle from "./ThemeToggle";
import Ambient from "./Ambient";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const root = useRef(null);
  const progress = useRef(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    fmt();
    const id = setInterval(fmt, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    initGsap();
    const el = root.current;
    const bar = progress.current;
    if (!el || !bar) return;

    let last = 0;
    let taken = false;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        if (!taken) {
          taken = true;
          el.style.transition = "transform 0.3s ease";
        }
        const hide = y > 60 && y > last;
        gsap.to(el, { yPercent: hide ? -100 : 0, duration: 0.3, overwrite: true });
        last = y;
      },
    });

    const prog = gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });

    return () => {
      st.kill();
      prog.scrollTrigger?.kill();
      prog.kill();
    };
  }, []);

  return (
    <>
      <span
        ref={progress}
        aria-hidden
        className="fixed inset-x-0 top-0 z-[600] block h-[1px] origin-left scale-x-0 bg-accent"
      />

      <header
        ref={root}
        className="fixed inset-x-0 top-0 z-[500] bg-bg/80 backdrop-blur-md border-b border-fg/10 transition-colors duration-300"
      >
        <nav className="flex items-center justify-between px-[var(--pad)] py-5 text-fg">
          <a href="#top" className="text-xs font-semibold tracking-wider" data-cursor="link">
            Aryan Patil
            <span className="ml-2 opacity-50">©26</span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="link"
                  className="text-xs font-medium hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 md:gap-6">
            <Ambient />
            <span className="meta hidden tabular-nums sm:inline">IND {time}</span>
            <ThemeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
