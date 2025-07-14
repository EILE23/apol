import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { projectApi, Project } from "../util/api";
import ProjectCard from "../components/projects/ProjectCard";

const categories = ["전체보기", "Next.js", "React.js", "TypeScript", "Design"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체보기");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(
      typeof window !== "undefined" &&
        localStorage.getItem("admin_token") === "true"
    );
  }, []);

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

  // (필터링 기능은 추후 구현, 현재는 전체 보여줌)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Header type="projects" />
      <main className="pt-20 flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Projects
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                구현한 작업물들을 소개합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 프로젝트 리스트 */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4 flex flex-col gap-12">
            {isAdmin && (
              <div className="flex justify-end mb-4">
                <Link
                  href="/projects/new"
                  className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-md hover:from-gray-600 hover:to-gray-500"
                >
                  새 프로젝트 작성
                </Link>
              </div>
            )}
            <div
              className="
          "
            ></div>
            {loading && (
              <div className="text-center py-12 text-gray-500">
                프로젝트 목록을 불러오는 중...
              </div>
            )}
            {error && (
              <div className="text-center py-12 text-red-500">{error}</div>
            )}
            {!loading &&
              !error &&
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
