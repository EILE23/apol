import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Link from "next/link";

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
  challenges?: string[];
  solutions?: string[];
  github?: string;
  liveDemo?: string;
  screenshots?: string[];
}

export default function PostDetail({ post }: { post: PostDetailData }) {
  return (
    <main className="pt-20 flex-1">
      {/* Project Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/posts"
              className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
            >
              ← 게시글 목록으로 돌아가기
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Project Image */}
            <div className="relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-gray-400">📄</div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              {post.category && (
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="blue" size="md">
                    {post.category}
                  </Badge>
                  {post.status && (
                    <Badge
                      variant={post.status === "완료" ? "green" : "yellow"}
                      size="md"
                    >
                      {post.status}
                    </Badge>
                  )}
                </div>
              )}

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {post.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 py-6">
                {post.duration && (
                  <div>
                    <h4 className="font-semibold text-gray-900">기간</h4>
                    <p className="text-gray-600">{post.duration}</p>
                  </div>
                )}
                {post.teamSize && (
                  <div>
                    <h4 className="font-semibold text-gray-900">팀 크기</h4>
                    <p className="text-gray-600">{post.teamSize}</p>
                  </div>
                )}
                {post.role && (
                  <div>
                    <h4 className="font-semibold text-gray-900">역할</h4>
                    <p className="text-gray-600">{post.role}</p>
                  </div>
                )}
                {post.date && (
                  <div>
                    <h4 className="font-semibold text-gray-900">완료일</h4>
                    <p className="text-gray-600">{post.date}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                {post.github && (
                  <Button
                    onClick={() => window.open(post.github, "_blank")}
                    variant="primary"
                  >
                    GitHub 보기
                  </Button>
                )}
                {post.liveDemo && (
                  <Button
                    onClick={() => window.open(post.liveDemo, "_blank")}
                    variant="outline"
                  >
                    Live Demo
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Technologies */}
            {post.technologies && post.technologies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  사용 기술
                </h2>
                <div className="flex flex-wrap gap-2">
                  {post.technologies.map((tech) => (
                    <Badge key={tech} variant="default" size="md">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Project Description */}
            {post.fullDescription && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  프로젝트 설명
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {post.fullDescription}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Challenges & Solutions */}
          {(post.challenges || post.solutions) && (
            <div className="grid lg:grid-cols-2 gap-12 mt-16">
              {post.challenges && post.challenges.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    도전 과제
                  </h2>
                  <div className="space-y-4">
                    {post.challenges.map((challenge, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {post.solutions && post.solutions.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    해결 방법
                  </h2>
                  <div className="space-y-4">
                    {post.solutions.map((solution, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600">{solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
