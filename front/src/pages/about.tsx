import AboutContent from "@/features/about/AboutContent";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Header type="home" />
      <main className="pt-20 flex-1">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
