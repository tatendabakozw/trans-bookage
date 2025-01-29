import { CTASection } from "@/components/page-sections/home/cta-section";
import { FAQSection } from "@/components/page-sections/home/faqs-section";
import FeaturesSection from "@/components/page-sections/home/features-section";
import HeroSection from "@/components/page-sections/home/hero-section";
import PopularRoutesSection from "@/components/page-sections/home/popular-routes-section";
import TestimonialsSection from "@/components/page-sections/home/testimonials-section";
import GeneralLayout from "@/layouts/GeneralLayout";

export default function Home() {
  return (
    <GeneralLayout>
      <HeroSection />
      <FeaturesSection />
      <PopularRoutesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </GeneralLayout>
  );
}