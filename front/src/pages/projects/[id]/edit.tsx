import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { projectApi, Project, UpdateProjectData } from "../../../util/api";
import ProjectForm from "../../../components/projects/ProjectForm";

export default function ProjectEditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchProject();
    }
  }, [id]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("admin_token") !== "true"
    ) {
      window.location.href = "/login";
    }
  }, []);

  const fetchProject = async () => {
    try {
      const data = await projectApi.getById(id as string);
      setProject(data);
      setTitle(data.title);
      setSummary(data.summary);
      setContent(data.content);
      setTags(data.tags);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("제목과 내용은 필수입니다.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      let thumbnailUrl = project?.thumbnail || "";
      if (thumbnail) {
        const uploadedUrl = await uploadImage(thumbnail);
        thumbnailUrl = uploadedUrl || "";
      }
      const projectData: UpdateProjectData = {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        tags,
        thumbnail: thumbnailUrl,
      };

      await projectApi.update(id as string, projectData);
      router.push(`/projects/${id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "프로젝트 수정에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
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
              content: project.content,
            }}
            onSubmit={async (data) => {
              setIsSubmitting(true);
              setError("");
              try {
                let thumbnailUrl = project.thumbnail || "";
                if (data.thumbnail && typeof data.thumbnail !== "string") {
                  const uploadedUrl = await uploadImage(data.thumbnail);
                  thumbnailUrl = uploadedUrl || "";
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
