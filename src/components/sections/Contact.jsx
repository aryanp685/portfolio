import { useEffect, useRef, useState } from "react";
import { gsap, initGsap, EASE, reduced } from "../../lib/anim";
import Magnetic from "../../components/ui/Magnetic";
import { PROFILE, CONTACT_FORM_ACTION } from "../../lib/data";

const WORDS = ["Let's", "Build", "Something", "Great."];

const LINKS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "GitHub", value: PROFILE.githubHandle, href: PROFILE.github },
  { label: "LinkedIn", value: PROFILE.linkedinHandle, href: PROFILE.linkedin },
];

export default function Contact() {
  const root = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      if (reduced()) {
        gsap.set("[data-line]", { yPercent: 0 });
        gsap.set("[data-form-row]", { opacity: 1, y: 0 });
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
      gsap.fromTo(
        "[data-form-row]",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: EASE.soft,
          scrollTrigger: { trigger: "[data-form]", start: "top 85%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);

    try {
      const response = await fetch(CONTACT_FORM_ACTION, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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

      {/* Contact links */}
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
            className="group relative flex items-baseline justify-between gap-4 border-b border-onnoir/15 py-6 md:py-8 last:border-0"
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

      {/* Contact form */}
      <form
        data-form
        action={CONTACT_FORM_ACTION}
        method="POST"
        onSubmit={handleSubmit}
        data-form-row
        className="mt-20 grid grid-cols-1 gap-6 md:mt-28 md:grid-cols-2"
      >
        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="name"
            className="meta mb-2 block text-dustnoir"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-transparent border border-onnoir/20 px-4 py-3 rounded-full text-onnoir placeholder-onnoir/40 focus:outline-none focus:border-accent transition-colors duration-300"
            placeholder="Aryan Patil"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="email"
            className="meta mb-2 block text-dustnoir"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-transparent border border-onnoir/20 px-4 py-3 rounded-full text-onnoir placeholder-onnoir/40 focus:outline-none focus:border-accent transition-colors duration-300"
            placeholder="you@example.com"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="subject"
            className="meta mb-2 block text-dustnoir"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="w-full bg-transparent border border-onnoir/20 px-4 py-3 rounded-full text-onnoir placeholder-onnoir/40 focus:outline-none focus:border-accent transition-colors duration-300"
            placeholder="Project inquiry"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="message"
            className="meta mb-2 block text-dustnoir"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            className="w-full bg-transparent border border-onnoir/20 px-4 py-3 rounded-xl text-onnoir placeholder-onnoir/40 focus:outline-none focus:border-accent transition-colors duration-300"
            placeholder="Tell me about your project..."
          ></textarea>
        </div>

        <div className="col-span-1 md:col-span-2 flex items-end">
          <button
            type="submit"
            className="inline-block bg-onnoir text-noir px-8 py-3.5 rounded-full font-medium transition-colors duration-300 hover:bg-accent hover:text-ink focus:outline-none"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
          {status === "success" && (
            <p className="ml-4 text-xs text-accent font-medium">Message sent ✓</p>
          )}
          {status === "error" && (
            <p className="ml-4 text-xs text-accent font-medium">Failed — try again</p>
          )}
        </div>
      </form>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <Magnetic strength={0.3}>
          <a
            href={PROFILE.cv}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="meta inline-block border border-onnoir/30 px-8 py-4 rounded-full transition-colors duration-500 hover:bg-onnoir hover:text-noir"
          >
            Download CV
          </a>
        </Magnetic>
        <p className="meta text-dustnoir">{PROFILE.location}</p>
      </div>
    </section>
  );
}
