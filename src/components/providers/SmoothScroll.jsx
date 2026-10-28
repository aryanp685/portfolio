import { useEffect } from "react";
import Lenis from "lenis";
import { initGsap, gsap, ScrollTrigger, reduced } from "../../lib/anim";

/** Lenis smooth scroll wired into the GSAP ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll() {
  useEffect(() => {
    initGsap();
    if (reduced()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // single RAF loop: GSAP drives Lenis, Lenis notifies ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    // expose so the preloader can lock/unlock the real scroller
    window.__lenis = lenis;
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // anchor links route through Lenis
    const onClick = (e) => {
      const a = (e.target)?.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        requestAnimationFrame(() => {
          lenis.scrollTo(el, { offset: 0, duration: 1.4 });
        });
      }
    }

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
