import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales — IBFautomate",
  description: "Éditeur, hébergeur et informations légales du site IBFautomate.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return <LegalPage kind="notice" />;
}
