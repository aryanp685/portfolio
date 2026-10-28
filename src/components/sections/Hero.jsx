import { useEffect, useRef } from "react";
import { gsap, initGsap, ScrollTrigger, EASE, reduced } from "../../lib/anim";
import { SplitChars } from "../../components/ui/SplitText";
import { PROFILE } from "../../lib/data";

export default function Hero() {
  const root = useRef(null);
  const turb = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray("[data-char]");

      // --- entrance ------------------------------------------------
      if (reduced()) {
        gsap.set(chars, { yPercent: 0, opacity: 1 });
        gsap.set("[data-hero-fade]", { opacity: 1, y: 0 });
      } else {
        const tl = gsap.timeline({ delay: 2.05 });
        tl.fromTo(
          chars,
          { yPercent: 118, rotate: 6, scaleY: 1.35 },
          {
            yPercent: 0,
            rotate: 0,
            scaleY: 1,
            duration: 1.2,
            ease: EASE.out,
            stagger: { each: 0.035, from: "start" },
          },
        ).fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: EASE.soft },
          "-=0.7",
        );
      }

      const mm = gsap.matchMedia();

      // --- desktop: pointer parallax + liquid warp -----------------
      mm.add("(min-width: 1024px) and (pointer) and (prefers-reduced-motion: no-preference)", () => {
        const xTo = gsap.quickTo("[data-hero-lockup]", "x", { duration: 1.1, ease: "power3.out" });
        const yTo = gsap.quickTo("[data-hero-lockup]", "y", { duration: 1.1, ease: "power3.out" });
        const warp = { f: 0 };

        const onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          xTo(nx * 46);
          yTo(ny * 26);
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        // liquid distortion pulses with scroll velocity
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            gsap.to(warp, {
              f: Math.min(Math.abs(self.getVelocity()) * 0.000055, 0.035),
              duration: 0.4,
              overwrite: true,
              onUpdate: () =>
                turb.current?.setAttribute("baseFrequency", `${warp.f} ${warp.f * 1.7}`),
            });
          },
        });

        return () => {
          window.removeEventListener("pointermove", onMove);
          st.kill();
        };
      });

      // --- hover: characters react elastically to the pointer -------
      mm.add("(pointer) and (prefers-reduced-motion: no-preference)", () => {
        const lockup = root.current.querySelector("[data-hero-lockup]");
        const items = gsap.utils.toArray("[data-char]", lockup);

        const setters = items.map((el) => ({
          el,
          y: gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.5)" }),
          sy: gsap.quickTo(el, "scaleY", { duration: 0.7, ease: "elastic.out(1, 0.5)" }),
          sx: gsap.quickTo(el, "scaleX", { duration: 0.7, ease: "elastic.out(1, 0.5)" }),
          cx: 0,
        }));

        // cache centres; recompute only on resize, never per pointer move
        const measure = () =>
          setters.forEach((s) => {
            const r = s.el.getBoundingClientRect();
            s.cx = r.left + r.width / 2;
          });
        measure();

        const RADIUS = 260;
        let raf = 0;
        let px = -9999;

        const apply = () => {
          raf = 0;
          setters.forEach((s) => {
            const d = Math.abs(px - s.cx);
            const f = d > RADIUS ? 0 : 1 - d / RADIUS;
            const e = f * f * (3 - 2 * f); // smoothstep
            s.y(-34 * e);
            s.sy(1 + 0.42 * e);
            s.sx(1 - 0.06 * e);
          });
        };

        const onMove = (ev) => {
          px = ev.clientX;
          if (!raf) raf = requestAnimationFrame(apply);
        };
        const onLeave = () => {
          px = -9999;
          if (!raf) raf = requestAnimationFrame(apply);
        };

        lockup.addEventListener("pointermove", onMove);
        lockup.addEventListener("pointerleave", onLeave);
        window.addEventListener("resize", measure);
        ScrollTrigger.addEventListener("refresh", measure);

        return () => {
          if (raf) cancelAnimationFrame(raf);
          lockup.removeEventListener("pointermove", onMove);
          lockup.removeEventListener("pointerleave", onLeave);
          window.removeEventListener("resize", measure);
          ScrollTrigger.removeEventListener("refresh", measure);
        };
      });

      // --- scroll-out: the lockup sinks and scales ------------------
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to("[data-hero-inner]", {
          yPercent: -14,
          scale: 0.94,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-[var(--pad)] pb-8 pt-28 md:pt-32"
    >
      {/* displacement filter for the liquid headline warp */}
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <filter id="liquid">
          <feTurbulence
            ref={turb}
            type="fractalNoise"
            baseFrequency="0 0"
            numOctaves={2}
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="38" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* top meta row */}
      <div className="flex items-start justify-between" data-hero-fade>
        <p className="meta max-w-[14ch] text-dust">
          {PROFILE.role}
          <br />
          {PROFILE.tagline}
        </p>
        <p className="meta hidden text-dust md:block">Portfolio — 2026</p>
      </div>

      {/* the lockup */}
      <div data-hero-inner className="relative flex-1 flex flex-col justify-center py-6">
        <div data-hero-lockup className="will-change-transform" style={{ filter: "url(#liquid)" }}>
          <h1 className="font-display text-center" style={{ fontSize: "var(--fs-mega)" }}>
            <span className="line-mask">
              <SplitChars text="Creative" />
            </span>
          </h1>
          <div className="mt-2 flex items-center justify-center gap-[0.4em] md:mt-4">
            <span className="hidden h-px flex-1 bg-ink/25 md:block" data-hero-fade />
            <h2
              className="font-display whitespace-nowrap"
              style={{ fontSize: "clamp(1.5rem, 5.2vw, 5.4rem)", letterSpacing: "0.02em" }}
            >
              <span className="line-mask">
                <SplitChars text="Developer" />
              </span>
            </h2>
            <span className="hidden h-px flex-1 bg-ink/25 md:block" data-hero-fade />
          </div>
        </div>

        {/* discipline row */}
        <div
          data-hero-fade
          className="mt-8 flex justify-center gap-6 text-dust md:mt-12 md:gap-16"
        >
          {["React", "Tailwind", "Flutter"].map((t) => (
            <span key={t} className="meta">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* bottom row */}
      <div className="flex items-end justify-between" data-hero-fade>
        <p className="meta max-w-[22ch] leading-relaxed text-dust">
          Freelance developer from Nagpur building fast, responsive websites clients love.
        </p>
        <div className="flex flex-col items-center gap-2">
          <span className="meta text-dust">Scroll</span>
          <span className="block h-10 w-px animate-pulse bg-ink/40" />
        </div>
        <p className="meta hidden text-dust md:block">Available for Work</p>
      </div>
    </section>
  );
}
