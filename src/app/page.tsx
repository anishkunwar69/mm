import ComicScrollSection from "@/components/ComicScrollSection";
import FaceOffSection from "@/components/FaceOffSection";
import HeroReveal from "@/components/HeroReveal";
import OriginSection from "@/components/OriginSection";
import TransitionCtaSection from "@/components/TransitionCtaSection";

export default function Home() {
  return (
    <>
      <HeroReveal />
      <OriginSection />
      <ComicScrollSection />
      <FaceOffSection />
      <TransitionCtaSection />
    </>
  );
}
