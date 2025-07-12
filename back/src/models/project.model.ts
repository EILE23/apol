export interface Project {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 임시 데이터 저장소 (실제로는 데이터베이스를 사용해야 함)
let projects: Project[] = [
  {
    id: "1",
    title: "포트폴리오 웹사이트",
    summary: "React와 Next.js를 사용한 개인 포트폴리오 웹사이트",
    content:
      "이 프로젝트는 React와 Next.js를 사용하여 개발된 개인 포트폴리오 웹사이트입니다. TypeScript를 사용하여 타입 안정성을 보장하고, Tailwind CSS로 스타일링을 구현했습니다.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    thumbnail: "/api/images/portfolio-thumbnail.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "할일 관리 앱",
    summary: "Vue.js와 Firebase를 사용한 실시간 할일 관리 애플리케이션",
    content:
      "Vue.js 3와 Firebase를 활용하여 실시간으로 할일을 관리할 수 있는 웹 애플리케이션을 개발했습니다. 사용자 인증, 실시간 데이터 동기화, 푸시 알림 기능을 포함합니다.",
    tags: ["Vue.js", "Firebase", "JavaScript", "PWA"],
    thumbnail: "/api/images/todo-thumbnail.jpg",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-02-20"),
  },
];

export class ProjectModel {
  static async getAll(): Promise<Project[]> {
    return projects;
  }

  static async getById(id: string): Promise<Project | null> {
    return projects.find((project) => project.id === id) || null;
  }

  static async create(
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
  ): Promise<Project> {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    projects.push(newProject);
    return newProject;
  }

  static async update(
    id: string,
    projectData: Partial<Omit<Project, "id" | "createdAt">>
  ): Promise<Project | null> {
    const index = projects.findIndex((project) => project.id === id);
    if (index === -1) return null;

    projects[index] = {
      ...projects[index],
      ...projectData,
      updatedAt: new Date(),
    };
    return projects[index];
  }

  static async delete(id: string): Promise<boolean> {
    const index = projects.findIndex((project) => project.id === id);
    if (index === -1) return false;

    projects.splice(index, 1);
    return true;
  }
}
