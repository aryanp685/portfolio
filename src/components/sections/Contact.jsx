import { useEffect, useRef } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
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
      if (reduced()) return;

      gsap.fromTo(
        "[data-line]",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: EASE.soft,
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 82%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="contact" className="relative section">
      <div className="mb-12 flex items-center gap-6 md:mb-20">
        <span className="meta shrink-0">(06) — Contact</span>
        <span className="rule" />
        <span className="meta hidden md:block">Available for Work</span>
      </div>

      <h2 className="tracking-tighter">{WORDS.join(" ")}</h2>

      <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-fg/90 md:text-xl">
        Have a project in mind, a role to discuss, or just want to say hi? Your
        message lands straight in my inbox.
      </p>

      <div data-links className="mt-16 grid grid-cols-1 gap-6 md:mt-24">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group relative flex items-baseline justify-between gap-4 border-b border-fg/10 py-4 last:border-0"
          >
            <span className="meta shrink-0">{l.label}</span>
            <span className="relative inline-block text-right text-lg font-medium group-hover:text-accent transition-colors">
              {l.value}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center gap-6">
        <a
          href={PROFILE.cv}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-fg border border-fg/20 px-4 py-2 rounded-full hover:bg-fg/5 hover:text-accent transition-colors"
        >
          Download CV
        </a>
        <p className="meta">{PROFILE.location}</p>
      </div>
    </section>
  );
}
