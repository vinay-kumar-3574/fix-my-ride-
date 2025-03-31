import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import MobilePreview from "@/components/MobilePreview";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen sm:min-h-[80vh] md:min-h-[85vh] lg:min-h-[90vh] xl:min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <MobilePreview />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;