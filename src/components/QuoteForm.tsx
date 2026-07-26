"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "./Motion";
import { useLanguage } from "./LanguageProvider";
import { isEuropeanPhoneNumber } from "@/lib/phone";

export function QuoteForm() {
  const { t, locale } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageLength, setMessageLength] = useState(0);
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneTried, setPhoneTried] = useState(false);
  const reduce = useReducedMotion();

  const messageOk = messageLength >= 30;
  const phoneOk = isEuropeanPhoneNumber(phoneValue);
  const showPhoneError = phoneTried && !phoneOk;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setPhoneTried(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "");

    if (!isEuropeanPhoneNumber(phone)) {
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone,
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        if (payload?.error === "invalid_phone") {
          setPhoneTried(true);
          return;
        }
        throw new Error("send_failed");
      }

      setSubmitted(true);
      form.reset();
      setMessageLength(0);
      setPhoneValue("");
      setPhoneTried(false);
    } catch {
      setError(
        locale === "en"
          ? "Something went wrong. Please try again or contact us by email."
          : "Une erreur est survenue. Réessayez ou contactez-nous par email.",
      );
    } finally {
      setSending(false);
    }
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
          <p className="section-label">{t.quote.label}</p>
          <h2 id="devis-title" className="section-title">
            {t.quote.title}
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">{t.quote.subtitle}</p>
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
                    {t.quote.email}
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
                    {t.quote.phone}
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
                    {t.quote.delay}
                  </p>
                  <p className="font-display font-semibold">{t.quote.delayValue}</p>
                </div>
              </div>
              <div className="island flex flex-1 items-center gap-4 p-5">
                <span className="icon-box">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {t.quote.zone}
                  </p>
                  <p className="font-display font-semibold">{t.quote.zoneValue}</p>
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
                      {t.quote.successTitle}
                    </p>
                    <p className="mt-2 max-w-sm text-sm text-[var(--text-muted)]">
                      {t.quote.successText}
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
                        {t.quote.name}{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        disabled={sending}
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-base outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand sm:text-sm"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        {t.quote.email}{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        disabled={sending}
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-base outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand sm:text-sm"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        {t.quote.phone}{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder={
                          locale === "en"
                            ? "+33 6 12 34 56 78"
                            : "+33 6 12 34 56 78"
                        }
                        disabled={sending}
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                        aria-invalid={showPhoneError}
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-base outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand sm:text-sm"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                      {showPhoneError ? (
                        <p
                          className="mt-1.5 text-sm font-semibold text-red-600 dark:text-red-500"
                          role="alert"
                        >
                          {locale === "en"
                            ? "Non-compliant number"
                            : "Numéro non conforme"}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        {t.quote.subject}{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        defaultValue=""
                        disabled={sending}
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-base outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand sm:text-sm"
                        style={{
                          borderColor: "var(--island-border)",
                          color: "var(--text)",
                        }}
                      >
                        <option value="" disabled>
                          {t.quote.selectSubject}
                        </option>
                        {t.quote.subjects.map((s) => (
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
                        {t.quote.message}{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        minLength={30}
                        rows={4}
                        disabled={sending}
                        onChange={(e) => setMessageLength(e.target.value.length)}
                        className="w-full resize-y rounded-xl border bg-transparent px-4 py-3 text-base outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand sm:text-sm"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                      <p
                        className={`mt-1.5 transition-all duration-300 ${
                          messageOk
                            ? "text-sm font-semibold text-[#00E676]"
                            : "text-xs text-[var(--text-muted)]"
                        }`}
                      >
                        {locale === "en"
                          ? "Minimum 30 characters"
                          : "Minimum 30 caractères"}
                      </p>
                    </div>
                    {error ? (
                      <p
                        className="text-sm text-red-600 dark:text-red-400"
                        role="alert"
                      >
                        {error}
                      </p>
                    ) : null}
                    <button
                      type="submit"
                      className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={sending}
                    >
                      {sending
                        ? locale === "en"
                          ? "Sending…"
                          : "Envoi en cours…"
                        : t.quote.submit}
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
