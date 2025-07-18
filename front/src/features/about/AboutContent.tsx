import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ProjectCard from "@/components/projects/ProjectCard";
import { projectApi, Project } from "@/util/api";
import { useEffect, useState } from "react";
export default function AboutContent() {
  const [projects, setProjects] = useState<Project[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const secondarySkills = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "PostgreSQL",
    "Redis",
    "Java",
    "Kotlin",
    "Spring",
    "Prisma",
  ];

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
  return (
    <main className="pt-20 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* 상단 링크 */}
      <div className="mb-8 px-4 max-w-3xl mx-auto">
        <Link href="/" className="text-white/70 hover:underline text-sm">
          ← 홈으로 돌아가기
        </Link>
      </div>

      {/* About Me 섹션 */}
      <section
        id="about"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            단순히 작동하는 코드를 넘어서, 유지보수 가능한 구조와 명확한 데이터
            흐름을 중시합니다. 사용자의 편의성과 개발자의 효율성을 동시에
            고민하며 성장하는 백엔드 지향 개발자입니다.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* 왼쪽 이미지 */}
          <div className="relative">
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-700 to-gray-600 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-500/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl text-gray-400">👨‍💻</div>
              </div>
            </div>
          </div>
          {/* 오른쪽 내용 */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                자신 있는 기술
              </h3>
              <ul className="space-y-4 text-gray-300 leading-relaxed text-base">
                <li>
                  <strong className="text-white">NestJS</strong> – 구조화된
                  아키텍처와 의존성 주입 개념을 기반으로 모듈 단위 설계를 적용해
                  API 서버를 효율적으로 구현할 수 있습니다.
                </li>
                <li>
                  <strong className="text-white">TypeORM</strong> – Entity 기반
                  모델 설계와 관계형 DB 연동에 익숙하며, Repository 패턴과
                  트랜잭션 처리 경험이 있습니다.
                </li>
                <li>
                  <strong className="text-white">Express</strong> – 인증, 에러
                  핸들링, 라우팅 등을 직접 구성해보며 Node.js 기반 API 서버를
                  처음부터 끝까지 개발한 경험이 있습니다.
                </li>
                <li>
                  <strong className="text-white">Node.js</strong> – 이벤트
                  기반의 비동기 처리에 능숙하며, 실시간 처리와 서버 효율성을
                  고려한 설계가 가능합니다.
                </li>
                <li>
                  <strong className="text-white">JavaScript</strong> – 웹 전반에
                  걸친 개발 경험을 통해 비동기 흐름, 클로저, 스코프 등 JS 특성에
                  대한 이해를 가지고 있습니다.
                </li>
                <li>
                  <strong className="text-white">SQL</strong> – ERD 설계부터
                  정규화, 인덱싱까지 경험해봤으며, 쿼리 작성 능력을 가지고
                  있습니다.
                </li>
                <li>
                  <strong className="text-white">TypeScript</strong> – 타입
                  안정성과 가독성을 중요하게 생각하며, 전반적인 코드 일관성을
                  유지하는 데 익숙합니다.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                사용 가능 기술
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                프로젝트에 사용해본 경험은 있으나, 공부를 통해 보완 중인
                기술입니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {secondarySkills.map((skill) => (
                  <Badge key={skill} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          진행한 프로젝트
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {loading ? (
            <p className="text-gray-400">로딩 중...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : projects && projects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} type="list" />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">표시할 프로젝트가 없습니다.</p>
          )}
        </div>
      </section>
      {/* 자기소개서(본문) 섹션 - 스타일 통일 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-transparent rounded-2xl p-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 pt-24">
            안녕하세요.
            <br />
            저는 꾸준히 성장하는 백엔드 개발자를 꿈꾸는 안상현이라고 합니다.
          </h2>
          <div className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 mt-6">
            경력상 개발과 동 떨어진 다양한 경험을 해왔지만, 현재는 개발에
            매진하고 있습니다.
          </div>
          <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed pb-24">
            <p>
              저는 조용하고 깊이 파고드는 성향이 있습니다. 새로운 기술을
              탐구하고, 원리를 이해하며 구조를 설계하는 과정을 좋아합니다.
            </p>
            <p>
              혼자서 집중하는 시간을 즐기며, 주어진 일에 책임감 있게 임하는
              스타일입니다. 실무 경험은 부족하지만, 사이드 프로젝트와 개인
              학습으로 역량을 키워왔고 <br />
              현재는.. 스스로 다른 것들을 보거나 어떠한 기능들을 구현할 때
              로직부터 생각해버리는 뇌 구조가 되어있습니다.
            </p>
            <p>
              앞으로는 좋은 팀과 함께 성장하며, 더 나은 코드를 만들고 서비스에
              기여하고 싶습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
