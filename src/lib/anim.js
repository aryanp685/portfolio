import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins exactly once, client-side. */
export function initGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  registered = true;
  return gsap;
}

export const EASE = {
  out: "expo.out",
  soft: "power3.out",
  inOut: "power2.inOut",
};

export const DUR = { fast: 0.5, base: 0.9, slow: 1.2 };

export const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };
