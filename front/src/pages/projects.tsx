import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { projectApi, Project } from "../util/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectApi.getAll();
        setProjects(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "프로젝트 목록을 불러오는데 실패했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header type="projects" />

      <main className="pt-20 flex-1">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Projects
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                다양한 기술 스택으로 구현한 프로젝트들을 소개합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* New Project Button */}
            <div className="flex justify-end mb-8">
              <Link
                href="/projects/new"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
              >
                새 프로젝트 작성
              </Link>
            </div>
            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  프로젝트 목록을 불러오는 중...
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <div className="text-red-500">{error}</div>
              </div>
            )}

            {/* Projects Grid */}
            {!loading && !error && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`}>
                    <Card hover className="h-full">
                      {/* Project Image */}
                      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl text-gray-400">📱</div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="green" size="sm">
                            완료
                          </Badge>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="blue" size="sm">
                            프로젝트
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {formatDate(project.createdAt)}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {project.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {project.summary}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="default" size="sm">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="default" size="sm">
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                  이전
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                  2
                </button>
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                  3
                </button>
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                  다음
                </button>
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
