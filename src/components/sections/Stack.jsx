import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import { STACK } from "../../lib/data";

export default function Stack() {
  const root = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) return;

      gsap.fromTo(
        "[data-row]",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          ease: EASE.soft,
          scrollTrigger: { trigger: "[data-rows]", start: "top 85%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const byKind = {};
  STACK.forEach((t) => {
    if (!byKind[t.kind]) byKind[t.kind] = [];
    byKind[t.kind].push(t);
  });

  return (
    <section ref={root} id="stack" className="relative section">
      <div className="mb-12 flex items-center gap-6 md:mb-24">
        <span className="meta shrink-0">(02) — Stack</span>
        <span className="rule" />
        <span className="meta hidden shrink-0 md:block">
          {STACK.length} Technologies
        </span>
      </div>

      {Object.entries(byKind).map(([kind, items]) => (
        <div key={kind} className="mb-16 md:mb-24">
          <p className="meta mb-6">{kind}</p>
          <div data-rows className="space-y-2">
            {items.map((t, i) => (
              <div
                key={t.name}
                data-row
                className="relative flex items-baseline justify-between gap-4 overflow-hidden border-b border-fg/5 py-4 md:py-6 last:border-0"
              >
                <div className="flex min-w-0 items-baseline gap-4 md:gap-10">
                  <span className="meta w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold">{t.name}</span>
                </div>
                <span className="meta shrink-0">{t.kind}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
