import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser as ProseMirrorDOMParser } from "prosemirror-model";
import { schema as basicSchema } from "prosemirror-schema-basic";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import "prosemirror-view/style/prosemirror.css";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";

export interface ProjectFormProps {
  initial?: {
    title?: string;
    summary?: string;
    tags?: string[];
    thumbnail?: string;
    content?: string; // HTML 본문
    duration?: string; // 작업기간
  };
  onSubmit: (data: {
    title: string;
    summary: string;
    tags: string[];
    thumbnail?: File | null;
    content: string; // HTML 본문
    duration?: string; // 작업기간
  }) => void;
  isEdit?: boolean;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
}

function isContentValid(content: string) {
  // HTML 태그 제거 후 텍스트가 남아있으면 true
  return content.replace(/<[^>]*>/g, "").replace(/\s/g, "") !== "";
}

export default function ProjectForm({
  initial,
  onSubmit,
  isEdit,
  loading,
  error,
  disabled,
}: ProjectFormProps) {
  const [content, setContent] = useState(initial?.content || "");
  const [title, setTitle] = useState(initial?.title || "");
  const [summary, setSummary] = useState(initial?.summary || "");
  const [tags, setTags] = useState<string[]>(initial?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [duration, setDuration] = useState(initial?.duration || "");
  const [formError, setFormError] = useState<string>("");
  const router = useRouter();
  const toastEditorRef = useRef<any>(null);

  const ToastEditor = dynamic(
    () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
    { ssr: false }
  );

  // ProseMirror 에디터 관련 코드(useEffect, editorRef, viewRef 등) 완전 삭제

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleRegister = async () => {
    setFormError("");
    if (!title.trim() || !isContentValid(content)) {
      setFormError("제목과 내용은 필수입니다.");
      return;
    }
    try {
      await onSubmit({
        title,
        summary,
        tags,
        thumbnail,
        content,
        duration,
      });
    } catch (e) {
      setFormError("등록 중 오류가 발생했습니다.");
    }
  };

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  return (
    <div className="space-y-8 text-white max-w-2xl mx-auto px-4 py-8">
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

      {/* 소개글 */}
      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          소개글
        </label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full px-4 py-2 bg-[#18181b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/60 rounded-md text-base"
          placeholder="이 프로젝트를 한 줄로 소개해 주세요."
        />
      </div>

      {/* 본문(ProseMirror) */}
      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          본문
        </label>
        <ToastEditor
          ref={toastEditorRef}
          initialValue={content}
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
          useCommandShortcut={true}
          onChange={() => {
            const data = toastEditorRef.current?.getInstance().getMarkdown();
            setContent(data);
          }}
          hideModeSwitch={false}
        />
      </div>

      {/* 작업기간 */}
      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          작업기간
        </label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-4 py-2 bg-[#18181b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/60 rounded-md text-base"
          placeholder="예: 2024.01 ~ 2024.03"
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
      </div>

      {/* 에러 메시지 */}
      {(formError || error) && (
        <div className="text-red-400 text-sm font-semibold mt-2">
          {formError || error}
        </div>
      )}

      {/* 등록 버튼 */}
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
