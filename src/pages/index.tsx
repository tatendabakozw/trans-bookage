import FeaturesSection from "@/components/page-sections/home/features-section";
import HeroSection from "@/components/page-sections/home/hero-section";
import PopularRoutesSection from "@/components/page-sections/home/popular-routes-section";
import GeneralLayout from "@/layouts/GeneralLayout";

export default function Home() {
  return (
    <GeneralLayout>
      <HeroSection />
      <FeaturesSection />
      <PopularRoutesSection />
    </GeneralLayout>
  );
}