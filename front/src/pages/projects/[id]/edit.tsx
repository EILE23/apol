import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { projectApi, Project, UpdateProjectData } from "../../../util/api";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("제목과 내용은 필수입니다.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const projectData: UpdateProjectData = {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        tags,
        thumbnail: thumbnail ? URL.createObjectURL(thumbnail) : undefined,
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
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="text-gray-500">프로젝트를 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="text-red-500">
              {error || "프로젝트를 찾을 수 없습니다."}
            </div>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-8 text-gray-900">프로젝트 수정</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* 제목 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">제목</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          {/* 요약 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">요약</label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[60px]"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="간단한 요약을 입력하세요"
            />
          </div>
          {/* 본문 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">본문</label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[180px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="본문 내용을 입력하세요"
              required
            />
          </div>
          {/* 태그 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">태그</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="태그 입력 후 Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleAddTag}
              >
                추가
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                  <button
                    type="button"
                    className="ml-2 text-blue-400 hover:text-blue-700"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          {/* 썸네일 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              썸네일 이미지
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {thumbnail && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="썸네일 미리보기"
                  className="h-32 rounded-md border border-gray-200 object-cover"
                />
              </div>
            )}
            {project.thumbnail && !thumbnail && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">현재 썸네일:</p>
                <img
                  src={project.thumbnail}
                  alt="현재 썸네일"
                  className="h-32 rounded-md border border-gray-200 object-cover"
                />
              </div>
            )}
          </div>
          {/* 버튼 */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "수정 중..." : "수정"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
