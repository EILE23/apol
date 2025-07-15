import Badge from "../ui/Badge";
import Link from "next/link";

export interface ProjectCardProps {
  project: {
    id: string | number;
    title: string;
    summary?: string;
    tags: string[];
    thumbnail?: string;
    duration?: string;
    content?: string;
  };
  type?: "main" | "list";
}

export default function ProjectCard({
  project,
  type = "list",
}: ProjectCardProps) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const contentPreview = project.content
    ? project.content
        .replace(/[#*_`>\-\[\]!\(\)]/g, "")
        .split("\n")
        .slice(0, 3)
        .join(" ")
    : "";

  if (type === "main") {
    // 메인(대표) 프로젝트 카드: 기존보다 3% 밝은 색상
    return (
      <Link href={`/projects/${project.id}`} className="block group">
        <div className="w-[320px] h-[370px] flex flex-col shadow-[0_2px_16px_0_rgba(0,0,0,0.07)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_32px_0_rgba(0,0,0,0.14)] cursor-pointer mx-auto bg-transparent p-5">
          {/* 이미지 */}
          <div className="w-full aspect-[16/9] flex items-center justify-center overflow-hidden mb-4 bg-gray-800">
            {project.thumbnail ? (
              <img
                src={
                  project.thumbnail.startsWith("/uploads/")
                    ? `${API_BASE_URL}${project.thumbnail}`
                    : project.thumbnail
                }
                alt={project.title}
                className="w-full h-full object-cover object-center"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-700">
                썸네일 없음
              </div>
            )}
          </div>
          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#23232a] text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* 제목 */}
          <h3 className="text-base font-bold text-white leading-tight line-clamp-2 text-left mb-1">
            {project.title}
          </h3>
          {/* 요약 */}
          {project.summary && (
            <div className="text-xs text-gray-300 line-clamp-2 text-left mb-1">
              {project.summary}
            </div>
          )}
          <div className="flex-1" />
          {/* 날짜/작업기간 */}
          <div className="text-xs text-gray-400 text-left mt-auto">
            {project.duration ? <>{project.duration}</> : null}
          </div>
        </div>
      </Link>
    );
  }

  // 목록/상세 스타일(넓고 정보 많은 카드)
  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <div className="w-full flex flex-row shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_32px_0_rgba(0,0,0,0.13)] cursor-pointer bg-transparent">
        {/* 이미지 */}
        <div className="w-60 min-w-[240px] max-w-[260px] aspect-[4/3] flex items-center justify-center overflow-hidden bg-gray-800">
          {project.thumbnail ? (
            <img
              src={
                project.thumbnail.startsWith("/uploads/")
                  ? `${API_BASE_URL}${project.thumbnail}`
                  : project.thumbnail
              }
              alt={project.title}
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm bg-gray-700">
              썸네일 없음
            </div>
          )}
        </div>
        {/* 내용 */}
        <div className="flex flex-col gap-2 px-10 py-7 flex-1 min-w-0 bg-transparent">
          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#23232a] text-gray-400 px-2 py-0.5 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* 제목 */}
          <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2 text-left mb-1">
            {project.title}
          </h3>
          {/* 요약 */}
          {project.summary && (
            <div className="text-base text-gray-500 line-clamp-2 text-left mb-1">
              {project.summary}
            </div>
          )}
          <div className="flex-1" />
          {/* 날짜/작업기간 */}
          <div className="text-sm text-gray-500 text-left mt-auto">
            {project.duration ? <>{project.duration}</> : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
