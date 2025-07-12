import Badge from "../ui/Badge";

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
  return (
    <div className="flex flex-col md:flex-row bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-gray-800">
      {/* 썸네일 */}
      <div className="md:w-80 w-full h-56 md:h-auto flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="object-cover w-full h-full rounded-none md:rounded-l-2xl md:rounded-r-none rounded-t-2xl md:rounded-t-none"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-600" />
        )}
      </div>
      {/* 정보 */}
      <div className="flex-1 p-8 flex flex-col gap-2 justify-center">
        <h3 className="text-2xl font-bold text-white mb-2 text-left">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 mb-1 text-left">
          <span className="text-gray-400 text-sm font-semibold">주요 스킬</span>
          {project.tags &&
            project.tags.map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
        </div>
        <div className="flex items-center gap-2 mb-1 text-left">
          <span className="text-gray-400 text-sm font-semibold">작업기간</span>
          <span className="text-blue-300 font-bold">
            {project.duration || "8일"}
          </span>
        </div>
        <div className="text-gray-300 text-base leading-relaxed mt-2 text-left whitespace-pre-line">
          {project.summary}
        </div>
      </div>
    </div>
  );
}
