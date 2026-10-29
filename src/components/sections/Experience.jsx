import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import { EXPERIENCE, PROFILE } from "../../lib/data";

export default function Experience() {
  const root = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) return;

      // the vertical timeline rule draws itself as you scroll
      gsap.fromTo(
        "[data-spine]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );

      gsap.utils.toArray("[data-exp]").forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll("[data-exp-item]"),
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: EASE.soft,
            stagger: 0.09,
            scrollTrigger: { trigger: row, start: "top 80%" },
          },
        );
      });

      gsap.fromTo(
        "[data-stat]",
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: EASE.out,
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-stats]", start: "top 85%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="experience" className="cv-auto relative px-[var(--pad)] py-24 md:py-40">
      <div className="mb-14 flex items-center gap-6 md:mb-24">
        <span className="meta shrink-0 text-dust">(04) — Experience</span>
        <span className="rule" />
      </div>

      <h2
        className="font-display mb-16 max-w-[12ch] text-balance md:mb-28"
        style={{ fontSize: "var(--fs-huge)" }}
      >
        Experience that speaks volumes.
      </h2>

      <div data-timeline className="relative pl-6 md:pl-16">
        {/* drawn spine */}
        <span
          data-spine
          aria-hidden
          className="absolute left-0 top-2 h-full w-px origin-top bg-ink/25 md:left-6"
        />

        {EXPERIENCE.map((e) => (
          <div key={e.role} data-exp className="relative">
            <span
              aria-hidden
              className="absolute -left-6 top-3 block h-2 w-2 -translate-x-[3.5px] rounded-full bg-accent md:-left-10"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
              <p data-exp-item className="meta text-dust md:col-span-3">
                {e.period}
              </p>
              <div className="md:col-span-9">
                <h3
                  data-exp-item
                  className="font-display leading-none"
                  style={{ fontSize: "clamp(1.8rem, 4.4vw, 3.4rem)" }}
                >
                  {e.role}
                </h3>
                <p data-exp-item className="meta mt-3 text-accent">
                  {e.company}
                </p>
                <p
                  data-exp-item
                  className="mt-6 max-w-[58ch] text-base leading-relaxed text-ink/65 md:text-lg"
                >
                  {e.desc}
                </p>
                <ul data-exp-item className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                  {e.tech.map((t) => (
                    <li key={t} className="meta border border-ink/20 px-3 py-1.5 text-dust">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* headline stats */}
      <div
        data-stats
        className="mt-24 grid grid-cols-2 gap-px border-t border-ink/15 md:mt-36 md:grid-cols-4"
      >
        {[
          { v: PROFILE.experience, l: "Year Experience" },
          { v: "10+", l: "Technologies" },
          { v: "4", l: "Happy Clients" },
          { v: "100%", l: "Responsive" },
        ].map((s) => (
          <div key={s.l} className="border-b border-ink/15 py-8 pr-6">
            <span className="line-mask">
              <span
                data-stat
                className="font-display inline-block"
                style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}
              >
                {s.v}
              </span>
            </span>
            <p className="meta mt-2 text-dust">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
