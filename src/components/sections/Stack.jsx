import { useEffect, useRef, useState } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import { STACK } from "../../lib/data";


export default function Stack() {
  const root = useRef(null);
  const float = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) {
        gsap.set("[data-row]", { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        "[data-row]",
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.05,
          scrollTrigger: { trigger: "[data-rows]", start: "top 80%" },
        },
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (pointer)", () => {
        const el = float.current;
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const move = (e) => {
          xTo(e.clientX + 28);
          yTo(e.clientY - 24);
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="stack" className="cv-auto relative px-[var(--pad)] py-24 md:py-40">
      <div className="mb-14 flex items-center gap-6 md:mb-24">
        <span className="meta shrink-0 text-dust">(02) — Stack</span>
        <span className="rule" />
        <span className="meta hidden shrink-0 text-dust md:block">
          {STACK.length} Technologies
        </span>
      </div>

      <div data-rows className="border-t border-ink/15">
        {STACK.map((t, i) => (
          <div
            key={t.name}
            data-row
            data-cursor="link"
            onPointerEnter={() => setActive(t)}
            onPointerLeave={() => setActive(null)}
            className="group relative flex items-baseline justify-between gap-4 overflow-hidden border-b border-ink/15 py-3 transition-colors duration-500 hover:bg-ink md:py-5"
          >
            <div className="flex min-w-0 items-baseline gap-4 md:gap-10">
              <span className="meta w-8 shrink-0 text-dust transition-colors duration-500 group-hover:text-bone/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="font-display origin-left transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4 group-hover:text-bone md:group-hover:scale-[1.06]"
                style={{ fontSize: "clamp(1.4rem, 4.4vw, 4rem)" }}
              >
                {t.name}
              </span>
            </div>
            <span className="meta shrink-0 text-dust transition-all duration-500 group-hover:-translate-x-2 group-hover:text-bone/60">
              {t.kind}
            </span>
          </div>
        ))}
      </div>

      <div
        ref={float}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[400] hidden max-w-[24ch] lg:block"
        style={{ opacity: active ? 1 : 0, transition: "opacity .35s ease" }}
      >
        <div className="bg-accent px-4 py-2 text-white">
          <p className="meta">{active?.note}</p>
        </div>
      </div>
    </section>
  );
}
