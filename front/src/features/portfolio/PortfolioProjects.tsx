import { useState, useEffect } from "react";
import ProjectCard from "../../components/projects/ProjectCard";
import { projectApi, Project } from "../../util/api";
import Link from "next/link";
import Button from "../../components/ui/Button";

export default function PortfolioProjects() {
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
            : "프로젝트를 불러오는데 실패했습니다."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return null;
  if (error) return null;

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            다양한 기술 스택으로 구현한 작업물들을 소개합니다.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {projects
            .filter(
              (project) =>
                project.category !== "record" && project.category !== "study"
            )
            .slice(0, 3)
            .map((project) => (
              <div key={project.id} className="flex-1 min-w-[320px] max-w-md">
                <ProjectCard project={project} type="main" />
              </div>
            ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link href="/projects">
            <Button size="lg">모든 프로젝트 보기</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
