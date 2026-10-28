/** Single source of truth for all real portfolio content. */

export const PROFILE = {
  name: "Aryan Patil",
  role: "Frontend Developer",
  tagline: "React & Tailwind",
  location: "Nagpur, Maharashtra, India",
  email: "aryanpatil2006@gmail.com",
  phone: "+91 89288 32287",
  phoneHref: "tel:+918928832287",
  github: "https://github.com/aryanp685",
  githubHandle: "@aryanp685",
  linkedin: "https://www.linkedin.com/in/aryan-patil-44a839336/",
  linkedinHandle: "in/aryan-patil",
  cv: "/cv.pdf",
  experience: "1+",
  since: "2024",
};

export const STACK = [
  { name: "React", note: "Components, hooks, state patterns", kind: "Library" },
  { name: "JavaScript", note: "ES6+, async, DOM, logic", kind: "Language" },
  { name: "Tailwind CSS", note: "Utility-first, v4, design tokens", kind: "Styling" },
  { name: "HTML & CSS", note: "Semantic markup, modern layout", kind: "Foundation" },
  { name: "Vite", note: "Fast builds, HMR, bundling", kind: "Tooling" },
  { name: "Git & GitHub", note: "Version control, branching, deploys", kind: "Tooling" },
  { name: "Flutter", note: "Cross-platform mobile apps in Dart", kind: "Mobile" },
  { name: "Firebase", note: "Auth, Firestore, hosting", kind: "Backend" },
  { name: "Responsive Design", note: "Mobile-first across every breakpoint", kind: "Craft" },
  { name: "AI-Assisted Development", note: "Ship fast without cutting corners", kind: "Workflow" },
];

export const PROJECTS = [
  {
    n: "01",
    title: "DealFlow",
    sub: "SaaS / Brand Deal Management",
    desc: "A full-stack SaaS that helps Indian creators manage brand deals end-to-end — deal tracking, invoice ageing, automated follow-up ladders, UPI payment links, and CA-ready TDS/GST reports. Built with Next.js + TypeScript + Postgres, live in production with Razorpay/Stripe billing and Payhip license-key sales.",
    tech: ["Next.js", "TypeScript", "Postgres", "Razorpay", "Stripe"],
    lang: "TypeScript",
    year: "2026",
    updated: "Live in production",
    img: "/work-01.jpg",
    live: "https://dealflow-lyart-eight.vercel.app/",
    href: "https://github.com/aryanp685/dealflow",
  },
  {
    n: "02",
    title: "Autodine",
    sub: "Restaurant Ordering Platform",
    desc: "A guest scans the card on the table, orders from their own phone, and the kitchen sees the ticket in the same second — table number and notes attached. No app to install, no account to create, nothing to learn behind the counter.",
    tech: ["React", "Node.js", "Tailwind CSS"],
    lang: "JavaScript",
    year: "2026",
    updated: "Live preview",
    img: "/work-02.jpg",
    live: "https://new-alpha-five-43.vercel.app/",
    href: "https://github.com/aryanp685/autodine",
  },
  {
    n: "03",
    title: "Prahari",
    sub: "Security Monitoring Platform",
    desc: "A security monitoring and reporting platform for businesses, agencies, and MSPs. It checks authorized websites for publicly visible issues involving TLS certificates, DNS, security headers, and exposed files. A multi-tenant dashboard presents findings with severity, evidence, verification status, and remediation guidance. Supports scheduled scans, client-ready PDF reports, and CI/CD integration.",
    tech: ["Python", "FastAPI", "React", "Vite", "SQLite", "Docker"],
    lang: "Python",
    year: "2026",
    updated: "Active development",
    img: "/work-03.jpg",
    href: "https://github.com/aryanp685/prahari",
  },
  {
    n: "04",
    title: "Portfolio",
    sub: "Personal Site",
    desc: "A typography-led, motion-driven personal portfolio built with React 19, Vite, and Tailwind CSS v4. Features GSAP + ScrollTrigger animations, Lenis smooth scrolling, dark/light theming, and a generative ambient score synthesized with the Web Audio API.",
    tech: ["React 19", "Vite", "Tailwind CSS v4", "GSAP", "Lenis"],
    lang: "JavaScript",
    year: "2026",
    updated: "Updated Oct 2026",
    img: "/portfolio.jpg",
    live: "https://github.com/aryanp685/portfolio",
    href: "https://github.com/aryanp685/portfolio",
  },
];

export const VALUES = [
  { title: "Clean Code", desc: "Maintainable and scalable code that stands the test of time." },
  { title: "Performance", desc: "Optimizing for speed and lightning-fast user experiences." },
  { title: "Collaboration", desc: "Working closely with teams to bring ideas to life." },
  { title: "Innovation", desc: "Staying ahead with the latest technologies and best practices." },
];

export const EXPERIENCE = [
  {
    period: "2024 — Present",
    role: "Freelance Web Developer",
    company: "Self-Employed",
    desc: "Designing and building small business websites and landing pages with React, Tailwind CSS and AI-assisted workflows. Handling everything myself — client requirements, design, code and deployment.",
    tech: ["React", "Tailwind CSS", "JavaScript", "Git & GitHub", "AI Tools"],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Aryan built our shop's website exactly the way we imagined it. He explained everything in simple language and delivered on time.",
    initials: "RD",
    name: "Rohan Deshmukh",
    title: "Owner, Deshmukh Traders",
  },
  {
    quote:
      "Our boutique's landing page looks premium and loads fast. We started getting customer enquiries from the very first week.",
    initials: "PK",
    name: "Priya Kulkarni",
    title: "Founder, Bloom Boutique",
  },
  {
    quote:
      "He rebuilt our cafe's menu site and made it work beautifully on phones. Communication was smooth from day one.",
    initials: "SM",
    name: "Sagar Meshram",
    title: "Owner, Brew & Bytes Cafe",
  },
  {
    quote:
      "A patient and professional developer. He handled everything — design, website and deployment — and even taught us how to update it ourselves.",
    initials: "AW",
    name: "Anjali Wankhede",
    title: "Director, Bright Steps Tutorials",
  },
];

export const REPOS_URL = "https://github.com/aryanp685?tab=repositories";
