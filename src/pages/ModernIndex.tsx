import ModernNavbar from "@/components/hero/ModernNavbar";
import ModernHeroSection from "@/components/hero/ModernHeroSection";
import FeatureCards from "@/components/hero/FeatureCards";
import BenefitsSection from "@/components/hero/BenefitsSection";
import CtaSection from "@/components/hero/CtaSection";
import FooterSection from "@/components/hero/FooterSection";

export default function ModernIndex() {
  return (
    <div className="min-h-screen bg-background">
      <ModernNavbar />
      <ModernHeroSection />
      <div id="features">
        <FeatureCards />
      </div>
      <BenefitsSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
