import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useRef, useState } from "react";
import { categories, CategoryType } from "@/types/categorys";
export interface ProjectFormProps {
  initial?: {
    title?: string;
    summary?: string;
    tags?: string[];
    thumbnail?: string;
    content?: string;
    duration?: string;
    category?: CategoryType;
  };
  onSubmit: (data: {
    title: string;
    summary: string;
    tags: string[];
    thumbnail?: File | null;
    content: string;
    duration?: string;
    category: CategoryType;
  }) => void;
  isEdit?: boolean;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function ProjectForm({
  initial,
  onSubmit,
  isEdit,
  loading,
  error,
  disabled,
}: ProjectFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [summary, setSummary] = useState(initial?.summary || "");
  const [tags, setTags] = useState<string[]>(initial?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [duration, setDuration] = useState(initial?.duration || "");
  const [formError, setFormError] = useState<string>("");

  const isCategory = (v: any): v is CategoryType =>
    v === "project" || v === "study" || v === "record";

  const [category, setCategory] = useState<CategoryType>(
    isCategory(initial?.category) ? initial!.category! : "project"
  );

  const toastEditorRef = useRef<Editor>(null);
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const isContentValid = (content: string) =>
    content.replace(/<[^>]*>/g, "").replace(/\s/g, "") !== "";

  const handleRegister = async () => {
    setFormError("");
    const editorInstance = toastEditorRef.current?.getInstance?.();
    const markdown = editorInstance?.getHTML() ?? "";

    if (!title.trim() || !isContentValid(markdown)) {
      setFormError("제목과 내용은 필수입니다.");
      return;
    }

    if (!isCategory(category)) {
      setFormError("카테고리를 선택하세요.");
      return;
    }

    try {
      await onSubmit({
        title,
        summary,
        tags,
        thumbnail,
        content: markdown,
        duration,
        category, //
      });
    } catch {
      setFormError("등록 중 오류가 발생했습니다.");
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-8 text-white max-w-2xl mx-auto px-4 py-8">
      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          제목
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-[#18181b] border border-gray-700 rounded-md text-base"
          required
        />
      </div>

      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          소개글
        </label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full px-4 py-2 bg-[#18181b] border border-gray-700 rounded-md text-base"
          placeholder="이 프로젝트를 한 줄로 소개해 주세요."
        />
      </div>
      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          카테고리
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as CategoryType)}
          className="w-full px-4 py-2 bg-[#18181b] border border-gray-700 rounded-md text-base"
        >
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          본문
        </label>
        <Editor
          ref={toastEditorRef}
          initialValue={initial?.content || ""}
          autofocus={false}
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
          useCommandShortcut={true}
          theme="dark"
          hideModeSwitch={false}
        />
      </div>

      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          작업기간
        </label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-4 py-2 bg-[#18181b] border border-gray-700 rounded-md text-base"
          placeholder="예: 2024.01 ~ 2024.03"
        />
      </div>

      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          태그
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddTag())
            }
            className="flex-1 px-4 py-2 bg-[#18181b] border border-gray-700 rounded-md text-base"
            placeholder="태그 입력 후 Enter"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-gradient-to-r from-[#334155] to-[#475569] text-white text-sm rounded-md"
          >
            추가
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center bg-gray-700 text-gray-200 px-3 py-1 text-sm rounded-md"
            >
              #{tag}
              <button
                type="button"
                className="ml-2 text-gray-400 hover:text-white"
                onClick={() => handleRemoveTag(tag)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          썸네일 이미지
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600 rounded-md"
        />
        {typeof initial?.thumbnail === "string" && (
          <div className="mt-2">
            <img
              src={
                initial.thumbnail.startsWith("/uploads/")
                  ? `${API_BASE_URL}${initial.thumbnail}`
                  : initial.thumbnail
              }
              alt="기존 썸네일"
              className="h-32 rounded-md border border-gray-700 object-cover"
            />
          </div>
        )}
      </div>

      {(formError || error) && (
        <div className="text-red-400 text-sm font-semibold mt-2">
          {formError || error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleRegister}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-md hover:from-blue-700 hover:to-blue-500 disabled:opacity-60"
          disabled={loading || disabled}
        >
          {isEdit ? "수정하기" : "등록하기"}
        </button>
      </div>
    </div>
  );
}
