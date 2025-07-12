import Link from "next/link";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "React와 Node.js를 사용한 풀스택 이커머스 플랫폼",
    image: "/project1.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "드래그 앤 드롭 기능이 있는 현대적인 태스크 관리 애플리케이션",
    image: "/project2.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "DND Kit"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "반응형 디자인과 애니메이션이 적용된 포트폴리오 웹사이트",
    image: "/project3.jpg",
    technologies: ["React", "Framer Motion", "GSAP", "Three.js"],
    link: "#",
    github: "#",
  },
];

export default function PortfolioProjects() {
  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            다양한 기술 스택으로 구현한 작업물들을 소개합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block group"
            >
              <Card hover className="h-full group">
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-600">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-500/20"></div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.summary || project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tags || project.technologies).map(
                      (tech: string) => (
                        <Badge key={tech} variant="default" size="sm">
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        window.open(project.link, "_blank");
                      }}
                    >
                      Live Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        window.open(project.github, "_blank");
                      }}
                    >
                      GitHub
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
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
