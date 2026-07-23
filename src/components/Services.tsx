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
import { useLanguage } from "./LanguageProvider";

const serviceIcons: LucideIcon[] = [
  AppWindow,
  Workflow,
  PhoneCall,
  Globe,
  RefreshCcw,
];

function ServiceCard({
  title,
  description,
  tags,
  icon: Icon,
  cta,
}: {
  title: string;
  description: string;
  tags: readonly string[];
  icon: LucideIcon;
  cta: string;
}) {
  return (
    <article className="island island-hover flex h-full flex-col p-6 sm:p-7">
      <div className="flex flex-1 flex-col items-center text-center">
        <div className="icon-box mb-5">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="font-display text-xl font-bold tracking-tight">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
          {description}
        </p>
        <ul className="mt-5 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
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
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </article>
  );
}

export function Services() {
  const { t } = useLanguage();

  const services = t.services.items.map((item, index) => ({
    ...item,
    icon: serviceIcons[index],
  }));

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
          <p className="section-label">{t.services.label}</p>
          <h2 id="services-title" className="section-title">
            {t.services.title}
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">{t.services.subtitle}</p>
        </FadeIn>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard
                title={service.title}
                description={service.description}
                tags={service.tags}
                icon={service.icon}
                cta={t.services.cta}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger
          className="mt-5 grid gap-5 sm:grid-cols-2 lg:mx-auto lg:max-w-[calc(66.666%-0.625rem)]"
          stagger={0.08}
        >
          {bottom.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard
                title={service.title}
                description={service.description}
                tags={service.tags}
                icon={service.icon}
                cta={t.services.cta}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
