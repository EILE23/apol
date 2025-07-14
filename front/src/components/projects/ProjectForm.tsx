import { useState } from "react";
import dynamic from "next/dynamic";
import { useRef } from "react";
const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  { ssr: false }
);
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

export interface ProjectFormProps {
  initial?: {
    title?: string;
    summary?: string;
    tags?: string[];
    thumbnail?: string;
    content?: string; // markdown 본문
    duration?: string; // 작업기간
  };
  onSubmit: (data: {
    title: string;
    summary: string;
    tags: string[];
    thumbnail?: File | null;
    content: string; // markdown 본문
    duration?: string; // 작업기간
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
  const [content, setContent] = useState(initial?.content || "");
  const [duration, setDuration] = useState(initial?.duration || "");
  const editorRef = useRef<any>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      summary,
      tags,
      thumbnail,
      content,
      duration,
    });
  };

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const editorIns = editorRef.current;
        const markdown = editorIns
          ? editorIns.getInstance().getMarkdown()
          : content;
        onSubmit({
          title,
          summary,
          tags,
          thumbnail,
          content: markdown,
          duration,
        });
      }}
      className="space-y-8 text-white max-w-2xl mx-auto px-4 py-8"
    >
      {/* 제목 */}
      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          제목
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-[#18181b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/60 rounded-md text-base"
          required
        />
      </div>

      {/* 본문(markdown textarea → Toast UI Editor) */}
      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          본문 (Markdown 지원)
        </label>
        <Editor
          ref={editorRef}
          initialValue={content}
          previewStyle="vertical"
          height="400px"
          theme="dark"
          usageStatistics={false}
          hideModeSwitch={true}
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "image", "link", "code", "codeblock"],
          ]}
          hooks={{
            addImageBlobHook: async (blob: any, callback: any) => {
              // 이미지 업로드 API 호출
              const formData = new FormData();
              formData.append("image", blob);
              const API_BASE_URL =
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
              const res = await fetch(`${API_BASE_URL}/api/projects/upload`, {
                method: "POST",
                body: formData,
              });
              const data = await res.json();
              if (data.url) {
                callback(`${API_BASE_URL}${data.url}`, blob.name);
              } else {
                alert("이미지 업로드 실패");
              }
              return false;
            },
          }}
        />
      </div>

      {/* 작업기간 입력 */}
      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          작업기간
        </label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-4 py-2 bg-[#18181b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/60 rounded-md text-base"
          placeholder="예: 2024.01 ~ 2024.03, 2개월, 10일 등"
        />
      </div>

      {/* 태그 */}
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
            className="flex-1 px-4 py-2 bg-[#18181b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/60 rounded-md text-base"
            placeholder="태그 입력 후 Enter"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-gradient-to-r from-[#334155] to-[#475569] text-white text-sm font-semibold rounded-md hover:from-[#3b475a] hover:to-[#556072]"
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

      {/* 썸네일 */}
      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          썸네일 이미지
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600 rounded-md"
        />
        {/* 썸네일 미리보기 */}
        {typeof thumbnail === "string" && thumbnail && (
          <div className="mt-2">
            <img
              src={
                (thumbnail as string).startsWith("/uploads/")
                  ? `${API_BASE_URL}${thumbnail}`
                  : thumbnail
              }
              alt="기존 썸네일"
              className="h-32 rounded-md border border-gray-700 object-cover"
            />
          </div>
        )}
        {thumbnail && typeof thumbnail !== "string" && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="썸네일 미리보기"
              className="h-32 rounded-md border border-gray-700 object-cover"
            />
          </div>
        )}
      </div>

      {/* 에러 */}
      {error && <div className="text-red-500">{error}</div>}

      {/* 제출 버튼 */}
      <button
        type="submit"
        className={`w-full py-3 bg-gradient-to-r from-[#1e293b] to-[#334155] hover:from-[#2c3a50] hover:to-[#445566] text-white font-bold rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {isEdit ? "수정하기" : "등록하기"}
      </button>
    </form>
  );
}
