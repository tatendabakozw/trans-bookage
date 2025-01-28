import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/page-sections/home/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <HeroSection/>
    </div>
  );
}