import { PROFILE } from "../../lib/data";

export default function Footer() {
  const socials = [
    { l: "GitHub", h: PROFILE.github },
    { l: "LinkedIn", h: PROFILE.linkedin },
    { l: "Email", h: `mailto:${PROFILE.email}` },
  ];

  return (
    <footer className="bg-noir panel px-[var(--pad)] pb-8 pt-10 text-onnoir">
      <div className="rule mb-8" />
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display" style={{ fontSize: "clamp(1.6rem,4vw,3rem)" }}>
            {PROFILE.name}
          </p>
          <p className="meta mt-2 text-dustnoir">
            {PROFILE.role} — {PROFILE.location}
          </p>
        </div>

        <nav className="flex gap-8">
          {socials.map((s) => (
            <a
              key={s.l}
              href={s.h}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="group meta relative py-1"
            >
              {s.l}
              <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-onnoir transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <p className="meta text-dustnoir">© 2026 — All rights reserved</p>
      </div>
    </footer>
  );
}
