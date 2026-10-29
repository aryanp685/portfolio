import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/anim";


/**
 * Desktop-only custom cursor. Reads `data-cursor` off hovered elements.
 * Uses quickTo (transform-only) so it never triggers layout.
 */
export default function Cursor() {
  const dot = useRef(null);
  const [mode, setMode] = useState("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer)").matches;
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || noMotion) return;

    document.documentElement.classList.add("has-cursor");
    const el = dot.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      setVisible(true);
      const hit = (e.target)?.closest?.("[data-cursor]");
      setMode(((hit?.getAttribute("data-cursor")) ?? "default") || "default");
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  const BASE = 92;
  const scale = mode === "view" ? 1 : mode === "link" ? 44 / BASE : 14 / BASE;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden mix-blend-difference [@media(pointer:fine)]:block"
    >
      <div
        className="flex items-center justify-center rounded-full bg-white transition-[transform,opacity] duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)]"
        style={{
          width: BASE,
          height: BASE,
          marginLeft: -BASE / 2,
          marginTop: -BASE / 2,
          transform: `scale(${scale})`,
          opacity: visible ? 1 : 0,
        }}
      >
        <span
          className="meta text-black transition-opacity duration-200"
          style={{ opacity: mode === "view" ? 1 : 0, fontSize: 10 }}
        >
          View
        </span>
      </div>
    </div>
  );
}
