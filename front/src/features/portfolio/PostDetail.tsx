import DOMPurify from "dompurify";
import { marked } from "marked";
import Badge from "../../components/ui/Badge";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface PostDetailData {
  id: string | number;
  title: string;
  description: string;
  fullDescription?: string;
  image?: string;
  technologies?: string[];
  category?: string;
  date?: string;
  status?: string;
  duration?: string;
  teamSize?: string;
  role?: string;
  github?: string;
  liveDemo?: string;
  screenshots?: string[];
  content?: string;
}

export default function PostDetail({ post }: { post: PostDetailData }) {
  const rawHtml = post.content ? marked.parse(post.content) : "";
  const safeHtml = DOMPurify.sanitize(rawHtml);

  return (
    <main className="pt-20 px-1 sm:px-3 md:px-4 max-w-3xl mx-auto text-neutral-100 min-h-screen">
      {/* 제목 */}
      <header className="mb-10">
        {post.category && (
          <div className="mb-2">
            <Badge variant="blue" size="sm">
              {post.category}
            </Badge>
            {post.status && (
              <Badge
                variant={post.status === "완료" ? "green" : "yellow"}
                size="sm"
                className="ml-2"
              >
                {post.status}
              </Badge>
            )}
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        {post.description && (
          <p className="text-lg text-neutral-400">{post.description}</p>
        )}
        {post.date && (
          <p className="text-sm text-neutral-500 mt-1">
            {new Date(post.date as string).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </header>

      {post.image && (
        <div className="mb-12">
          <img
            src={
              post.image.startsWith("/uploads/")
                ? `${API_BASE_URL}${post.image}`
                : post.image
            }
            alt="썸네일 이미지"
            className="w-full h-auto object-cover rounded-md shadow"
          />
        </div>
      )}

      {/* 마크다운 본문 */}
      {safeHtml && (
        <section className="prose prose-invert max-w-none text-base space-y-6 p-6 rounded-xl">
          <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
        </section>
      )}

      {/* 프로젝트 기본 정보 */}
      <section className="mb-12 space-y-2 text-sm leading-relaxed text-neutral-400 mt-12">
        {post.duration && (
          <p>
            <strong className="text-neutral-200">작업 기간:</strong>{" "}
            {post.duration}
          </p>
        )}
        {post.teamSize && (
          <p>
            <strong className="text-neutral-200">팀 규모:</strong>{" "}
            {post.teamSize}
          </p>
        )}
        {post.role && (
          <p>
            <strong className="text-neutral-200">담당 역할:</strong> {post.role}
          </p>
        )}
        {post.technologies?.length > 0 && (
          <p>
            <strong className="text-neutral-200">사용 기술:</strong>{" "}
            {post.technologies.join(", ")}
          </p>
        )}
      </section>

      {(post.github || post.liveDemo) && (
        <div className="flex gap-4 mt-6">
          {post.github && (
            <a
              href={post.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline font-medium"
            >
              🔗 GitHub 보기
            </a>
          )}
          {post.liveDemo && (
            <a
              href={post.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline font-medium"
            >
              🌐 Live Demo
            </a>
          )}
        </div>
      )}
    </main>
  );
}
