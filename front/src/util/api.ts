const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export interface Project {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  summary: string;
  content: string;
  tags: string[];
  thumbnail?: string;
}

export interface UpdateProjectData {
  title?: string;
  summary?: string;
  content?: string;
  tags?: string[];
  thumbnail?: string;
}

// API 요청 헬퍼 함수
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
}

// 프로젝트 API 함수들
export const projectApi = {
  // 모든 프로젝트 조회
  getAll: (): Promise<Project[]> => {
    return apiRequest<Project[]>("/projects");
  },

  // 특정 프로젝트 조회
  getById: (id: string): Promise<Project> => {
    return apiRequest<Project>(`/projects/${id}`);
  },

  // 새 프로젝트 생성
  create: (data: CreateProjectData): Promise<Project> => {
    return apiRequest<Project>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // 프로젝트 수정
  update: (id: string, data: UpdateProjectData): Promise<Project> => {
    return apiRequest<Project>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // 프로젝트 삭제
  delete: (id: string): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/projects/${id}`, {
      method: "DELETE",
    });
  },
};
