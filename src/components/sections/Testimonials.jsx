import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import { TESTIMONIALS } from "../../lib/data";

export default function Testimonials() {
  const root = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) return;

      const mm = gsap.matchMedia();

      // desktop: the row of quotes scrolls horizontally, pinned
      mm.add("(min-width: 1024px)", () => {
        const el = track.current;
        const distance = () => el.scrollWidth - window.innerWidth + 96;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });

      // mobile: simple staggered entrance
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          "[data-quote]",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: EASE.soft,
            stagger: 0.12,
            scrollTrigger: { trigger: track.current, start: "top 82%" },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="testimonials"
      className="relative overflow-hidden bg-noir panel py-24 text-onnoir md:py-32"
    >
      <div className="flex h-full flex-col justify-center px-[var(--pad)]">
        <div className="mb-12 flex items-center gap-6 md:mb-16">
          <span className="meta shrink-0 text-dustnoir">(05) — Testimonials</span>
          <span className="rule" />
          <span className="meta hidden shrink-0 text-dustnoir lg:block">Scroll →</span>
        </div>

        <h2
          className="font-display mb-14 max-w-[14ch] text-balance md:mb-20"
          style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
        >
          Kind words from amazing people.
        </h2>

        <div
          ref={track}
          className="flex flex-col w-full gap-6 will-change-transform lg:flex-row lg:w-max lg:gap-10"
        >
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              data-quote
              className="flex w-[min(78vw,30rem)] shrink-0 flex-col justify-between border-t border-onnoir/20 pt-6 max-lg:w-full"
            >
              <span className="meta mb-6 block text-dustnoir">
                {String(i + 1).padStart(2, "0")}
              </span>
              <blockquote className="text-pretty text-xl leading-snug md:text-2xl lg:text-3xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="meta flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-onnoir/30">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-base">{t.name}</span>
                  <span className="meta block text-dustnoir">{t.title}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
