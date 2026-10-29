import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import { SplitWords } from "../../components/ui/SplitText";
import { PROFILE, VALUES } from "../../lib/data";
import { BLUR } from "../../lib/blur";

const STATEMENT = "Building the future, one component at a time.";

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray("[data-word]");

      if (reduced()) {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        gsap.set("[data-portrait]", { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      gsap.fromTo(
        words,
        { yPercent: 105, opacity: 0.15 },
        {
          yPercent: 0,
          opacity: 1,
          ease: EASE.soft,
          stagger: 0.06,
          duration: 0.8,
          scrollTrigger: {
            trigger: "[data-statement]",
            start: "top 78%",
            end: "bottom 62%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        "[data-portrait]",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: EASE.out,
          scrollTrigger: { trigger: "[data-portrait]", start: "top 85%" },
        },
      );

      gsap.fromTo(
        "[data-portrait] img",
        { yPercent: -10, scale: 1.14 },
        {
          yPercent: 8,
          scale: 1.14,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-portrait]",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        "[data-about-copy] > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: EASE.soft,
          scrollTrigger: { trigger: "[data-about-copy]", start: "top 82%" },
        },
      );

      gsap.fromTo(
        "[data-value]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: EASE.soft,
          scrollTrigger: { trigger: "[data-values]", start: "top 85%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      className="relative bg-noir panel px-[var(--pad)] py-24 text-onnoir md:py-40"
    >
      <div className="mb-16 flex items-center gap-6 md:mb-28">
        <span className="meta shrink-0 text-dustnoir">(01) — About</span>
        <span className="rule" />
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
        {/* real portrait */}
        <div className="md:col-span-5 lg:col-span-4">
          <div
            data-portrait
            className="relative aspect-3/4 w-full overflow-hidden bg-ink will-change-[clip-path]"
          >
            <img
              src="/aryan.jpeg"
              alt="Aryan Patil, frontend developer"
              loading="lazy"
              decoding="async"
              width={900}
              height={900}
              className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-700 will-change-transform hover:grayscale-0"
              style={{
                objectPosition: "50% 22%",
                backgroundImage: `url(${BLUR["/aryan.jpeg"]})`,
                backgroundSize: "cover",
              }}
            />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <p className="meta text-dustnoir">{PROFILE.name}</p>
            <p className="meta text-dustnoir">
              {PROFILE.experience} Year Exp.
            </p>
          </div>
        </div>

        {/* statement + copy */}
        <div className="flex flex-col justify-between md:col-span-7 lg:col-span-8">
          <h2
            data-statement
            className="font-display max-w-[13ch]"
            style={{ fontSize: "var(--fs-huge)" }}
          >
            <SplitWords text={STATEMENT} />
          </h2>

          <div data-about-copy className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-20">
            <div className="space-y-5">
              <p className="max-w-[46ch] text-base leading-relaxed text-onnoir/70 md:text-lg">
                I&apos;m a frontend developer from Nagpur with {PROFILE.experience} year of
                freelancing experience. My journey started during my BCA with a simple curiosity
                for how things work on the web, and it quickly turned into building real websites
                for real clients.
              </p>
              <p className="max-w-[46ch] text-base leading-relaxed text-onnoir/70 md:text-lg">
                I specialize in React, JavaScript and Tailwind CSS, using AI-assisted workflows to
                move fast without cutting corners — from clean landing pages to fully responsive
                business websites.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <p className="meta mb-2 text-dustnoir">Focus</p>
                <p className="text-lg">React · Tailwind CSS · Responsive interfaces</p>
              </div>
              <div>
                <p className="meta mb-2 text-dustnoir">Based in</p>
                <p className="text-lg">{PROFILE.location}</p>
              </div>
              <div>
                <p className="meta mb-2 text-dustnoir">Currently</p>
                <p className="text-lg">
                  Freelance Web Developer — {PROFILE.since} to present
                </p>
              </div>
            </div>
          </div>

          {/* mission quote */}
          <blockquote className="mt-16 max-w-[60ch] border-l border-onnoir/25 pl-6 text-xl leading-snug text-onnoir/90 md:mt-24 md:text-2xl">
            “My mission is to create digital experiences that are not just functional, but truly
            delightful — products that users love to use and developers love to maintain.”
          </blockquote>
        </div>
      </div>

      {/* values */}
      <div
        data-values
        className="mt-20 grid grid-cols-1 gap-px border-t border-onnoir/15 sm:grid-cols-2 lg:grid-cols-4 md:mt-32"
      >
        {VALUES.map((v, i) => (
          <div key={v.title} data-value className="border-b border-onnoir/15 py-8 pr-6">
            <span className="meta text-dustnoir">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mb-2 mt-3 text-xl md:text-2xl">{v.title}</h3>
            <p className="max-w-[30ch] text-sm leading-relaxed text-onnoir/60">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
