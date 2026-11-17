import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — IBFautomate",
  description:
    "Données collectées, finalités, durées de conservation et droits RGPD sur le site IBFautomate.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return <LegalPage kind="privacy" />;
}
