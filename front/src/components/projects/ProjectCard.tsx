import Link from "next/link";
import { CategoryType, categories } from "@/types/categorys";

export interface ProjectCardProps {
  project: {
    id: string | number;
    title: string;
    summary?: string;
    tags: string[];
    thumbnail?: string;
    duration?: string;
    content?: string;
    category?: CategoryType;
  };
  type?: "main" | "list" | "about";
}

export default function ProjectCard({
  project,
  type = "list",
}: ProjectCardProps) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const getCategoryLabel = (key?: CategoryType) =>
    categories.find((c) => c.key === key)?.label || "";

  if (type === "main") {
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

          {/* 카테고리 + 태그 */}
          <div className="flex flex-wrap gap-2 mb-1">
            {project.category && (
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                {getCategoryLabel(project.category)}
              </span>
            )}
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
            {project.duration}
          </div>
        </div>
      </Link>
    );
  }

  if (type === "about") {
    return (
      <Link href={`/projects/${project.id}`} className="block group">
        <div className="flex flex-col w-full shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_32px_0_rgba(0,0,0,0.13)] cursor-pointer bg-transparent">
          {/* 이미지 */}
          <div className="w-full aspect-[4/3] bg-gray-800 overflow-hidden">
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
          {/* 텍스트 */}
          <div className="flex flex-col gap-2 px-6 py-5 bg-transparent text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-1">
              {project.category && (
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {getCategoryLabel(project.category)}
                </span>
              )}
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#23232a] text-gray-400 px-2 py-0.5 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-white leading-tight line-clamp-2 mb-1">
              {project.title}
            </h3>
            {project.summary && (
              <div className="text-sm text-gray-400 line-clamp-2">
                {project.summary}
              </div>
            )}
            {project.duration && (
              <div className="text-xs text-gray-500 mt-1">
                {project.duration}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // list 타입
  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <div className="w-full flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-start shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_32px_0_rgba(0,0,0,0.13)] cursor-pointer bg-transparent">
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
        <div className="flex flex-col gap-2 px-10 py-7 flex-1 min-w-0 bg-transparent items-center md:items-start text-center md:text-left">
          {/* 카테고리 + 태그 */}
          <div className="flex flex-wrap gap-2 mb-1">
            {project.category && (
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                {getCategoryLabel(project.category)}
              </span>
            )}
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
          {/* 기간 */}
          <div className="text-sm text-gray-500 text-left mt-auto">
            {project.duration}
          </div>
        </div>
      </div>
    </Link>
  );
}
