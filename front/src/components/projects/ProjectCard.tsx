import Badge from "../ui/Badge";
import Link from "next/link";

export interface ProjectCardProps {
  project: {
    id: string | number;
    title: string;
    summary: string;
    tags: string[];
    thumbnail?: string;
    duration?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <div
        className="
      flex flex-col md:flex-row w-full overflow-hidden 
      border border-gray-700 
      bg-gradient-to-br from-[#0c0c0c] to-[#1a1a1a] 
      group-hover:border-grey-500 
      transition-all duration-300 
      hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] 
      
    "
      >
        {/* 썸네일 영역 */}
        <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 bg-gray-800">
          {project.thumbnail ? (
            <img
              src={
                project.thumbnail.startsWith("/uploads/")
                  ? `${API_BASE_URL}${project.thumbnail}`
                  : project.thumbnail
              }
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              썸네일 없음
            </div>
          )}
        </div>

        {/* 텍스트 정보 */}
        <div className="flex-1 px-6 py-6 flex flex-col justify-center gap-2">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-400">주요 스킬</span>
            {project.tags.map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="text-sm text-gray-400">
            작업기간{" "}
            <span className="text-blue-400 font-semibold">
              {project.duration || "8일"}
            </span>
          </div>

          <p className="text-sm text-gray-300 whitespace-pre-line mt-1 line-clamp-3">
            {project.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}
