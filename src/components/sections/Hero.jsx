import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import { PROFILE } from "../../lib/data";

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) {
        gsap.set("[data-hero-fade]", { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: EASE.soft, stagger: 0.12 }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-[var(--pad)] pb-16 pt-24 md:pt-36 md:pb-24"
    >
      {/* top meta row */}
      <div className="flex items-start justify-between" data-hero-fade>
        <p className="meta max-w-[22ch]">
          {PROFILE.role}
          <br />
          {PROFILE.tagline}
        </p>
        <p className="meta hidden text-dust md:block">
          Portfolio · 2026
        </p>
      </div>

      {/* lockup — clean centered typography */}
      <div className="relative flex-1 flex flex-col justify-center py-8">
        <h1 className="text-center tracking-tighter" data-hero-fade>
          {PROFILE.role}
        </h1>
        <h2 className="mt-6 text-center text-muted tracking-wide" data-hero-fade>
          {PROFILE.tagline}
        </h2>

        {/* discipline row */}
        <div
          data-hero-fade
          className="mt-12 flex justify-center gap-8 text-muted"
        >
          {[PROFILE.tagline, "React", "Tailwind"].map((t) => (
            <span key={t} className="meta">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* bottom row */}
      <div className="flex items-end justify-between" data-hero-fade>
        <p className="meta max-w-[28ch] leading-relaxed">
          Freelance developer from Nagpur building fast, responsive websites
          clients love.
        </p>
        <div className="flex flex-col items-center gap-2">
          <span className="meta">Scroll</span>
          <span className="block h-10 w-[1px] bg-fg/20 animate-pulse" />
        </div>
        <p className="meta hidden md:block">Available for Work</p>
      </div>
    </section>
  );
}
