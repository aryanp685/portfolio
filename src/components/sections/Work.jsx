import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import { PROJECTS, REPOS_URL } from "../../lib/data";
import { BLUR } from "../../lib/blur";


export default function Work() {
  const root = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) return;

      gsap.utils.toArray("[data-project]").forEach((card) => {
        const media = card.querySelector("[data-media]");
        const img = card.querySelector("img");
        const num = card.querySelector("[data-num]");
        const copy = card.querySelectorAll("[data-copy] > *");

        // clip-path + blur→sharp reveal
        gsap.fromTo(
          media,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: EASE.out,
            scrollTrigger: { trigger: card, start: "top 78%" },
          },
        );
        gsap.fromTo(
          img,
          { scale: 1.35, filter: "blur(14px)" },
          {
            scale: 1.12,
            filter: "blur(0px)",
            duration: 1.4,
            ease: EASE.out,
            scrollTrigger: { trigger: card, start: "top 78%" },
          },
        );

        // continuous parallax inside the frame
        gsap.to(img, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 },
        });

        // oversized numeral drifts horizontally
        gsap.fromTo(
          num,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );

        gsap.fromTo(
          copy,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: EASE.soft,
            stagger: 0.09,
            scrollTrigger: { trigger: card, start: "top 72%" },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="relative px-[var(--pad)] py-24 md:py-40">
      <div className="mb-16 flex items-center gap-6 md:mb-28">
        <span className="meta text-dust">(03) — Selected Work</span>
        <span className="rule" />
        <span className="meta hidden text-dust md:block">2025 — 2026</span>
      </div>

      <div className="space-y-28 md:space-y-52">
        {PROJECTS.map((p, i) => (
          <article key={p.n} data-project className="relative">
            {/* oversized cropped numeral */}
            <span
              data-num
              aria-hidden
              className={`font-display pointer-events-none absolute -top-[0.22em] z-0 select-none leading-none text-ink/8 ${
                i % 2 ? "right-[-6vw]" : "left-[-6vw]"
              }`}
              style={{ fontSize: "clamp(9rem, 30vw, 30rem)" }}
            >
              {p.n}
            </span>

            <div
              className={`relative z-10 grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-12 ${
                i % 2 ? "md:grid-cols-12 md:items-start" : ""
              }`}
            >
              {/* media */}
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                data-media
                className="group relative col-span-1 block aspect-16/10 overflow-hidden bg-ink/5 md:col-span-8 [direction:ltr]"
              >
                <img
                  src={p.img}
                  alt={`${p.title} — project preview`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  width={1312}
                  height={816}
                  className="absolute inset-0 h-full w-full scale-[1.12] object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] will-change-transform group-hover:scale-[1.19]"
                  style={{ backgroundImage: `url(${BLUR[p.img]})`, backgroundSize: "cover" }}
                />
              </a>

              {/* copy */}
              <div data-copy className="col-span-1 md:col-span-4 [direction:ltr]">
                <p className="meta mb-3 text-dust">{p.sub}</p>
                <h3
                  className="font-display mb-5 leading-[0.85]"
                  style={{ fontSize: "clamp(2.4rem, 7vw, 5.6rem)" }}
                >
                  {p.title}
                </h3>
                <p className="mb-6 max-w-[42ch] text-sm leading-relaxed text-ink/65 md:text-base">
                  {p.desc}
                </p>
                <ul className="mb-6 flex flex-wrap gap-x-4 gap-y-2">
                  {p.tech.map((t) => (
                    <li key={t} className="meta text-dust">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-ink/15 pt-4">
                  {p.live ? (
                    <>
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="link"
                        className="group meta relative inline-block py-1"
                      >
                        Live Demo
                        <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                      </a>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="link"
                        className="group meta relative inline-block py-1 ml-4"
                      >
                        View on GitHub
                        <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                      </a>
                    </>
                  ) : (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                      className="group meta relative inline-block py-1"
                    >
                      View on GitHub
                      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                    </a>
                  )}
                  <span className="meta text-dust">{p.updated}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-24 flex justify-center md:mt-36">
        <a
          href={REPOS_URL}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          className="group meta relative inline-block py-2"
        >
          View all on GitHub
          <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:scale-x-100" />
        </a>
      </div>
    </section>
  );
}
