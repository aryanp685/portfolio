import { lazy, Suspense } from "react";
import SmoothScroll from "./components/providers/SmoothScroll";
import Nav from "./components/ui/Nav";
import Hero from "./components/sections/Hero";
import Marquee from "./components/ui/Marquee";

// below-the-fold sections are split out of the initial bundle
const About = lazy(() => import("./components/sections/About"));
const Stack = lazy(() => import("./components/sections/Stack"));
const Work = lazy(() => import("./components/sections/Work"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Contact = lazy(() => import("./components/sections/Contact"));
const Footer = lazy(() => import("./components/sections/Footer"));

/** Reserves height while a lazy section loads so the scroll never jumps. */
const Hold = () => <div className="min-h-[60vh]" aria-hidden />;

export default function App() {
  return (
    <>
      <a
        href="#top"
        className="absolute -top-12 left-4 z-[1000] bg-fg text-bg px-3 py-1.5 rounded-full text-xs font-medium transition-transform duration-200 focus:translate-y-0 focus:outline-none"
      >
        Skip to content
      </a>

      <SmoothScroll />
      <Nav />

      <main>
        <Hero />

        <div className="border-y border-fg/10 py-3">
          <Marquee
            text="Frontend Developer — React & Tailwind — Freelance — Nagpur —"
            speed={50}
          />
        </div>

        <Suspense fallback={<Hold />}>
          <About />
          <Stack />
          <Work />
          <Experience />

          <div className="band border-y border-fg/10 bg-surface py-3">
            <Marquee
              text="Available for work — React & Tailwind — Nagpur, India —"
              speed={45}
              direction={-1}
            />
          </div>

          <Contact />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
