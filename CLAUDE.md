# CLAUDE.md — IBFautomate (site vitrine)

Mémoire projet pour une IA / un développeur qui reprend sans le contexte des chats.

## Objectif

Site vitrine one-page de **IBFautomate**, agence web & automatisation.

Double rôle :
1. Vitrine commerciale (branding fort, conversion devis).
2. Démonstrateur technique (animations, glassmorphism, finition premium).

Pas de portfolio / réalisations. Pas de prix affichés. Tous les CTA tarifaires mènent à `#devis`.

## Stack

| Couche | Techno |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styles | Tailwind CSS (tokens custom) |
| Animations | Framer Motion |
| Icônes | lucide-react (aucun emoji) |
| Thème | next-themes (jour/nuit, `class`) |
| i18n | LanguageProvider maison (FR/EN, localStorage) |
| Email | Resend (`src/app/api/contact/route.ts`) |
| Téléphone | libphonenumber-js (`src/lib/phone.ts`) |
| CRM | Webhook `https://ibfautomate-crm-phi.vercel.app/api/webhook/contact` |
| Hébergement | Vercel (projet `ibfautomate`, team `ibf-automate`) |
| Repo | https://github.com/IBFautomate/IBFautomate.git (`main`) |

## Structure

```
src/
  app/
    layout.tsx          # fonts Space Grotesk + Inter, ThemeProvider, metadata
    page.tsx            # assemblage des sections
    globals.css         # tokens CSS, îlots glass, boutons, marquee
    icon.svg
    api/contact/route.ts
  components/
    Navbar.tsx
    Hero.tsx            # marquee outils + logos PNG Slack/Calendar
    Stats.tsx
    Services.tsx        # 5 services exacts
    MobileApp.tsx
    ProjectBoost.tsx
    Process.tsx
    Testimonials.tsx
    FAQ.tsx
    QuoteForm.tsx       # formulaire devis → /api/contact
    Footer.tsx
    WhatsAppWidget.tsx
    ThemeProvider.tsx / ThemeToggle.tsx
    LanguageProvider.tsx / LanguageToggle.tsx
    Motion.tsx          # FadeIn, Stagger
  lib/
    phone.ts            # validation numéros européens
public/
  slack.png, Calendar.png, og.svg, og.png
.env.example            # RESEND_API_KEY, CRM_WEBHOOK_SECRET
.env.local              # secrets (gitignored)
```

Sections page (ordre) : Navbar → Hero → Stats → Services → MobileApp → ProjectBoost → Process → Testimonials → FAQ → QuoteForm → Footer → WhatsAppWidget.

Ancres : `#top`, `#services`, `#processus`, `#avis`, `#faq`, `#devis`.

## Décisions importantes

| Décision | Pourquoi |
|---|---|
| One-page + ancres | Parcours devis simple, pas de multi-pages marketing |
| Pas de section Formules/prix | Tout passe par devis ; section Pricing retirée volontairement |
| Pas de Portfolio / Réalisations | Règle métier stricte |
| « IA » seulement dans 2 titres de services | « Automatisation & IA », « Réceptionniste IA » — nulle part ailleurs |
| Email `from: contact@ibfautomate.com` | Domaine Resend vérifié (plus `onboarding@resend.dev`) |
| Destinataires : Outlook + Gmail | `IBFautomate@outlook.com` + `benfakir.imrane@gmail.com` |
| Webhook CRM **avec `await` + try/catch** | Sur Vercel, un fetch sans await est coupé après la réponse HTTP |
| Validation téléphone européenne | libphonenumber-js + liste pays EU/EEE/UK/CH/Balkans ; défaut FR si format national |
| Message min. 30 caractères | Qualité des leads ; indicateur vert une fois atteint |
| Erreur téléphone seulement à l’envoi | Pas de hint permanent « Numéro européen obligatoire… » |
| Logos Slack/Calendar en PNG | Fichiers `public/slack.png` et `public/Calendar.png` |
| Déploiement via dashboard Vercel | Pas via `vercel --prod` CLI (mauvaise approche pour ce projet) |
| i18n FR/EN | LanguageProvider ; FR par défaut |

## Conventions de code

- Textes UI via `useLanguage()` / `t.*` (pas de hardcode FR seul dans les composants métier).
- Composants clients : `"use client"` quand hooks / Framer / thème.
- Alias `@/*` → `./src/*`.
- Icônes = lucide-react uniquement.
- CTA « Démarrer » / « Demander un devis » → `#devis`.
- Thème : variables CSS `--bg`, `--text`, `--island`, etc. + classes `.island`, `.btn-primary`, `.text-gradient`.
- Respecter `prefers-reduced-motion`.
- Secrets uniquement dans `.env.local` / Vercel Env — jamais commités.
- `CRM_WEBHOOK_SECRET` = même valeur que `WEBHOOK_SECRET` du projet CRM.

## Terminés

- [x] Site one-page complet (design vert/noir, glassmorphism, thème jour/nuit)
- [x] i18n FR/EN
- [x] Widget WhatsApp (bulle 3s, sessionStorage, `wa.me/0762129949`)
- [x] Formulaire devis → Resend + webhook CRM
- [x] Validation téléphone européen + message « Numéro non conforme » (à l’envoi seulement)
- [x] Message ≥ 30 caractères + indicateur vert visible
- [x] Marquee outils (boucle infinie) + logos Slack/Calendar PNG
- [x] Section Formules retirée
- [x] Repo GitHub + pushes sur `main`
- [x] Projet Vercel lié au repo GitHub

## À faire

- [ ] Vérifier / renseigner en prod Vercel : `RESEND_API_KEY`, `CRM_WEBHOOK_SECRET`
- [ ] Confirmer que le webhook CRM crée bien un lead après chaque devis
- [ ] Committer `.env.example` s’il n’est pas encore sur `main`
- [ ] Nettoyer fichiers legacy hors stack Next si inutiles (`Index.html`, `ibfautomate-source-complet.md`)
- [ ] Vérifier dashboard Vercel : domaine custom, env, dernier déploiement OK

## Problèmes connus

1. **Build Vercel sans `RESEND_API_KEY`** : `new Resend(...)` en top-level de `route.ts` fait planter le build (« Missing API key »). Les env doivent être définies dans Vercel avant un redeploy.
2. **Fetch CRM sans await** : corrigé dans `474cb1a` — ne pas revenir à un fire-and-forget.
3. **CLI `vercel --prod`** : a créé/déployé un projet ; préférer les déploiements GitHub → dashboard. Ne pas relancer la CLI pour redéployer.
4. **`.env.example`** peut être encore untracked localement.
5. **`tsconfig.tsbuildinfo`** parfois modifié localement alors qu’il est dans `.gitignore` (fichier déjà tracké historiquement possible).

## Commandes

```bash
# Install & local
npm install
npm run dev          # http://localhost:3000

# Qualité
npm run lint
npm run build
npm start

# Git
git add .
git commit -m "message"
git push origin main   # déclenche le redeploy Vercel si Git intégré
```

Variables locales (`.env.local`) :
```
RESEND_API_KEY=re_...
CRM_WEBHOOK_SECRET=...   # = WEBHOOK_SECRET du CRM
```

Contacts affichés sur le site :
- Email : `IBFautomate@outlook.com`
- Téléphone : `07 62 12 99 49`
- WhatsApp : `0762129949`

## Services (5, figés)

1. Développement d'Applications Web (`AppWindow`)
2. Automatisation & IA (`Workflow`)
3. Réceptionniste IA (`PhoneCall`)
4. Sites Web Professionnels (`Globe`)
5. Modernisation de site web (`RefreshCcw`)
