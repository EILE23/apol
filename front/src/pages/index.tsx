import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import PortfolioHero from "../features/portfolio/PortfolioHero";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Header type="home" />
      <main className="flex-1">
        <PortfolioHero />
      </main>
      <Footer />
    </div>
  );
}
