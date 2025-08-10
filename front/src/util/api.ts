const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

import { CategoryType } from "@/types/categorys";
// 프로젝트 타입 정의
export interface Project {
  id: string;
  title: string;
  summary: string;
  content?: string; // 프론트에서 수동 fetch 시에만 사용됨
  tags: string[];
  thumbnail?: string;
  duration?: string;
  category?: CategoryType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  summary: string;
  content: string;
  tags: string[];
  thumbnail?: string;
  duration?: string;
  category?: CategoryType;
}

export interface UpdateProjectData {
  title?: string;
  summary?: string;
  content?: string;
  tags?: string[];
  thumbnail?: string;
  duration?: string;
  category?: CategoryType;
}

// 공통 API 요청 함수
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

// 프로젝트 API 모듈
export const projectApi = {
  /** 모든 프로젝트 목록 조회 (content 제외) */
  getAll: (): Promise<Project[]> => {
    return apiRequest<Project[]>("/api/projects");
  },

  /** 특정 프로젝트 메타데이터 조회 (content 제외) */
  getById: (id: string): Promise<Project> => {
    return apiRequest<Project>(`/api/projects/${id}`);
  },

  /** 특정 프로젝트 본문(content)만 조회 */
  getContent: (id: string): Promise<string> => {
    return fetch(`${API_BASE_URL}/api/projects/${id}/content`).then((res) => {
      if (!res.ok) throw new Error("본문을 가져오지 못했습니다.");
      return res.text();
    });
  },

  /** 새 프로젝트 생성 */
  create: (data: CreateProjectData): Promise<Project> => {
    return apiRequest<Project>("/api/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /** 기존 프로젝트 수정 */
  update: (id: string, data: UpdateProjectData): Promise<Project> => {
    return apiRequest<Project>(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  /** 프로젝트 삭제 */
  delete: (id: string): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/api/projects/${id}`, {
      method: "DELETE",
    });
  },
};
