import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

/* Polices hébergées dans le site (Inter, Space Grotesk — licence SIL OFL, sous-ensemble latin, fichiers variables).
   Pas de téléchargement chez Google Fonts pendant la compilation : les noms de classe générés restent
   identiques d'un déploiement à l'autre (avec Google Fonts, une mise à jour des fichiers chez Google
   pouvait désaccorder la page et le CSS en cache sur Vercel → police de secours). */
const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibfautomate.com"),
  title: "IBFautomate — Agence Web & Automatisation",
  description:
    "Automatisez votre entreprise et gagnez des heures chaque semaine. Sites performants, applications sur mesure et processus sans friction — IBFautomate.",
  openGraph: {
    title: "IBFautomate — Agence Web & Automatisation",
    description:
      "Automatisez votre entreprise et gagnez des heures chaque semaine. Sites performants et processus sans friction.",
    url: "https://ibfautomate.com",
    siteName: "IBFautomate",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "IBFautomate — Agence Web & Automatisation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IBFautomate — Agence Web & Automatisation",
    description:
      "Automatisez votre entreprise et gagnez des heures chaque semaine.",
    images: ["/og.png"],
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
            __html: `(function(){try{var t=localStorage.getItem("ibfautomate-theme-v2");if(t==="dark"){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")};var l=localStorage.getItem("ibfautomate-locale");if(l==="en"||l==="fr"){document.documentElement.lang=l}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
