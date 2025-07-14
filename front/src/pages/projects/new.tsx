import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { projectApi, CreateProjectData } from "../../util/api";
import ProjectForm from "../../components/projects/ProjectForm";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

export default function ProjectCreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("admin_token") !== "true"
    ) {
      window.location.href = "/login";
    }
  }, []);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // 이미지 업로드 함수 추가
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/api/projects/upload", {
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
    if (!data.title.trim() || !data.content.trim()) {
      setError("제목과 내용은 필수입니다.");
      return;
    }
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
