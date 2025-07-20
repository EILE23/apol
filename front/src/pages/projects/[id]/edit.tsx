import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { projectApi, Project, UpdateProjectData } from "../../../util/api";
import { isAdminLoggedIn } from "../../../util/auth";
import dynamic from "next/dynamic";

const ProjectForm = dynamic(
  () => import("../../../components/projects/ProjectForm"),
  {
    ssr: false,
  }
);
export default function ProjectEditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    if (id && typeof id === "string") {
      fetchProject();
    }
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined" && !isAdminLoggedIn()) {
      window.location.href = "/login";
    }
  }, []);

  const fetchProject = async () => {
    try {
      const [data, contentText] = await Promise.all([
        projectApi.getById(id as string),
        projectApi.getContent(id as string),
      ]);
      setProject(data);
      setContent(contentText);
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

  // 이미지 업로드 함수
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${API_BASE_URL}/api/projects/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) return "";
    const data = await res.json();
    return data.url || "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        로딩 중...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-400">
        {error || "프로젝트를 찾을 수 없습니다."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <main className="flex-1 pt-20">
        <section className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-white mb-8">프로젝트 수정</h1>
          <ProjectForm
            initial={{
              title: project.title,
              summary: project.summary,
              tags: project.tags,
              thumbnail: project.thumbnail,
              content: content,
            }}
            onSubmit={async (data) => {
              setIsSubmitting(true);
              setError("");
              try {
                let thumbnailUrl = project.thumbnail || "";
                if (data.thumbnail && typeof data.thumbnail !== "string") {
                  const uploadedUrl = await uploadImage(data.thumbnail);
                  thumbnailUrl = uploadedUrl || "";
                } else if (!data.thumbnail && project.thumbnail) {
                  thumbnailUrl = project.thumbnail;
                } else if (!data.thumbnail) {
                  thumbnailUrl = "";
                }
                const projectData: UpdateProjectData = {
                  title: data.title.trim(),
                  summary: data.summary.trim(),
                  content: data.content,
                  tags: data.tags,
                  thumbnail: thumbnailUrl,
                };
                await projectApi.update(id as string, projectData);
                router.push(`/projects/${id}`);
              } catch (err) {
                setError(
                  err instanceof Error
                    ? err.message
                    : "프로젝트 수정에 실패했습니다."
                );
              } finally {
                setIsSubmitting(false);
              }
            }}
            isEdit
            error={error}
            disabled={isSubmitting}
          />
        </section>
      </main>
    </div>
  );
}
