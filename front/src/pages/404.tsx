import Link from "next/link";
import Footer from "@/components/ui/Footer";

export default function C404() {
  return (
    <div className="flex flex-col min-h-screen bg-[#18181b]">
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="text-3xl font-bold text-gray-500 mb-3 drop-shadow">
          404
        </div>
        <div className="text-lg font-semibold text-gray-300 mb-6">
          올바르지 않은 경로입니다.
        </div>
        <Link href="/">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold rounded-md shadow hover:from-gray-900 hover:to-gray-700 transition-colors cursor-pointer">
            홈으로
          </span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
