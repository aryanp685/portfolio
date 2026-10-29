import { lazy, Suspense } from "react";
import SmoothScroll from "./components/providers/SmoothScroll";
import Preloader from "./components/ui/Preloader";
import Cursor from "./components/ui/Cursor";
import Nav from "./components/ui/Nav";
import Hero from "./components/sections/Hero";
import Marquee from "./components/ui/Marquee";

// below-the-fold sections are split out of the initial bundle
const About = lazy(() => import("./components/sections/About"));
const Stack = lazy(() => import("./components/sections/Stack"));
const Work = lazy(() => import("./components/sections/Work"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Testimonials = lazy(() => import("./components/sections/Testimonials"));
const Contact = lazy(() => import("./components/sections/Contact"));
const Footer = lazy(() => import("./components/sections/Footer"));

/** Reserves height while a lazy section loads so the scroll never jumps. */
const Hold = () => <div className="min-h-[60vh]" aria-hidden />;

export default function App() {
  return (
    <>
      {/* SmoothScroll mounts first so Lenis exists before Preloader locks it */}
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Nav />

      <main>
        <Hero />

        <div className="border-y border-ink/15 py-4">
          <Marquee
            text="Frontend Developer — React & Tailwind — Freelance — Nagpur —"
            speed={70}
          />
        </div>

        <Suspense fallback={<Hold />}>
          <About />
          <Stack />
          <Work />
          <Experience />
          <Testimonials />

          <div className="band border-y border-ink/15 bg-bone py-4">
            <Marquee
              text="Available for work — React & Tailwind — Nagpur, India —"
              speed={55}
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
