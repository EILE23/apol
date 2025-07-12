import { FaLink, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300 border-t border-gray-700 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-start gap-4 text-sm">
        {/* 아이콘 줄 */}
        <div className="flex gap-3">
          <a
            href="https://github.com/EILE23"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="w-4 h-4 text-gray-400" />
          </a>
        </div>

        {/* 텍스트 정보들 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-medium text-gray-300">
            <FaEnvelope className="text-gray-400 w-4 h-4" />
            <span>tkdgys1234@gmail.com</span>
          </div>
          {/* <div className="flex items-center gap-2 font-medium text-gray-300">
            <FaPhone className="text-gray-400 w-4 h-4" />
            <span>010-0000-0000</span>
          </div> */}
        </div>

        <p className="text-gray-400 leading-relaxed max-w-2xl">
          이 포트폴리오는 개발자로서의 역량을 보여주기 위한 개인 작업물로, 다른
          목적 없이 순수한 소개와 기록의 의미로 제작되었습니다. 모든 콘텐츠는
          직접 경험한 프로젝트와 학습 내용을 바탕으로 구성되어 있습니다.
        </p>

        <p className="text-gray-500 pt-2 text-sm">Copyright © EILE23</p>
      </div>
    </footer>
  );
}
