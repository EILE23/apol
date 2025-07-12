import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import { projectApi, Project } from "../../util/api";

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const data = await projectApi.getById(id as string);
      setProject(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "프로젝트를 불러오는데 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!project || !confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await projectApi.delete(project.id);
      router.push("/projects");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "프로젝트 삭제에 실패했습니다."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header type="projects" />
        <main className="pt-20 flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="text-gray-500">프로젝트를 불러오는 중...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header type="projects" />
        <main className="pt-20 flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="text-red-500">
                {error || "프로젝트를 찾을 수 없습니다."}
              </div>
              <Link
                href="/projects"
                className="mt-4 inline-block text-blue-600 hover:text-blue-800"
              >
                프로젝트 목록으로 돌아가기
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header type="projects" />

      <main className="pt-20 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* Project Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h1>
                <p className="text-gray-600">{project.summary}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/projects/${project.id}/edit`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  수정
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed"
                >
                  {isDeleting ? "삭제 중..." : "삭제"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>작성일: {formatDate(project.createdAt)}</span>
              <span>수정일: {formatDate(project.updatedAt)}</span>
            </div>
          </div>

          {/* Project Content */}
          <Card>
            <div className="p-8">
              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    사용 기술
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="default" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  프로젝트 설명
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {project.content}
                  </p>
                </div>
              </div>

              {/* Thumbnail */}
              {project.thumbnail && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    썸네일
                  </h3>
                  <img
                    src={project.thumbnail}
                    alt="프로젝트 썸네일"
                    className="max-w-full h-auto rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Back to Projects */}
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              ← 프로젝트 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
