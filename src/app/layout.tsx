import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
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
  title: "IBFautomate — Agence Web & Automatisation",
  description:
    "Automatisez votre entreprise et gagnez des heures chaque semaine. Sites performants, applications sur mesure et processus sans friction — IBFautomate.",
  openGraph: {
    title: "IBFautomate — Agence Web & Automatisation",
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
        alt: "IBFautomate — Agence Web & Automatisation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IBFautomate — Agence Web & Automatisation",
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
