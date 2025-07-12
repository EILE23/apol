import Button from "../../components/ui/Button";

export default function PortfolioHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Creative
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
              Developer
            </span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="flex-1 sm:flex-none">
            프로젝트 보기
          </Button>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gray-600 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gray-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gray-700 rounded-full opacity-20 animate-pulse delay-2000"></div>
    </section>
  );
}
