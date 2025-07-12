import PortfolioHeader from "../features/portfolio/PortfolioHeader";
import PortfolioHero from "../features/portfolio/PortfolioHero";
import PortfolioAbout from "../features/portfolio/PortfolioAbout";
import PortfolioEducation from "../features/portfolio/PortfolioEducation";
import PortfolioProjects from "../features/portfolio/PortfolioProjects";
// import PortfolioContact from "../features/portfolio/PortfolioContact";
import Footer from "../components/ui/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PortfolioHeader />
      <main className="flex-1">
        <PortfolioHero />
        <PortfolioAbout />
        {/* <PortfolioEducation /> */}
        <PortfolioProjects />
        {/* <PortfolioContact /> */}
      </main>
      <Footer />
    </div>
  );
}
