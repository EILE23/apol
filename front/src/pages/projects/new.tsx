import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { projectApi, CreateProjectData } from "../../util/api";
import dynamic from "next/dynamic";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import { isAdminLoggedIn } from "../../util/auth";

const ProjectForm = dynamic(
  () => import("../../components/projects/ProjectForm"),
  {
    ssr: false,
  }
);
export default function ProjectCreatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && !isAdminLoggedIn()) {
      window.location.href = "/login";
    }
  }, []);

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

  // ProjectForm용 onSubmit 핸들러
  const handleFormSubmit = async (data: {
    title: string;
    summary: string;
    tags: string[];
    thumbnail?: File | null;
    content: string;
  }) => {
    setIsSubmitting(true);
    setError("");
    try {
      let thumbnailUrl = "";
      if (data.thumbnail) {
        const uploadedUrl = await uploadImage(data.thumbnail);
        thumbnailUrl = uploadedUrl || "";
      }
      const projectData: CreateProjectData = {
        title: data.title.trim(),
        summary: data.summary.trim(),
        content: data.content,
        tags: data.tags,
        thumbnail: thumbnailUrl,
      };
      const newProject = await projectApi.create(projectData);
      router.push(`/projects/${newProject.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "프로젝트 생성에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Header type="projects" />
      <main className="pt-20 flex-1">
        <section className="max-w-5xl mx-auto px-0 py-0 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 px-8 pt-8">
            새 프로젝트 작성
          </h1>
          <div className="w-full px-8 pb-16">
            <ProjectForm
              onSubmit={handleFormSubmit}
              loading={isSubmitting}
              error={error}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
