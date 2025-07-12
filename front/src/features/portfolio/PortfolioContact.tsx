import { FaLink, FaIdBadge } from "react-icons/fa";

export default function PortfolioContact() {
  return (
    <section id="contact" className="py-16 bg-neutral-900 text-neutral-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* 상단: 아이콘 + 연락처 */}
          <div className="flex items-center gap-6">
            {/* 아이콘 2개 */}
            <div className="flex flex-col gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                <FaLink className="w-5 h-5 text-neutral-300" />
              </div>
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                <FaIdBadge className="w-5 h-5 text-neutral-300" />
              </div>
            </div>
            {/* 연락처 정보 */}
            <div className="flex flex-col gap-1 text-base">
              <div className="flex items-center gap-2">
                <span className="sr-only">이메일</span>
                <span>📧</span>
                <span>squirrel309@naver.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="sr-only">전화번호</span>
                <span>📞</span>
                <span>010-0000-0000</span>
              </div>
            </div>
          </div>

          {/* 안내문구 */}
          <div className="text-sm text-neutral-400 leading-relaxed mt-2">
            이미지 저작권은 유료 프리픽을 라이센스를 사용중이며, 게시물은 상업적
            목적이 아닌 포트폴리오 목적으로만 사용됩니다. 아직 공개되지 않은
            작업물은 포함하지 않으며, 오직 공개된 작업물만을 게시합니다.
          </div>

          {/* Copyright */}
          <div className="mt-4 text-sm text-neutral-400">
            <span className="text-neutral-200 font-semibold">
              Copyright © p. Hyun
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
