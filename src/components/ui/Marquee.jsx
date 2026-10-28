import { useEffect, useRef } from "react";
import { gsap, initGsap, ScrollTrigger, reduced } from "../../lib/anim";

/**
 * Infinite horizontal type. Base speed is constant; scroll velocity adds drag
 * and can flip direction, so it reacts to how the user is moving.
 */
export default function Marquee({
  text,
  speed = 60,
  direction = 1,
  className = "",
}) {
  const track = useRef(null);

  useEffect(() => {
    initGsap();
    const el = track.current;
    const half = el.scrollWidth / 2;
    if (!half) return;

    if (reduced()) {
      gsap.set(el, { x: 0 });
      return;
    }

    let x = 0;
    let dir = direction;
    const state = { extra: 0 };

    const tick = (_t, delta) => {
      x -= ((speed * dir + state.extra) * delta) / 1000;
      x = ((x % half) + half) % half; // wrap without layout reads
      gsap.set(el, { x: -x });
    };
    gsap.ticker.add(tick);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        dir = self.direction === 1 ? direction : -direction;
        gsap.to(state, {
          extra: Math.min(Math.abs(self.getVelocity()) * 0.12, 420),
          duration: 0.5,
          overwrite: true,
        });
      },
    });

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, [speed, direction]);

  const unit = (
    <span className="whitespace-nowrap pr-[0.35em]">
      {text
        .split("—")
        .map((t) => t.trim())
        .filter(Boolean)
        .map((part, i) => (
        <span key={i}>
          {part}
          <span className="px-[0.3em] align-middle text-[0.45em] opacity-50">●</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden>
      <div ref={track} className="marquee-track font-display" style={{ fontSize: "var(--fs-big)" }}>
        {unit}
        {unit}
        {unit}
        {unit}
      </div>
    </div>
  );
}
