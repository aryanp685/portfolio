import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import Magnetic from "../../components/ui/Magnetic";
import { PROFILE } from "../../lib/data";

const WORDS = ["Let's", "Build", "Something", "Great."];

const LINKS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "GitHub", value: PROFILE.githubHandle, href: PROFILE.github },
  { label: "LinkedIn", value: PROFILE.linkedinHandle, href: PROFILE.linkedin },
];

export default function Contact() {
  const root = useRef(null);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) {
        gsap.set("[data-line]", { yPercent: 0 });
        return;
      }
      gsap.fromTo(
        "[data-line]",
        { yPercent: 110, rotate: 3 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          ease: EASE.out,
          stagger: 0.09,
          scrollTrigger: { trigger: root.current, start: "top 62%" },
        }
      );
      gsap.fromTo(
        "[data-link-row]",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: EASE.soft,
          scrollTrigger: { trigger: "[data-links]", start: "top 85%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="contact"
      className="relative bg-noir panel px-[var(--pad)] pb-16 pt-24 text-onnoir md:pt-40"
    >
      <div className="mb-14 flex items-center gap-6 md:mb-20">
        <span className="meta shrink-0 text-dustnoir">(06) — Contact</span>
        <span className="rule" />
        <span className="meta hidden shrink-0 text-dustnoir md:block">Available for Work</span>
      </div>

      <h2 className="font-display" style={{ fontSize: "var(--fs-mega)", lineHeight: 0.85 }}>
        {WORDS.map((w) => (
          <span key={w} className="line-mask">
            <span data-line className="inline-block will-change-transform">
              {w}
            </span>
          </span>
        ))}
      </h2>

      <p className="mt-10 max-w-[52ch] text-base leading-relaxed text-onnoir/65 md:text-lg">
        Have a project in mind, a role to discuss, or just want to say hi? Your message lands
        straight in my inbox.
      </p>

      <div
        data-links
        className="mt-16 grid grid-cols-1 gap-x-12 gap-y-0 border-t border-onnoir/15 sm:grid-cols-2 md:mt-24"
      >
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            data-cursor="link"
            data-link-row
            className="group relative flex items-baseline justify-between gap-4 border-b border-onnoir/15 py-6 md:py-8"
          >
            <span className="meta shrink-0 text-dustnoir">{l.label}</span>
            <Magnetic strength={0.28}>
              <span className="relative inline-block text-right text-base md:text-2xl">
                {l.value}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-onnoir transition-transform duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:scale-x-100" />
              </span>
            </Magnetic>
          </a>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <Magnetic strength={0.3}>
          <a
            href={PROFILE.cv}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="meta inline-block border border-onnoir/30 px-8 py-4 transition-colors duration-500 hover:bg-onnoir hover:text-noir"
          >
            Download CV
          </a>
        </Magnetic>
        <p className="meta text-dustnoir">{PROFILE.location}</p>
      </div>
    </section>
  );
}