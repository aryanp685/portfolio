import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import { EXPERIENCE, PROFILE, STACK } from "../../lib/data";

export default function Experience() {
  const root = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) return;

      gsap.utils.toArray("[data-exp]").forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll("[data-exp-item]"),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: EASE.soft,
            stagger: 0.09,
            scrollTrigger: { trigger: row, start: "top 85%" },
          }
        );
      });

      gsap.fromTo(
        "[data-stat]",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: EASE.out,
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-stats]", start: "top 88%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="experience" className="relative section">
      <div className="mb-12 flex items-center gap-6 md:mb-24">
        <span className="meta shrink-0">(04) — Experience</span>
        <span className="rule" />
      </div>

      <h2 className="mb-16 max-w-[12ch] md:mb-28">Experience that speaks volumes.</h2>

      <div data-timeline className="relative pl-6 md:pl-10">
        {EXPERIENCE.map((e) => (
          <div key={e.role} data-exp className="relative mb-16 md:mb-24">
            {/* timeline dot */}
            <span
              aria-hidden
              className="absolute -left-[3px] top-[4px] block h-2 w-2 rounded-full bg-accent md:-left-[5px]"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-10">
              <p data-exp-item className="meta md:col-span-3">{e.period}</p>
              <div className="md:col-span-9">
                <h3 data-exp-item className="text-2xl font-semibold leading-none">{e.role}</h3>
                <p data-exp-item className="meta mt-2 text-accent">{e.company}</p>
                <p data-exp-item className="mt-4 max-w-[60ch] text-lg leading-relaxed text-fg/90">
                  {e.desc}
                </p>
                <ul data-exp-item className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                  {e.tech.map((t) => (
                    <li key={t} className="px-3 py-1 rounded-full bg-fg/5 text-xs font-medium text-fg border border-fg/10">
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
        className="mt-20 grid grid-cols-2 gap-4 border-t border-border pt-8 md:mt-24 md:grid-cols-2"
      >
        {[
          { v: PROFILE.experience, l: "Year Experience" },
          { v: STACK.length.toString(), l: "Technologies" },
        ].map((s) => (
          <div key={s.l} className="py-4 pr-6">
            <span className="text-2xl font-semibold tracking-tight">{s.v}</span>
            <p className="meta mt-1">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
