import { useEffect, useRef, useState } from "react";
import { gsap, initGsap, ScrollTrigger } from "../../lib/anim";
import Magnetic from "./Magnetic";
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

    // hide on scroll down, reveal on scroll up
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        // the CSS entrance owns the transform until the first scroll
        if (!taken) {
          taken = true;
          el.style.animation = "none";
        }
        const hide = y > 80 && y > last;
        gsap.to(el, { yPercent: hide ? -100 : 0, duration: 0.4, overwrite: true });
        last = y;
      },
    });

    // progress bar lives OUTSIDE this component's DOM subtree, so pass the
    // node directly — a selector string would be scoped and silently match nothing
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
        className="fixed inset-x-0 top-0 z-[600] block h-px origin-left scale-x-0 bg-accent"
      />

      <header
        ref={root}
        className="nav-in fixed inset-x-0 top-0 z-[500] mix-blend-difference"
      >
        <nav className="flex items-center justify-between px-[var(--pad)] py-5 text-ink">
          <a href="#top" className="meta" data-cursor="link">
            Aryan Patil
            <span className="ml-2 opacity-50">©26</span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Magnetic strength={0.5}>
                  <a href={l.href} data-cursor="link" className="group meta relative block py-1">
                    {l.label}
                    <span className="absolute -bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 md:gap-6">
            <Ambient />
            <span className="meta hidden tabular-nums opacity-60 sm:inline">IND {time}</span>
            <ThemeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
