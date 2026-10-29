import { PROFILE } from "../../lib/data";

export default function Footer() {
  const socials = [
    { l: "GitHub", h: PROFILE.github },
    { l: "LinkedIn", h: PROFILE.linkedin },
    { l: "Email", h: `mailto:${PROFILE.email}` },
  ];

  return (
    <footer className="relative section">
      <div className="rule mb-8" />
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xl font-semibold">{PROFILE.name}</p>
          <p className="meta mt-1">
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
              className="meta text-fg hover:text-accent transition-colors"
            >
              {s.l}
            </a>
          ))}
        </nav>

        <p className="meta">© 2026 — All rights reserved</p>
      </div>
    </footer>
  );
}
