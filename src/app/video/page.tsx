import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VideoPage } from "@/components/VideoPage";

export const metadata: Metadata = {
  title: "Vidéo — IBFautomate",
  description: "Présentation vidéo IBFautomate — bientôt disponible.",
  robots: { index: true, follow: true },
};

export default function VideoRoute() {
  return (
    <>
      <Navbar />
      <main>
        <VideoPage />
      </main>
      <Footer />
    </>
  );
}
