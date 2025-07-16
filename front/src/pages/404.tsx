import Link from "next/link";

export default function C404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#18181b] text-white">
      <img src="/apol-favicon.png" alt="404" className="w-24 h-24 mb-6" />
      <div className="text-xl font-semibold mb-4">
        올바르지 않은 경로입니다.
      </div>
      <Link href="/">
        <span className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 cursor-pointer">
          홈으로
        </span>
      </Link>
    </div>
  );
}
