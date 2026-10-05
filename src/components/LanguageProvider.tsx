"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "fr" | "en";

const translations = {
  fr: {
    nav: {
      services: "Services",
      process: "Processus",
      reviews: "Avis",
      faq: "FAQ",
      quote: "Demander un devis",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      aria: "Navigation principale",
    },
    lang: {
      switchToEn: "Passer en anglais",
      switchToFr: "Passer en français",
    },
    theme: {
      toLight: "Passer en mode jour",
      toDark: "Passer en mode nuit",
    },
    hero: {
      badge: "Agence web & automatisation",
      title1: "Automatisez votre entreprise.",
      title2: "Gagnez des heures chaque semaine.",
      subtitle:
        "Systèmes sur mesure, sites performants et processus sans friction — conçus pour libérer votre temps et accélérer votre croissance.",
      cta: "Démarrer",
      secondary: "Découvrir nos services",
      trust: "Projets livrés · 100 % satisfaction · Réponse sous 24h",
    },
    stats: {
      label: "Le constat",
      title: "Le coût invisible du manuel",
      subtitle:
        "Chaque jour, des heures s'évaporent dans des tâches qui pourraient tourner toutes seules.",
      items: [
        {
          label: "du temps de travail = tâches répétitives",
        },
        {
          label: "par semaine perdues en opérations manuelles",
        },
        {
          label: "de productivité envolés chaque année",
          staticValue: "Des milliers €",
        },
      ],
    },
    services: {
      label: "Nos services",
      title: "Ce que nous construisons",
      subtitle:
        "Cinq expertises complémentaires pour digitaliser, automatiser et accélérer votre activité.",
      cta: "Démarrer",
      items: [
        {
          title: "Développement d'Applications Web",
          description:
            "Des applications fluides et sécurisées qui centralisent vos opérations et simplifient le quotidien de vos équipes.",
          tags: ["Next.js", "API", "Sur mesure"],
        },
        {
          title: "Automatisation & IA",
          description:
            "Reliez vos outils, éliminez les saisies manuelles et laissez vos processus tourner en continu sans surveillance.",
          tags: ["n8n", "Zapier", "Workflows"],
        },
        {
          title: "Réceptionniste IA",
          description:
            "Un accueil téléphonique disponible 24h/24 qui qualifie les appels, prend les rendez-vous et ne laisse aucun prospect en attente.",
          tags: ["Voix", "CRM", "24/7"],
        },
        {
          title: "Sites Web Professionnels",
          description:
            "Une présence en ligne claire, rapide et orientée conversion, conçue pour inspirer confiance dès la première seconde.",
          tags: ["SEO", "Responsive", "Performance"],
        },
        {
          title: "Modernisation de site web",
          description:
            "Remettez votre site à niveau : design actuel, vitesse améliorée et parcours utilisateur pensé pour convertir.",
          tags: ["Refonte", "UX", "Migration"],
        },
      ],
    },
    mobile: {
      label: "Application mobile",
      title: "Application mobile",
      subtitle:
        "Des applications mobiles performantes, élégantes et connectées à votre écosystème — pour servir vos clients et vos équipes partout.",
      cta: "Démarrer",
      features: [
        {
          title: "iOS & Android",
          description:
            "Applications natives ou cross-platform, pensées pour une expérience fluide sur tous les écrans.",
        },
        {
          title: "Design sur mesure",
          description:
            "Interfaces modernes, intuitives et alignées sur votre identité visuelle.",
        },
        {
          title: "Connexion & suivi",
          description:
            "Notifications, tableaux de bord et synchronisation avec vos outils métier.",
        },
      ],
      dashboard: "Tableau de bord",
    },
    boost: {
      badgeLeft: "Créneaux disponibles ce mois-ci",
      badgeRight: "100 % satisfaction · Réponse sous 24h",
      title: "Prêt à faire évoluer votre projet ?",
      subtitle:
        "Au-delà du code, nous concevons des systèmes pensés pour votre croissance : web, mobile et automatisation, livrés avec rigueur. Échangeons sur votre besoin — on accélère le vôtre.",
      cta: "Réserver un échange",
      automations: "Automatisations actives",
      performance: "Performance globale",
      leads: "Leads qualifiés",
      hours: "Heures gagnées",
      tasks: "Tâches automatisées",
    },
    process: {
      label: "Notre processus",
      title: "De l'idée à la livraison",
      subtitle:
        "Une méthode éprouvée en cinq étapes pour livrer vite, bien, et sans surprise.",
      steps: [
        {
          num: "01",
          title: "Audit & Cadrage",
          description:
            "Nous cartographions vos process, outils et objectifs pour définir un plan d'action clair et priorisé.",
        },
        {
          num: "02",
          title: "Conception & Design",
          description:
            "Architecture, parcours et interfaces : une maquette précise avant la moindre ligne de code.",
        },
        {
          num: "03",
          title: "Développement",
          description:
            "Construction itérative, livraisons régulières et transparence totale sur l'avancement.",
        },
        {
          num: "04",
          title: "Tests & Optimisation",
          description:
            "Validation performance, accessibilité et cas limites pour une mise en production sereine.",
        },
        {
          num: "05",
          title: "Livraison & Suivi",
          description:
            "Formation, documentation et accompagnement pour que vos équipes prennent le relais en confiance.",
        },
      ],
    },
    reviews: {
      label: "Avis clients",
      title: "Ils nous font confiance",
      subtitle:
        "Des retours concrets sur la qualité d'exécution et le gain de temps au quotidien.",
      items: [
        {
          name: "Thomas M.",
          initials: "TM",
          text: "Les délais annoncés ont été tenus à la lettre. Nos équipes ont gagné plusieurs heures par semaine dès la première livraison.",
        },
        {
          name: "Sophie L.",
          initials: "SL",
          text: "Un accompagnement très professionnel du brief à la mise en ligne. La communication était claire et les livrables impeccables.",
        },
        {
          name: "Rachid B.",
          initials: "RB",
          text: "La refonte a transformé notre image en ligne. Le site est plus rapide, plus clair, et nos demandes entrantes ont nettement augmenté.",
        },
        {
          name: "Marie C.",
          initials: "MC",
          text: "L'accueil téléphonique automatisé a changé notre quotidien. Plus d'appels manqués, et les rendez-vous sont qualifiés avant même que l'on rappelle.",
        },
        {
          name: "Julien D.",
          initials: "JD",
          text: "On a enfin connecté nos outils entre eux. Moins d'erreurs de saisie, plus de temps pour le commercial. Exactement ce dont on avait besoin.",
        },
        {
          name: "Kamel B.",
          initials: "KB",
          text: "Écoute, rigueur et résultats. Le projet a été mené avec une vraie exigence de qualité, sans jargon inutile ni mauvaises surprises.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Questions fréquentes",
      subtitle: "Les réponses aux points que l'on nous pose le plus souvent.",
      items: [
        {
          q: "Vos solutions sont-elles compatibles avec nos outils existants ?",
          a: "Oui. Nous nous branchons sur votre stack actuelle — messagerie, tableurs, CRM, facturation, agendas — pour automatiser sans tout remplacer. L'objectif est d'améliorer ce qui fonctionne déjà.",
        },
        {
          q: "Quels sont les délais de mise en place ?",
          a: "Cela dépend du périmètre. Une automatisation ciblée peut être opérationnelle en quelques semaines ; un site ou une application plus large se planifie sur un calendrier clair, validé dès le cadrage.",
        },
        {
          q: "Faut-il des compétences techniques en interne ?",
          a: "Non. Nous concevons, déployons et formons vos équipes. Vous bénéficiez d'interfaces simples et d'une documentation claire pour piloter au quotidien.",
        },
        {
          q: "Comment gérez-vous la sécurité et le RGPD ?",
          a: "La confidentialité et la conformité sont intégrées dès la conception : accès maîtrisés, données minimisées, hébergement adapté et bonnes pratiques de sécurité sur chaque livrable.",
        },
        {
          q: "Comment fonctionne la demande de devis ?",
          a: "Vous décrivez votre besoin via le formulaire. Nous revenons vers vous sous 24h avec des questions de clarification, puis une proposition détaillée — sans engagement.",
        },
      ],
    },
    quote: {
      label: "Devis",
      title: "Parlons de votre projet",
      subtitle:
        "Décrivez votre besoin : nous revenons vers vous sous 24 heures avec une proposition adaptée.",
      email: "Email",
      phone: "Téléphone",
      delay: "Délai",
      delayValue: "Réponse sous 24h",
      zone: "Zone",
      zoneValue: "France entière",
      name: "Nom complet",
      subject: "Sujet",
      message: "Message",
      selectSubject: "Sélectionnez un sujet",
      subjects: [
        "Développement d'Applications Web",
        "Automatisation & IA",
        "Réceptionniste IA",
        "Sites Web Professionnels",
        "Modernisation de site web",
        "Autre",
      ],
      submit: "Envoyer ma demande de devis →",
      successTitle: "Demande envoyée",
      successText:
        "Merci. Nous avons bien reçu votre message et vous répondrons sous 24 heures.",
    },
    footer: {
      blurb:
        "Agence web & automatisation. Des systèmes sur mesure pour gagner du temps et accélérer votre activité.",
      services: "Services",
      quick: "Liens rapides",
      contact: "Contact",
      rights: "© 2026 IBFautomate. Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      quote: "Demander un devis",
    },
    whatsapp: {
      bubble: "Une question ? Réponse rapide sur WhatsApp",
      chat: "Discuter",
      close: "Fermer le message",
      open: "Ouvrir WhatsApp",
      hide: "Masquer le widget WhatsApp",
    },
    video: {
      back: "Retour à l'accueil",
      rotateHint: "Tournez votre téléphone pour regarder la vidéo",
      iframeTitle: "Vidéo de présentation IBFautomate",
      heroLabel: "Vidéo de présentation IBFautomate",
    },
  },
  en: {
    nav: {
      services: "Services",
      process: "Process",
      reviews: "Reviews",
      faq: "FAQ",
      quote: "Request a quote",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      aria: "Main navigation",
    },
    lang: {
      switchToEn: "Switch to English",
      switchToFr: "Switch to French",
    },
    theme: {
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
    },
    hero: {
      badge: "Web agency & automation",
      title1: "Automate your business.",
      title2: "Save hours every week.",
      subtitle:
        "Custom systems, high-performing websites, and frictionless processes — built to free your time and accelerate growth.",
      cta: "Get started",
      secondary: "Explore our services",
      trust: "Projects delivered · 100% satisfaction · Reply within 24h",
    },
    stats: {
      label: "The reality",
      title: "The hidden cost of manual work",
      subtitle:
        "Every day, hours disappear into tasks that could run on their own.",
      items: [
        {
          label: "of work time = repetitive tasks",
        },
        {
          label: "per week lost to manual operations",
        },
        {
          label: "in lost productivity every year",
          staticValue: "Thousands €",
        },
      ],
    },
    services: {
      label: "Our services",
      title: "What we build",
      subtitle:
        "Five complementary expertise areas to digitize, automate, and accelerate your business.",
      cta: "Get started",
      items: [
        {
          title: "Web Application Development",
          description:
            "Fluid, secure applications that centralize your operations and simplify your team's daily work.",
          tags: ["Next.js", "API", "Custom"],
        },
        {
          title: "Automation & AI",
          description:
            "Connect your tools, eliminate manual entry, and let your processes run continuously without supervision.",
          tags: ["n8n", "Zapier", "Workflows"],
        },
        {
          title: "AI Receptionist",
          description:
            "24/7 phone reception that qualifies calls, books appointments, and never leaves a lead waiting.",
          tags: ["Voice", "CRM", "24/7"],
        },
        {
          title: "Professional Websites",
          description:
            "A clear, fast, conversion-focused online presence designed to inspire trust from the first second.",
          tags: ["SEO", "Responsive", "Performance"],
        },
        {
          title: "Website modernization",
          description:
            "Bring your site up to date: modern design, better speed, and a user journey built to convert.",
          tags: ["Redesign", "UX", "Migration"],
        },
      ],
    },
    mobile: {
      label: "Mobile app",
      title: "Mobile app",
      subtitle:
        "High-performing, elegant mobile apps connected to your ecosystem — for your clients and teams, everywhere.",
      cta: "Get started",
      features: [
        {
          title: "iOS & Android",
          description:
            "Native or cross-platform apps designed for a smooth experience on every screen.",
        },
        {
          title: "Custom design",
          description:
            "Modern, intuitive interfaces aligned with your brand identity.",
        },
        {
          title: "Connected & tracked",
          description:
            "Notifications, dashboards, and sync with your business tools.",
        },
      ],
      dashboard: "Dashboard",
    },
    boost: {
      badgeLeft: "Slots available this month",
      badgeRight: "100% satisfaction · Reply within 24h",
      title: "Ready to take your project further?",
      subtitle:
        "Beyond code, we design systems built for growth: web, mobile, and automation, delivered with rigor. Let's talk about your needs — we'll accelerate yours.",
      cta: "Book a call",
      automations: "Active automations",
      performance: "Overall performance",
      leads: "Qualified leads",
      hours: "Hours saved",
      tasks: "Automated tasks",
    },
    process: {
      label: "Our process",
      title: "From idea to delivery",
      subtitle:
        "A proven five-step method to deliver fast, well, and without surprises.",
      steps: [
        {
          num: "01",
          title: "Audit & Scoping",
          description:
            "We map your processes, tools, and goals to define a clear, prioritized action plan.",
        },
        {
          num: "02",
          title: "Design & UX",
          description:
            "Architecture, journeys, and interfaces: a precise mockup before a single line of code.",
        },
        {
          num: "03",
          title: "Development",
          description:
            "Iterative build, regular deliveries, and full transparency on progress.",
        },
        {
          num: "04",
          title: "Testing & Optimization",
          description:
            "Performance, accessibility, and edge-case validation for a smooth go-live.",
        },
        {
          num: "05",
          title: "Delivery & Support",
          description:
            "Training, documentation, and guidance so your teams take over with confidence.",
        },
      ],
    },
    reviews: {
      label: "Client reviews",
      title: "They trust us",
      subtitle:
        "Concrete feedback on delivery quality and time saved every day.",
      items: [
        {
          name: "Thomas M.",
          initials: "TM",
          text: "Deadlines were met exactly as promised. Our teams saved several hours a week from the very first delivery.",
        },
        {
          name: "Sophie L.",
          initials: "SL",
          text: "Highly professional support from brief to launch. Clear communication and flawless deliverables.",
        },
        {
          name: "Rachid B.",
          initials: "RB",
          text: "The redesign transformed our online image. The site is faster, clearer, and inbound requests have clearly increased.",
        },
        {
          name: "Marie C.",
          initials: "MC",
          text: "Automated phone reception changed our daily work. No more missed calls, and appointments are qualified before we even call back.",
        },
        {
          name: "Julien D.",
          initials: "JD",
          text: "We finally connected our tools. Fewer input errors, more time for sales. Exactly what we needed.",
        },
        {
          name: "Kamel B.",
          initials: "KB",
          text: "Listening, rigor, and results. The project was run with real quality standards — no useless jargon, no bad surprises.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Frequently asked questions",
      subtitle: "Answers to the points we get asked most often.",
      items: [
        {
          q: "Are your solutions compatible with our existing tools?",
          a: "Yes. We plug into your current stack — messaging, spreadsheets, CRM, billing, calendars — to automate without replacing everything. The goal is to improve what already works.",
        },
        {
          q: "What are the implementation timelines?",
          a: "It depends on the scope. A focused automation can be live in a few weeks; a larger site or app is planned on a clear calendar, validated from the start.",
        },
        {
          q: "Do we need technical skills in-house?",
          a: "No. We design, deploy, and train your teams. You get simple interfaces and clear documentation to run things day to day.",
        },
        {
          q: "How do you handle security and GDPR?",
          a: "Privacy and compliance are built in from the start: controlled access, minimized data, suitable hosting, and security best practices on every deliverable.",
        },
        {
          q: "How does the quote request work?",
          a: "You describe your need via the form. We get back to you within 24h with clarifying questions, then a detailed proposal — with no obligation.",
        },
      ],
    },
    quote: {
      label: "Quote",
      title: "Let's talk about your project",
      subtitle:
        "Describe your need: we get back to you within 24 hours with a tailored proposal.",
      email: "Email",
      phone: "Phone",
      delay: "Timeline",
      delayValue: "Reply within 24h",
      zone: "Area",
      zoneValue: "All of France",
      name: "Full name",
      subject: "Subject",
      message: "Message",
      selectSubject: "Select a subject",
      subjects: [
        "Web Application Development",
        "Automation & AI",
        "AI Receptionist",
        "Professional Websites",
        "Website modernization",
        "Other",
      ],
      submit: "Send my quote request →",
      successTitle: "Request sent",
      successText:
        "Thank you. We've received your message and will reply within 24 hours.",
    },
    footer: {
      blurb:
        "Web agency & automation. Custom systems to save time and accelerate your business.",
      services: "Services",
      quick: "Quick links",
      contact: "Contact",
      rights: "© 2026 IBFautomate. All rights reserved.",
      legal: "Legal notice",
      privacy: "Privacy policy",
      quote: "Request a quote",
    },
    whatsapp: {
      bubble: "Got a question? Quick reply on WhatsApp",
      chat: "Chat",
      close: "Close message",
      open: "Open WhatsApp",
      hide: "Hide WhatsApp widget",
    },
    video: {
      back: "Back to home",
      rotateHint: "Turn your phone sideways to watch the video",
      iframeTitle: "IBFautomate presentation video",
      heroLabel: "IBFautomate presentation video",
    },
  },
} as const;

export type Dictionary = (typeof translations)["fr"];

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "ibfautomate-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
  }, [locale, mounted]);

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
    window.location.reload();
  }, []);

  const toggleLocale = useCallback(() => {
    const next: Locale = locale === "fr" ? "en" : "fr";
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
    window.location.reload();
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      t: translations[locale] as Dictionary,
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
