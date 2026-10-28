import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import { PROJECTS, REPOS_URL } from "../../lib/data";

export default function Work() {
  const root = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) return;

      gsap.fromTo(
        "[data-project]",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: EASE.soft,
          scrollTrigger: { trigger: "[data-project]", start: "top 85%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="relative section">
      <div className="mb-12 flex items-center gap-6 md:mb-24">
        <span className="meta shrink-0">(03) — Selected Work</span>
        <span className="rule" />
        <span className="meta hidden md:block">2025 — 2026</span>
      </div>

      <div className="space-y-24 md:space-y-40">
        {PROJECTS.map((p, i) => (
          <article key={p.n} data-project className="relative group">
            <div
              className={`relative z-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 ${
                i % 2 ? "md:grid-cols-12 md:items-start" : ""
              }`}
            >
              {/* media */}
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                className="relative col-span-1 block aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-surface md:col-span-7"
              >
                <img
                  src={p.img}
                  alt={`${p.title} — project preview`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  width={1312}
                  height={816}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </a>

              {/* copy */}
              <div className="col-span-1 md:col-span-4">
                <p className="meta mb-3">{p.sub}</p>
                <h3 className="mb-4 leading-[1.1]">{p.title}</h3>
                <p className="mb-6 max-w-[44ch] text-lg leading-relaxed text-fg/90">
                  {p.desc}
                </p>
                <ul className="mb-6 flex flex-wrap gap-x-3 gap-y-2">
                  {p.tech.map((t) => (
                    <li key={t} className="px-3 py-1 rounded-full bg-fg/5 text-xs font-medium text-fg border border-fg/10">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="flex gap-3">
                    {p.live ? (
                      <>
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-medium text-accent hover:underline"
                        >
                          Live Demo
                        </a>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-medium text-fg hover:underline"
                        >
                          GitHub
                        </a>
                      </>
                    ) : (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-fg hover:underline"
                      >
                        View on GitHub
                      </a>
                    )}
                  </div>
                  <span className="meta">{p.updated}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 flex justify-center md:mt-32">
        <a
          href={REPOS_URL}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-fg hover:text-accent hover:underline"
        >
          View all on GitHub →
        </a>
      </div>
    </section>
  );
}
