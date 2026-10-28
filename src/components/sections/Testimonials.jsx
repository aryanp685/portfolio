import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import { TESTIMONIALS } from "../../lib/data";

export default function Testimonials() {
  const root = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) return;

      gsap.fromTo(
        "[data-quote]",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: EASE.soft,
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="testimonials"
      className="relative section"
    >
      <div className="flex h-full flex-col justify-center px-[var(--pad)]">
        <div className="mb-12 flex items-center gap-6 md:mb-16">
          <span className="meta shrink-0">(05) — Testimonials</span>
          <span className="rule" />
        </div>

        <h2 className="mb-14 max-w-[14ch] md:mb-20">Kind words from amazing people.</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              data-quote
              className="relative rounded-[var(--radius)] bg-surface border border-fg/10 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              <span className="meta mb-4 block">{String(i + 1).padStart(2, "0")}</span>
              <blockquote className="text-pretty text-lg leading-relaxed md:text-xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="meta flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-fg/20">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-base font-medium">{t.name}</span>
                  <span className="meta block">{t.title}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
