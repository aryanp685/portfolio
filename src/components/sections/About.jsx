import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import { PROFILE, VALUES } from "../../lib/data";

const STATEMENT = "Building the future, one component at a time.";

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) return;

      gsap.fromTo(
        "[data-about-copy] > *",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: EASE.soft,
          scrollTrigger: { trigger: "[data-about-copy]", start: "top 85%" },
        }
      );

      gsap.fromTo(
        "[data-value]",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          ease: EASE.soft,
          scrollTrigger: { trigger: "[data-values]", start: "top 88%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      className="relative panel section bg-surface text-fg"
    >
      <div className="mb-12 flex items-center gap-6 md:mb-24">
        <span className="meta shrink-0">(01) — About</span>
        <span className="rule" />
      </div>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
        {/* portrait */}
        <div className="md:col-span-5 lg:col-span-4">
          <div
            className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius)] bg-fg shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
            <img
              src="/aryan.jpeg"
              alt="Aryan Patil, frontend developer"
              loading="lazy"
              decoding="async"
              width={900}
              height={900}
              className="absolute inset-0 h-full w-full object-cover object-[50%_22%]"
            />
          </div>
          <div className="mt-6 flex items-baseline justify-between">
            <p className="meta">{PROFILE.name}</p>
            <p className="meta">{PROFILE.experience} Year Exp.</p>
          </div>
        </div>

        {/* statement + copy */}
        <div className="flex flex-col justify-between md:col-span-7 lg:col-span-8">
          <h2
            data-statement
            className="tracking-tighter md:leading-[0.9]"
          >
            {STATEMENT}
          </h2>

          <div data-about-copy className="mt-12 grid grid-cols-1 gap-10 md:mt-20">
            <div className="space-y-6">
              <p className="max-w-[48ch] text-lg leading-relaxed text-fg/90">
                I&apos;m a React developer from Nagpur building clean, fast websites. I specialize in
                React, JavaScript and Tailwind CSS — turning ideas into real, working websites for
                clients.
              </p>
              <p className="max-w-[48ch] text-lg leading-relaxed text-fg/90">
                My focus is on writing clean, maintainable React code that performs well and is easy
                to update. I use modern tools to ship efficiently while keeping the codebase simple
                and understandable.
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <p className="meta mb-2">Focus</p>
                <p className="text-lg">React · Tailwind CSS · Responsive interfaces</p>
              </div>
              <div>
                <p className="meta mb-2">Based in</p>
                <p className="text-lg">{PROFILE.location}</p>
              </div>
              <div>
                <p className="meta mb-2">Currently</p>
                <p className="text-lg">
                  Freelance Web Developer — {PROFILE.since} to present
                </p>
              </div>
            </div>
          </div>

          <blockquote className="mt-16 max-w-[64ch] border-l-2 border-accent pl-6 text-xl leading-relaxed text-fg/90 md:mt-24 md:text-2xl">
            “My mission is to create digital experiences that are not just functional, but truly
            delightful — products that users love to use and developers love to maintain.”
          </blockquote>
        </div>
      </div>

      {/* values */}
      <div
        data-values
        className="mt-20 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4 md:mt-32"
      >
        {VALUES.map((v, i) => (
          <div key={v.title} data-value className="py-8 pr-6">
            <span className="meta">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mb-2 mt-3 text-lg font-semibold">{v.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
