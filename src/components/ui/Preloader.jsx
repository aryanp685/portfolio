import { useEffect, useRef, useState } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";

export default function Preloader() {
  const root = useRef(null);
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    initGsap();
    if (reduced()) {
      setDone(true);
      return;
    }
    const lenis = () => window.__lenis;
    document.body.style.overflow = "hidden";
    lenis()?.stop();

    const count = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        lenis()?.start();
        setDone(true);
      },
    });

    // 1 — count to 100
    tl.to(count, {
      v: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => setN(Math.round(count.v)),
    })
      .to("[data-pre-line]", { scaleX: 1, duration: 0.6, ease: EASE.inOut }, 0)

      // 2 — counter steps aside
      .to("[data-pre-label]", { yPercent: -120, opacity: 0, duration: 0.55, ease: EASE.out })

      // 3 — "hello" writes itself on, Apple-style
      .set("[data-hello]", { opacity: 1 })
      .fromTo(
        "[data-hello-stroke]",
        { strokeDashoffset: 1400 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" },
        "-=0.2",
      )
      .to("[data-hello-stroke]", { opacity: 0, duration: 0.5 }, "-=0.15")
      .to("[data-hello-fill]", { opacity: 1, duration: 0.5 }, "<")
      .to("[data-hello]", { opacity: 0, duration: 0.6, ease: EASE.inOut }, "+=0.45")

      // 4 — curtain lifts
      .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: EASE.out }, "-=0.25");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
      lenis()?.start();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[900] flex flex-col justify-end bg-[#080808] px-[var(--pad)] pb-[var(--pad)] text-[#efebe4]"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      {/* handwritten hello, centred */}
      <div
        data-hello
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0"
      >
        <svg
          viewBox="0 0 600 220"
          className="w-[62vw] max-w-[620px]"
          role="img"
          aria-label="hello"
        >
          <text
            data-hello-stroke
            x="300"
            y="150"
            textAnchor="middle"
            className="font-hand"
            style={{
              fontSize: 168,
              fill: "none",
              stroke: "#efebe4",
              strokeWidth: 2,
              strokeDasharray: 1400,
            }}
          >
            hello
          </text>
          <text
            data-hello-fill
            x="300"
            y="150"
            textAnchor="middle"
            className="font-hand"
            style={{ fontSize: 168, fill: "#efebe4", opacity: 0 }}
          >
            hello
          </text>
        </svg>
      </div>

      <div data-pre-label className="flex items-end justify-between">
        <span className="meta opacity-60">Aryan Patil — Portfolio</span>
        <span className="font-display" style={{ fontSize: "clamp(3rem,12vw,9rem)" }}>
          {String(n).padStart(3, "0")}
        </span>
      </div>
      <div data-pre-line className="mt-6 h-px w-full origin-left scale-x-0 bg-[#efebe4]/40" />
    </div>
  );
}
