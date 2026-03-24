import { Hero } from "@/components/hero";
import { ServicesPreview } from "@/components/services-preview";
import { AboutSection } from "@/components/about-section";
import { CTASection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <AboutSection />
      <CTASection />
    </>
  );
}
