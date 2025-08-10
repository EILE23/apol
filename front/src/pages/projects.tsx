import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { projectApi, Project } from "../util/api";
import ProjectCard from "../components/projects/ProjectCard";
import { isAdminLoggedIn } from "../util/auth";
import { categories as catDefs, CategoryType } from "@/types/categorys";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | CategoryType
  >("all");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn());
    const interval = setInterval(() => setIsAdmin(isAdminLoggedIn()), 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  const categoryOptions: Array<{ key: "all" | CategoryType; label: string }> = [
    { key: "all", label: "전체" },
    ...catDefs,
  ];

  const filteredProjects = projects.filter((p) =>
    selectedCategory === "all" ? true : p.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Header type="projects" />
      <main className="pt-20 flex-1 pb-10">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              구현한 작업물들을 소개합니다.
            </p>
          </div>
        </section>

        {/* 카테고리 필터 */}
        <div className="max-w-5xl mx-auto px-4 -mt-6 mb-4">
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((c) => {
              const active = selectedCategory === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setSelectedCategory(c.key)}
                  className={[
                    "px-3 py-1.5 text-sm rounded-full border transition",
                    active
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-[#18181b] text-gray-300 border-gray-700 hover:border-gray-500",
                  ].join(" ")}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 리스트 */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4 flex flex-col gap-6">
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
              filteredProjects.map((project, idx) => (
                <>
                  <ProjectCard key={project.id} project={project} type="list" />
                  {idx !== filteredProjects.length - 1 && (
                    <div className="w-full h-px bg-[#23232a] my-8" />
                  )}
                </>
              ))}

            {!loading && !error && filteredProjects.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                해당 카테고리에 프로젝트가 없습니다.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
