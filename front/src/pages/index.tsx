import PortfolioHeader from "../features/portfolio/PortfolioHeader";
import PortfolioHero from "../features/portfolio/PortfolioHero";
import PortfolioProjects from "../features/portfolio/PortfolioProjects";
import Footer from "../components/ui/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <PortfolioHeader />
      <main className="flex-1">
        <PortfolioHero />
        <PortfolioProjects />
      </main>
      <Footer />
    </div>
  );
}
