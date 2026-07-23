# IBFautomate — Code source complet

Export du projet Next.js (sans node_modules).

## package.json
```
{
  "name": "ibfautomate",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.469.0",
    "next": "^14.2.21",
    "next-themes": "^0.4.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.17.10",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.1",
    "eslint-config-next": "^14.2.21",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2"
  }
}

```

## tsconfig.json
```
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

## next.config.js
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

```

## tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#050807",
          surface: "#0A0F0D",
        },
        day: {
          DEFAULT: "#F7FAF8",
          text: "#0A0F0D",
        },
        brand: {
          DEFAULT: "#00E676",
          emerald: "#10B981",
          dark: "#064E3B",
          deep: "#047857",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #00E676, #059669, #064E3B)",
      },
      boxShadow: {
        "glow-brand": "0 0 24px rgba(0, 230, 118, 0.35)",
        "glow-brand-sm": "0 0 12px rgba(0, 230, 118, 0.25)",
      },
      borderRadius: {
        island: "22px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.25)", opacity: "0.15" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-28px) scale(1.05)" },
        },
        "float-alt": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(20px, 24px) scale(1.08)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "pulse-ring": "pulse-ring 2.4s ease-in-out infinite",
        float: "float 14s ease-in-out infinite",
        "float-alt": "float-alt 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

```

## postcss.config.js
```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

## .eslintrc.json
```
{
  "extends": "next/core-web-vitals"
}

```

## next-env.d.ts
```
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

## public/og.svg
```
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00E676"/>
      <stop offset="50%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#064E3B"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#050807"/>
  <circle cx="200" cy="120" r="180" fill="#00E676" opacity="0.15"/>
  <circle cx="1000" cy="500" r="220" fill="#10B981" opacity="0.12"/>
  <text x="80" y="290" font-family="Arial, sans-serif" font-size="72" font-weight="700" fill="#F0F7F3">IBF<tspan fill="url(#g)">automate</tspan></text>
  <text x="80" y="370" font-family="Arial, sans-serif" font-size="32" fill="#9AADA3">Agence Web &amp; Automatisation</text>
</svg>

```

## src/app/globals.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #f7faf8;
  --bg-surface: #ffffff;
  --text: #0a0f0d;
  --text-muted: #3d4a44;
  --island: rgba(255, 255, 255, 0.72);
  --island-border: rgba(4, 120, 87, 0.18);
  --grid: rgba(4, 120, 87, 0.06);
  --glow: rgba(0, 230, 118, 0.2);
  --orb-opacity: 0.35;
}

.dark {
  --bg: #050807;
  --bg-surface: #0a0f0d;
  --text: #f0f7f3;
  --text-muted: #9aada3;
  --island: rgba(255, 255, 255, 0.04);
  --island-border: rgba(0, 230, 118, 0.15);
  --grid: rgba(0, 230, 118, 0.05);
  --glow: rgba(0, 230, 118, 0.35);
  --orb-opacity: 0.55;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  body {
    @apply font-sans antialiased;
    background-color: var(--bg);
    color: var(--text);
    transition: background-color 300ms ease, color 300ms ease;
  }

  ::selection {
    background: rgba(0, 230, 118, 0.35);
    color: inherit;
  }
}

@layer components {
  .island {
    background: var(--island);
    border: 1px solid var(--island-border);
    border-radius: 22px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: background-color 300ms ease, border-color 300ms ease,
      box-shadow 300ms ease, transform 300ms ease;
  }

  .island-hover {
    position: relative;
    overflow: hidden;
  }

  .island-hover::before {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00e676, transparent);
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .island-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px var(--glow);
    border-color: rgba(0, 230, 118, 0.35);
  }

  .island-hover:hover::before {
    opacity: 1;
  }

  .text-gradient {
    background-image: linear-gradient(135deg, #00e676, #059669, #064e3b);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .dark .text-gradient {
    background-image: linear-gradient(135deg, #00e676, #10b981, #059669);
  }

  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-display text-sm font-semibold tracking-wide text-night transition-all duration-300;
    background-image: linear-gradient(135deg, #00e676, #059669, #064e3b);
  }

  .btn-primary:hover {
    box-shadow: 0 0 24px rgba(0, 230, 118, 0.45);
    transform: translateY(-2px);
  }

  .btn-primary:focus-visible {
    outline: 2px solid #00e676;
    outline-offset: 3px;
  }

  .btn-ghost {
    @apply inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3 font-display text-sm font-semibold tracking-wide transition-all duration-300;
    border-color: var(--island-border);
    background: var(--island);
    color: var(--text);
  }

  .btn-ghost:hover {
    border-color: rgba(0, 230, 118, 0.45);
    box-shadow: 0 0 16px rgba(0, 230, 118, 0.2);
    transform: translateY(-2px);
  }

  .btn-ghost:focus-visible {
    outline: 2px solid #00e676;
    outline-offset: 3px;
  }

  .section-label {
    @apply mb-3 inline-flex items-center font-display text-xs font-semibold uppercase tracking-[0.2em];
    color: #047857;
  }

  .dark .section-label {
    color: #00e676;
  }

  .section-title {
    @apply font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl;
  }

  .icon-box {
    @apply flex h-12 w-12 items-center justify-center rounded-xl;
    background: linear-gradient(
      135deg,
      rgba(0, 230, 118, 0.25),
      rgba(5, 150, 105, 0.15)
    );
    color: #047857;
  }

  .dark .icon-box {
    color: #00e676;
  }

  .bg-grid {
    background-image: linear-gradient(var(--grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 64px 64px;
  }

  .orb {
    position: absolute;
    border-radius: 9999px;
    filter: blur(120px);
    opacity: var(--orb-opacity);
    pointer-events: none;
  }

  .mobile-phone {
    box-shadow:
      0 24px 48px rgba(5, 8, 7, 0.18),
      0 0 0 1px rgba(255, 255, 255, 0.06) inset;
  }

  .clay-illustration svg {
    filter: drop-shadow(0 10px 18px rgba(5, 8, 7, 0.2));
  }

  .dark .clay-illustration svg {
    filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.45));
  }
}

@layer utilities {
  @keyframes marquee {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-50%, 0, 0);
    }
  }

  .marquee-track.is-running {
    animation: marquee 28s linear infinite;
    will-change: transform;
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-track.is-running {
      animation: none !important;
    }
  }
}

```

## src/app/icon.svg
```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="8" fill="#050807"/>
  <path d="M8 22V10h3.2l4.2 8.4L19.6 10H22.8v12h-2.6v-7.2L16.4 22h-2.2l-3.8-7.2V22H8z" fill="url(#g)"/>
  <defs>
    <linearGradient id="g" x1="8" y1="10" x2="24" y2="22" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00E676"/>
      <stop offset="1" stop-color="#064E3B"/>
    </linearGradient>
  </defs>
</svg>

```

## src/app/layout.tsx
```
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibfautomate.fr"),
  title: "IBFautomate â€” Agence Web & Automatisation",
  description:
    "Automatisez votre entreprise et gagnez des heures chaque semaine. Sites performants, applications sur mesure et processus sans friction â€” IBFautomate.",
  openGraph: {
    title: "IBFautomate â€” Agence Web & Automatisation",
    description:
      "Automatisez votre entreprise et gagnez des heures chaque semaine. Sites performants et processus sans friction.",
    url: "https://ibfautomate.fr",
    siteName: "IBFautomate",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "IBFautomate â€” Agence Web & Automatisation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IBFautomate â€” Agence Web & Automatisation",
    description:
      "Automatisez votre entreprise et gagnez des heures chaque semaine.",
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ibfautomate-theme-v2");if(t==="dark"){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

```

## src/app/page.tsx
```
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { MobileApp } from "@/components/MobileApp";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { QuoteForm } from "@/components/QuoteForm";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <MobileApp />
        <Process />
        <Testimonials />
        <FAQ />
        <QuoteForm />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}

```

## src/components/FAQ.tsx
```
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { FadeIn } from "./Motion";

const faqs = [
  {
    q: "Vos solutions sont-elles compatibles avec nos outils existants ?",
    a: "Oui. Nous nous branchons sur votre stack actuelle â€” messagerie, tableurs, CRM, facturation, agendas â€” pour automatiser sans tout remplacer. L'objectif est d'amÃ©liorer ce qui fonctionne dÃ©jÃ .",
  },
  {
    q: "Quels sont les dÃ©lais de mise en place ?",
    a: "Cela dÃ©pend du pÃ©rimÃ¨tre. Une automatisation ciblÃ©e peut Ãªtre opÃ©rationnelle en quelques semaines ; un site ou une application plus large se planifie sur un calendrier clair, validÃ© dÃ¨s le cadrage.",
  },
  {
    q: "Faut-il des compÃ©tences techniques en interne ?",
    a: "Non. Nous concevons, dÃ©ployons et formons vos Ã©quipes. Vous bÃ©nÃ©ficiez d'interfaces simples et d'une documentation claire pour piloter au quotidien.",
  },
  {
    q: "Comment gÃ©rez-vous la sÃ©curitÃ© et le RGPD ?",
    a: "La confidentialitÃ© et la conformitÃ© sont intÃ©grÃ©es dÃ¨s la conception : accÃ¨s maÃ®trisÃ©s, donnÃ©es minimisÃ©es, hÃ©bergement adaptÃ© et bonnes pratiques de sÃ©curitÃ© sur chaque livrable.",
  },
  {
    q: "Comment fonctionne la demande de devis ?",
    a: "Vous dÃ©crivez votre besoin via le formulaire. Nous revenons vers vous sous 24h avec des questions de clarification, puis une proposition dÃ©taillÃ©e â€” sans engagement.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section
      id="faq"
      className="relative scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <FadeIn className="mb-12 text-center">
          <p className="section-label">FAQ</p>
          <h2 id="faq-title" className="section-title">
            Questions frÃ©quentes
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Les rÃ©ponses aux points que l&apos;on nous pose le plus souvent.
          </p>
        </FadeIn>

        <ul className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.q}>
                <FadeIn delay={index * 0.05}>
                  <div className="island overflow-hidden">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="font-display text-sm font-semibold sm:text-base">
                        {item.q}
                      </span>
                      <span className="icon-box !h-9 !w-9 shrink-0">
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex"
                        >
                          {isOpen ? (
                            <Minus className="h-4 w-4" aria-hidden />
                          ) : (
                            <Plus className="h-4 w-4" aria-hidden />
                          )}
                        </motion.span>
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={
                            reduce
                              ? { height: "auto", opacity: 1 }
                              : { height: 0, opacity: 0 }
                          }
                          animate={{ height: "auto", opacity: 1 }}
                          exit={
                            reduce
                              ? { height: 0, opacity: 0 }
                              : { height: 0, opacity: 0 }
                          }
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p
                            className="border-t px-5 pb-5 pt-3 text-sm leading-relaxed text-[var(--text-muted)]"
                            style={{ borderColor: "var(--island-border)" }}
                          >
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

```

## src/components/Footer.tsx
```
import { Mail, Phone } from "lucide-react";

const serviceLinks = [
  "DÃ©veloppement d'Applications Web",
  "Automatisation & IA",
  "RÃ©ceptionniste IA",
  "Sites Web Professionnels",
  "Modernisation de site web",
];

const quickLinks = [
  { href: "#services", label: "Services" },
  { href: "#processus", label: "Processus" },
  { href: "#avis", label: "Avis" },
  { href: "#faq", label: "FAQ" },
  { href: "#devis", label: "Demander un devis" },
];

export function Footer() {
  return (
    <footer
      className="relative border-t pb-8 pt-16"
      style={{ borderColor: "var(--island-border)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <a
              href="#top"
              className="font-display flex h-7 items-center text-base font-bold tracking-tight sm:text-lg"
            >
              IBF<span className="text-gradient">automate</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              Agence web & automatisation. Des systÃ¨mes sur mesure pour gagner
              du temps et accÃ©lÃ©rer votre activitÃ©.
            </p>
          </div>

          <div>
            <p className="font-display flex h-7 items-center text-sm font-semibold uppercase tracking-[0.15em]">
              Services
            </p>
            <ul className="mt-4 space-y-2">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#devis"
                    className="text-sm text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display flex h-7 items-center text-sm font-semibold uppercase tracking-[0.15em]">
              Liens rapides
            </p>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display flex h-7 items-center text-sm font-semibold uppercase tracking-[0.15em]">
              Contact
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:IBFautomate@outlook.com"
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)]"
                >
                  <Mail
                    className="h-4 w-4 text-brand-deep dark:text-brand"
                    aria-hidden
                  />
                  IBFautomate@outlook.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33762129949"
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)]"
                >
                  <Phone
                    className="h-4 w-4 text-brand-deep dark:text-brand"
                    aria-hidden
                  />
                  07 62 12 99 49
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-3 border-t pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--island-border)" }}
        >
          <p>Â© 2026 IBFautomate. Tous droits rÃ©servÃ©s.</p>
          <p>
            <a
              href="#devis"
              className="transition-colors duration-300 hover:text-[var(--text)]"
            >
              Mentions lÃ©gales
            </a>
            <span className="mx-2">Â·</span>
            <a
              href="#devis"
              className="transition-colors duration-300 hover:text-[var(--text)]"
            >
              Politique de confidentialitÃ©
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

```

## src/components/Hero.tsx
```
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const TOOLS = [
  "Gmail",
  "Sheets",
  "WhatsApp",
  "Slack",
  "Notion",
  "Stripe",
  "Calendar",
];

function ToolsMarquee() {
  const reduce = useReducedMotion();
  const loop = [...TOOLS, ...TOOLS];

  return (
    <div
      className="relative z-10 mt-14 overflow-hidden border-y py-4"
      style={{ borderColor: "var(--island-border)" }}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--bg)] to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--bg)] to-transparent sm:w-20" />

      <div
        className={`marquee-track flex w-max items-center gap-12 whitespace-nowrap px-4 ${
          reduce ? "" : "is-running"
        }`}
      >
        {loop.map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="inline-flex shrink-0 items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]"
          >
            {tool}
            <span className="h-1 w-1 rounded-full bg-brand/40" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}

function WordReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.3em] inline-block last:mr-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.12 + i * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
      <div
        className="orb left-[-10%] top-20 h-[420px] w-[420px] animate-float"
        style={{
          background:
            "radial-gradient(circle, rgba(0,230,118,0.55), transparent 70%)",
        }}
      />
      <div
        className="orb right-[-5%] top-40 h-[380px] w-[380px] animate-float-alt"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.45), transparent 70%)",
        }}
      />
      <div
        className="orb bottom-10 left-1/3 h-[300px] w-[300px] animate-float"
        style={{
          background:
            "radial-gradient(circle, rgba(6,78,59,0.5), transparent 70%)",
          animationDelay: "-4s",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
          style={{
            borderColor: "var(--island-border)",
            background: "var(--island)",
            color: "#047857",
          }}
        >
          <span className="dark:text-brand">Agence web & automatisation</span>
        </motion.div>

        <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <WordReveal text="Automatisez votre entreprise." />
          <br />
          <span className="text-gradient">
            <WordReveal text="Gagnez des heures chaque semaine." />
          </span>
        </h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          SystÃ¨mes sur mesure, sites performants et processus sans friction â€”
          conÃ§us pour libÃ©rer votre temps et accÃ©lÃ©rer votre croissance.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a href="#devis" className="btn-primary">
            DÃ©marrer
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#services" className="btn-ghost">
            DÃ©couvrir nos services
          </a>
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-[var(--text-muted)]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          Projets livrÃ©s Â· 100 % satisfaction Â· RÃ©ponse sous 24h
        </motion.p>
      </div>

      <ToolsMarquee />
    </section>
  );
}

```

## src/components/MobileApp.tsx
```
"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "./Motion";

const features = [
  {
    title: "iOS & Android",
    description:
      "Applications natives ou cross-platform, pensÃ©es pour une expÃ©rience fluide sur tous les Ã©crans.",
  },
  {
    title: "Design sur mesure",
    description:
      "Interfaces modernes, intuitives et alignÃ©es sur votre identitÃ© visuelle.",
  },
  {
    title: "Connexion & suivi",
    description:
      "Notifications, tableaux de bord et synchronisation avec vos outils mÃ©tier.",
  },
];

function ClayRocket({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse cx="40" cy="72" rx="18" ry="5" fill="rgba(0,0,0,0.12)" />
      <path
        d="M40 8c-8 14-12 28-12 42 0 6 5 10 12 10s12-4 12-10c0-14-4-28-12-42Z"
        fill="url(#clayRocketBody)"
      />
      <circle cx="40" cy="32" r="7" fill="url(#clayRocketWindow)" />
      <path
        d="M28 48 18 58l10 4 6-10Zm24 0 10 10-10 4-6-10Z"
        fill="url(#clayRocketFin)"
      />
      <path
        d="M36 58c0 4 2 8 4 10 2-2 4-6 4-10H36Z"
        fill="url(#clayRocketFlame)"
      />
      <defs>
        <linearGradient id="clayRocketBody" x1="28" y1="8" x2="52" y2="60">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="clayRocketWindow" x1="33" y1="25" x2="47" y2="39">
          <stop stopColor="#a7f3d0" />
          <stop offset="1" stopColor="#6ee7b7" />
        </linearGradient>
        <linearGradient id="clayRocketFin" x1="18" y1="48" x2="62" y2="62">
          <stop stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="clayRocketFlame" x1="36" y1="58" x2="44" y2="68">
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClayChatBubble({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse cx="40" cy="68" rx="20" ry="5" fill="rgba(0,0,0,0.1)" />
      <path
        d="M14 18h52a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10H36l-12 12v-12H14a10 10 0 0 1-10-10V28a10 10 0 0 1 10-10Z"
        fill="url(#clayChatBody)"
      />
      <circle cx="28" cy="39" r="4" fill="#ecfdf5" />
      <circle cx="40" cy="39" r="4" fill="#ecfdf5" />
      <circle cx="52" cy="39" r="4" fill="#ecfdf5" />
      <defs>
        <linearGradient id="clayChatBody" x1="14" y1="18" x2="66" y2="60">
          <stop stopColor="#6ee7b7" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClayBell({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse cx="40" cy="70" rx="16" ry="4" fill="rgba(0,0,0,0.1)" />
      <path
        d="M40 12c-12 0-20 10-20 22v16l-6 8h52l-6-8V34c0-12-8-22-20-22Z"
        fill="url(#clayBellBody)"
      />
      <rect x="34" y="8" width="12" height="8" rx="4" fill="#047857" />
      <circle cx="40" cy="62" r="6" fill="url(#clayBellClapper)" />
      <defs>
        <linearGradient id="clayBellBody" x1="20" y1="12" x2="60" y2="58">
          <stop stopColor="#fcd34d" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="clayBellClapper" x1="34" y1="56" x2="46" y2="68">
          <stop stopColor="#fde68a" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClayCompass({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse cx="40" cy="68" rx="22" ry="5" fill="rgba(0,0,0,0.1)" />
      <circle cx="40" cy="38" r="26" fill="url(#clayCompassRing)" />
      <circle cx="40" cy="38" r="18" fill="url(#clayCompassFace)" />
      <path d="M40 24 44 38 40 52 36 38Z" fill="url(#clayCompassNeedle)" />
      <circle cx="40" cy="38" r="3" fill="#ecfdf5" />
      <defs>
        <linearGradient id="clayCompassRing" x1="14" y1="12" x2="66" y2="64">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="clayCompassFace" x1="22" y1="20" x2="58" y2="56">
          <stop stopColor="#ede9fe" />
          <stop offset="1" stopColor="#c4b5fd" />
        </linearGradient>
        <linearGradient id="clayCompassNeedle" x1="36" y1="24" x2="44" y2="52">
          <stop stopColor="#00e676" />
          <stop offset="1" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClayStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse cx="40" cy="68" rx="18" ry="4" fill="rgba(0,0,0,0.1)" />
      <path
        d="M40 10 46 30l20 2-15 12 5 19-16-10-16 10 5-19-15-12 20-2Z"
        fill="url(#clayStarBody)"
      />
      <defs>
        <linearGradient id="clayStarBody" x1="24" y1="10" x2="56" y2="53">
          <stop stopColor="#f472b6" />
          <stop offset="1" stopColor="#db2777" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PhoneMockup({
  variant,
  className,
}: {
  variant: "dashboard" | "profile";
  className?: string;
}) {
  return (
    <div
      className={`mobile-phone relative overflow-hidden rounded-[2rem] border p-2 shadow-2xl ${className ?? ""}`}
      style={{
        borderColor: "var(--island-border)",
        background: "var(--bg-surface)",
      }}
    >
      <div
        className="relative overflow-hidden rounded-[1.6rem]"
        style={{ background: "linear-gradient(160deg, #0a0f0d 0%, #064e3b 100%)" }}
      >
        <div className="flex items-center justify-between px-4 pb-2 pt-3">
          <span className="text-[10px] font-medium text-white/70">9:41</span>
          <div className="mx-auto h-4 w-16 rounded-full bg-black/40" />
          <span className="text-[10px] font-medium text-white/70">100%</span>
        </div>

        {variant === "dashboard" ? (
          <div className="space-y-3 px-4 pb-6 pt-2">
            <p className="font-display text-sm font-bold text-white">
              Tableau de bord
            </p>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
              <div className="h-2 w-16 rounded-full bg-brand/80" />
              <div className="mt-3 h-16 rounded-xl bg-gradient-to-r from-brand/30 to-emerald-900/40" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/8 p-2">
                <div className="h-8 w-8 rounded-lg bg-brand/40" />
                <div className="mt-2 h-1.5 w-10 rounded-full bg-white/30" />
              </div>
              <div className="rounded-xl bg-white/8 p-2">
                <div className="h-8 w-8 rounded-lg bg-pink-400/40" />
                <div className="mt-2 h-1.5 w-10 rounded-full bg-white/30" />
              </div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 flex-1 rounded-xl bg-white/6"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3 px-4 pb-6 pt-2">
            <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-brand to-emerald-800" />
            <div className="mx-auto h-2 w-20 rounded-full bg-white/40" />
            <div className="mx-auto h-1.5 w-14 rounded-full bg-white/20" />
            <div className="mt-4 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl bg-white/8 p-2"
                >
                  <div className="h-7 w-7 rounded-lg bg-brand/30" />
                  <div className="h-1.5 flex-1 rounded-full bg-white/25" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FloatingClay({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function MobileApp() {
  return (
    <section
      id="application-mobile"
      className="relative scroll-mt-28 overflow-hidden py-20 sm:py-24"
      aria-labelledby="mobile-app-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(0,230,118,0.08), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="section-label">Application mobile</p>
            <h2 id="mobile-app-title" className="section-title">
              Application mobile
            </h2>
            <p className="mt-4 text-[var(--text-muted)]">
              Des applications mobiles performantes, Ã©lÃ©gantes et connectÃ©es Ã 
              votre Ã©cosystÃ¨me â€” pour servir vos clients et vos Ã©quipes partout.
            </p>

            <Stagger className="mt-8 space-y-4">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <article
                    className="island flex gap-4 p-4 sm:p-5"
                  >
                    <div className="icon-box shrink-0">
                      <span className="font-display text-sm font-bold">+</span>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                        {feature.description}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>

            <a href="#devis" className="btn-primary mt-8">
              DÃ©marrer
              <ArrowRight className="h-4 w-4" />
            </a>
          </FadeIn>

          <FadeIn delay={0.15} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="mobile-showcase relative mx-auto aspect-[4/5] max-h-[520px] w-full max-w-[420px]">
              <PhoneMockup
                variant="dashboard"
                className="absolute left-0 top-8 z-20 w-[46%] -rotate-6"
              />
              <PhoneMockup
                variant="profile"
                className="absolute right-0 top-0 z-10 w-[46%] rotate-6"
              />

              <FloatingClay
                className="clay-illustration absolute -left-2 top-0 z-30 w-16 sm:w-20"
                delay={0}
              >
                <ClayRocket />
              </FloatingClay>
              <FloatingClay
                className="clay-illustration absolute -right-1 top-16 z-30 w-14 sm:w-[4.5rem]"
                delay={0.5}
              >
                <ClayBell />
              </FloatingClay>
              <FloatingClay
                className="clay-illustration absolute bottom-32 -left-4 z-30 w-14 sm:w-16"
                delay={1}
              >
                <ClayChatBubble />
              </FloatingClay>
              <FloatingClay
                className="clay-illustration absolute bottom-20 right-0 z-30 w-14 sm:w-[4.5rem]"
                delay={1.5}
              >
                <ClayCompass />
              </FloatingClay>
              <FloatingClay
                className="clay-illustration absolute bottom-4 left-1/3 z-30 w-12 sm:w-14"
                delay={0.8}
              >
                <ClayStar />
              </FloatingClay>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

```

## src/components/Motion.tsx
```
"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 30,
}: FadeInProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function Stagger({ children, className, stagger = 0.08 }: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

```

## src/components/Navbar.tsx
```
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#services", label: "Services" },
  { href: "#processus", label: "Processus" },
  { href: "#avis", label: "Avis" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav
          className={`island mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 transition-shadow duration-300 sm:px-5 ${
            scrolled ? "shadow-glow-brand-sm" : ""
          }`}
          aria-label="Navigation principale"
        >
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight sm:text-xl"
            onClick={close}
          >
            IBF
            <span className="text-gradient">automate</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <a href="#devis" className="btn-primary hidden sm:inline-flex">
              Demander un devis
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border lg:hidden"
              style={{
                borderColor: "var(--island-border)",
                background: "var(--island)",
              }}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-[var(--bg)] lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-1 flex-col justify-center gap-2 px-6 pb-10 pt-28">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="font-display text-3xl font-bold uppercase tracking-tight"
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#devis"
                onClick={close}
                className="btn-primary mt-8 w-full"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
              >
                Demander un devis
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

```

## src/components/Process.tsx
```
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "./Motion";

const steps = [
  {
    num: "01",
    title: "Audit & Cadrage",
    description:
      "Nous cartographions vos process, outils et objectifs pour dÃ©finir un plan d'action clair et priorisÃ©.",
  },
  {
    num: "02",
    title: "Conception & Design",
    description:
      "Architecture, parcours et interfaces : une maquette prÃ©cise avant la moindre ligne de code.",
  },
  {
    num: "03",
    title: "DÃ©veloppement",
    description:
      "Construction itÃ©rative, livraisons rÃ©guliÃ¨res et transparence totale sur l'avancement.",
  },
  {
    num: "04",
    title: "Tests & Optimisation",
    description:
      "Validation performance, accessibilitÃ© et cas limites pour une mise en production sereine.",
  },
  {
    num: "05",
    title: "Livraison & Suivi",
    description:
      "Formation, documentation et accompagnement pour que vos Ã©quipes prennent le relais en confiance.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 40%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="processus"
      className="relative scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="process-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="section-label">Notre processus</p>
          <h2 id="process-title" className="section-title">
            De l&apos;idÃ©e Ã  la livraison
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Une mÃ©thode Ã©prouvÃ©e en cinq Ã©tapes pour livrer vite, bien, et sans
            surprise.
          </p>
        </FadeIn>

        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          <div
            className="absolute bottom-4 left-[27px] top-4 w-px sm:left-[31px]"
            style={{ background: "var(--island-border)" }}
            aria-hidden
          />
          <motion.div
            className="absolute left-[27px] top-4 w-px origin-top sm:left-[31px]"
            style={{
              height: reduce ? "100%" : height,
              backgroundImage:
                "linear-gradient(180deg, #00E676, #059669, #064E3B)",
            }}
            aria-hidden
          />

          <Stagger className="relative space-y-5" stagger={0.1}>
            {steps.map((step) => (
              <StaggerItem key={step.num}>
                <article className="island island-hover relative flex gap-5 p-5 sm:gap-6 sm:p-6">
                  <div
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-[var(--bg)] sm:h-16 sm:w-16"
                    style={{ borderColor: "var(--island-border)" }}
                  >
                    <span className="text-gradient font-display text-xl font-bold sm:text-2xl">
                      {step.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {step.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

```

## src/components/QuoteForm.tsx
```
"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "./Motion";

const subjects = [
  "DÃ©veloppement d'Applications Web",
  "Automatisation & IA",
  "RÃ©ceptionniste IA",
  "Sites Web Professionnels",
  "Modernisation de site web",
  "Autre",
];

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const reduce = useReducedMotion();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="devis"
      className="relative scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="devis-title"
    >
      <div
        className="orb right-[10%] top-20 h-[360px] w-[360px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,230,118,0.35), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="section-label">Devis</p>
          <h2 id="devis-title" className="section-title">
            Parlons de votre projet
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            DÃ©crivez votre besoin : nous revenons vers vous sous 24 heures avec
            une proposition adaptÃ©e.
          </p>
        </FadeIn>

        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <FadeIn className="h-full">
            <div className="flex h-full flex-col justify-between gap-5">
              <a
                href="mailto:IBFautomate@outlook.com"
                className="island island-hover flex flex-1 items-center gap-4 p-5"
              >
                <span className="icon-box">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Email
                  </p>
                  <p className="font-display font-semibold">
                    IBFautomate@outlook.com
                  </p>
                </div>
              </a>
              <a
                href="tel:+33762129949"
                className="island island-hover flex flex-1 items-center gap-4 p-5"
              >
                <span className="icon-box">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    TÃ©lÃ©phone
                  </p>
                  <p className="font-display font-semibold">07 62 12 99 49</p>
                </div>
              </a>
              <div className="island flex flex-1 items-center gap-4 p-5">
                <span className="icon-box">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    DÃ©lai
                  </p>
                  <p className="font-display font-semibold">RÃ©ponse sous 24h</p>
                </div>
              </div>
              <div className="island flex flex-1 items-center gap-4 p-5">
                <span className="icon-box">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Zone
                  </p>
                  <p className="font-display font-semibold">France entiÃ¨re</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="h-full">
            <div className="island flex h-full flex-col p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-1 flex-col items-center justify-center py-12 text-center"
                    initial={
                      reduce ? { opacity: 1 } : { opacity: 0, scale: 0.92 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <span className="icon-box mb-4 !h-16 !w-16">
                      <CheckCircle2 className="h-8 w-8" aria-hidden />
                    </span>
                    <p className="font-display text-2xl font-bold">
                      Demande envoyÃ©e
                    </p>
                    <p className="mt-2 max-w-sm text-sm text-[var(--text-muted)]">
                      Merci. Nous avons bien reÃ§u votre message et vous
                      rÃ©pondrons sous 24 heures.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    className="flex h-full flex-col justify-between gap-4"
                    initial={false}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Nom complet{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Email{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        TÃ©lÃ©phone{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Sujet{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        defaultValue=""
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand"
                        style={{
                          borderColor: "var(--island-border)",
                          color: "var(--text)",
                        }}
                      >
                        <option value="" disabled>
                          SÃ©lectionnez un sujet
                        </option>
                        {subjects.map((s) => (
                          <option
                            key={s}
                            value={s}
                            className="bg-[var(--bg)] text-[var(--text)]"
                          >
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Message{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full resize-y rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Envoyer ma demande de devis â†’
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

```

## src/components/Services.tsx
```
"use client";

import {
  AppWindow,
  ArrowRight,
  Globe,
  PhoneCall,
  RefreshCcw,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Motion";

type Service = {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "DÃ©veloppement d'Applications Web",
    description:
      "Des applications fluides et sÃ©curisÃ©es qui centralisent vos opÃ©rations et simplifient le quotidien de vos Ã©quipes.",
    tags: ["Next.js", "API", "Sur mesure"],
    icon: AppWindow,
  },
  {
    title: "Automatisation & IA",
    description:
      "Reliez vos outils, Ã©liminez les saisies manuelles et laissez vos processus tourner en continu sans surveillance.",
    tags: ["n8n", "Zapier", "Workflows"],
    icon: Workflow,
  },
  {
    title: "RÃ©ceptionniste IA",
    description:
      "Un accueil tÃ©lÃ©phonique disponible 24h/24 qui qualifie les appels, prend les rendez-vous et ne laisse aucun prospect en attente.",
    tags: ["Voix", "CRM", "24/7"],
    icon: PhoneCall,
  },
  {
    title: "Sites Web Professionnels",
    description:
      "Une prÃ©sence en ligne claire, rapide et orientÃ©e conversion, conÃ§ue pour inspirer confiance dÃ¨s la premiÃ¨re seconde.",
    tags: ["SEO", "Responsive", "Performance"],
    icon: Globe,
  },
  {
    title: "Modernisation de site web",
    description:
      "Remettez votre site Ã  niveau : design actuel, vitesse amÃ©liorÃ©e et parcours utilisateur pensÃ© pour convertir.",
    tags: ["Refonte", "UX", "Migration"],
    icon: RefreshCcw,
  },
];

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="island island-hover flex h-full flex-col p-6 sm:p-7">
      <div className="flex flex-1 flex-col items-center text-center">
        <div className="icon-box mb-5">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="font-display text-xl font-bold tracking-tight">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
          {service.description}
        </p>
        <ul className="mt-5 flex flex-wrap justify-center gap-2">
          {service.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-lg border px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]"
              style={{ borderColor: "var(--island-border)" }}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <a
        href="#devis"
        className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-brand-deep transition-all duration-300 hover:gap-3 dark:text-brand"
      >
        DÃ©marrer
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </article>
  );
}

export function Services() {
  const top = services.slice(0, 3);
  const bottom = services.slice(3);

  return (
    <section
      id="services"
      className="relative scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="section-label">Nos services</p>
          <h2 id="services-title" className="section-title">
            Ce que nous construisons
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Cinq expertises complÃ©mentaires pour digitaliser, automatiser et
            accÃ©lÃ©rer votre activitÃ©.
          </p>
        </FadeIn>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger
          className="mt-5 grid gap-5 sm:grid-cols-2 lg:mx-auto lg:max-w-[calc(66.666%-0.625rem)]"
          stagger={0.08}
        >
          {bottom.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

```

## src/components/Stats.tsx
```
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "./Motion";

const stats = [
  {
    value: 40,
    suffix: " %",
    label: "du temps de travail = tÃ¢ches rÃ©pÃ©titives",
  },
  {
    value: 10,
    suffix: "h",
    label: "par semaine perdues en opÃ©rations manuelles",
  },
  {
    value: null as number | null,
    suffix: "",
    label: "de productivitÃ© envolÃ©s chaque annÃ©e",
    staticValue: "Des milliers â‚¬",
  },
];

function AnimatedNumber({
  value,
  suffix,
  staticValue,
}: {
  value: number | null;
  suffix: string;
  staticValue?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value === null) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduce]);

  return (
    <span
      ref={ref}
      className={`text-gradient font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${
        staticValue ? "block text-left leading-[1.1]" : ""
      }`}
    >
      {staticValue ? (
        <>
          Des
          <br />
          milliers&nbsp;â‚¬
        </>
      ) : (
        `${display}${suffix}`
      )}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-20 sm:py-24" aria-labelledby="stats-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="section-label">Le constat</p>
          <h2 id="stats-title" className="section-title">
            Le coÃ»t invisible du manuel
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Chaque jour, des heures s&apos;Ã©vaporent dans des tÃ¢ches qui
            pourraient tourner toutes seules.
          </p>
        </FadeIn>

        <Stagger className="grid gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <article className="island island-hover flex h-full flex-col items-center gap-4 p-6 text-center sm:p-8">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  staticValue={stat.staticValue}
                />
                <p className="text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                  {stat.label}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

```

## src/components/Testimonials.tsx
```
"use client";

import { Star } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Motion";

const reviews = [
  {
    name: "Thomas M.",
    initials: "TM",
    text: "Les dÃ©lais annoncÃ©s ont Ã©tÃ© tenus Ã  la lettre. Nos Ã©quipes ont gagnÃ© plusieurs heures par semaine dÃ¨s la premiÃ¨re livraison.",
  },
  {
    name: "Sophie L.",
    initials: "SL",
    text: "Un accompagnement trÃ¨s professionnel du brief Ã  la mise en ligne. La communication Ã©tait claire et les livrables impeccables.",
  },
  {
    name: "Rachid B.",
    initials: "RB",
    text: "La refonte a transformÃ© notre image en ligne. Le site est plus rapide, plus clair, et nos demandes entrantes ont nettement augmentÃ©.",
  },
  {
    name: "Marie C.",
    initials: "MC",
    text: "L'accueil tÃ©lÃ©phonique automatisÃ© a changÃ© notre quotidien. Plus d'appels manquÃ©s, et les rendez-vous sont qualifiÃ©s avant mÃªme que l'on rappelle.",
  },
  {
    name: "Julien D.",
    initials: "JD",
    text: "On a enfin connectÃ© nos outils entre eux. Moins d'erreurs de saisie, plus de temps pour le commercial. Exactement ce dont on avait besoin.",
  },
  {
    name: "Kamel B.",
    initials: "KB",
    text: "Ã‰coute, rigueur et rÃ©sultats. Le projet a Ã©tÃ© menÃ© avec une vraie exigence de qualitÃ©, sans jargon inutile ni mauvaises surprises.",
  },
];

export function Testimonials() {
  return (
    <section
      id="avis"
      className="relative scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="avis-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="section-label">Avis clients</p>
          <h2 id="avis-title" className="section-title">
            Ils nous font confiance
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Des retours concrets sur la qualitÃ© d&apos;exÃ©cution et le gain de
            temps au quotidien.
          </p>
        </FadeIn>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <StaggerItem key={review.name}>
              <article className="island island-hover flex h-full flex-col p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-bold text-night"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #00E676, #059669, #064E3B)",
                    }}
                    aria-hidden
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-display font-semibold">{review.name}</p>
                    <div
                      className="mt-0.5 flex gap-0.5"
                      aria-label="5 Ã©toiles sur 5"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-brand text-brand"
                          aria-hidden
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  {review.text}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

```

## src/components/ThemeProvider.tsx
```
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="ibfautomate-theme-v2"
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}

```

## src/components/ThemeToggle.tsx
```
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Passer en mode jour" : "Passer en mode nuit"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 hover:shadow-glow-brand-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      style={{
        borderColor: "var(--island-border)",
        background: "var(--island)",
      }}
    >
      {!mounted ? (
        <span className="h-5 w-5" />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "sun" : "moon"}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-brand-deep dark:text-brand"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}

```

## src/components/WhatsAppWidget.tsx
```
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

/** NumÃ©ro WhatsApp (modifiable) */
const WHATSAPP_NUMBER = "0762129949";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const BUBBLE_KEY = "ibf-wa-bubble-dismissed";
const WIDGET_KEY = "ibf-wa-widget-dismissed";

export function WhatsAppWidget() {
  const [showBubble, setShowBubble] = useState(false);
  const [showWidget, setShowWidget] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(WIDGET_KEY) === "1") {
      setShowWidget(false);
      return;
    }
    if (sessionStorage.getItem(BUBBLE_KEY) === "1") return;

    const timer = window.setTimeout(() => setShowBubble(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissBubble = () => {
    setShowBubble(false);
    sessionStorage.setItem(BUBBLE_KEY, "1");
  };

  const dismissWidget = () => {
    setShowBubble(false);
    setShowWidget(false);
    sessionStorage.setItem(WIDGET_KEY, "1");
    sessionStorage.setItem(BUBBLE_KEY, "1");
  };

  const openChat = () => {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  if (!showWidget) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            role="dialog"
            aria-label="Contact WhatsApp"
            className="island relative w-[min(100vw-2.5rem,300px)] p-4 pr-10 shadow-glow-brand-sm"
            initial={
              reduce ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }
            }
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <button
              type="button"
              aria-label="Fermer le message"
              onClick={dismissBubble}
              className="absolute right-2 top-2 rounded-md p-1 text-[var(--text-muted)] transition-colors hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="mb-3 text-sm leading-relaxed text-[var(--text-muted)]">
              Une question ? RÃ©ponse rapide sur WhatsApp
            </p>
            <button
              type="button"
              onClick={openChat}
              className="btn-primary w-full text-sm"
            >
              Discuter
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-brand/40 animate-pulse-ring"
        />
        <button
          type="button"
          onClick={openChat}
          aria-label="Ouvrir WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full text-night shadow-glow-brand transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #00E676, #059669, #064E3B)",
          }}
        >
          <MessageCircle className="h-7 w-7" strokeWidth={2.2} />
        </button>

        <AnimatePresence>
          {hovered && (
            <motion.button
              type="button"
              aria-label="Masquer le widget WhatsApp"
              onClick={(e) => {
                e.stopPropagation();
                dismissWidget();
              }}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-[var(--bg-surface)] text-[var(--text)] shadow-md"
              style={{ borderColor: "var(--island-border)" }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-3.5 w-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

```

