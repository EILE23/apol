import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p className="text-gray-400">에디터 로딩 중...</p>,
});

import "react-quill/dist/quill.snow.css";

// quill-image-resize-module 적용
import { Quill } from "react-quill";
// 타입 선언이 없으므로 직접 선언
// @ts-ignore
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);

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

// 본문에 텍스트 또는 이미지가 하나라도 있으면 true (공백/줄바꿈/탭 등 제외)
function isContentValid(content: string) {
  const hasText = content.replace(/[\s\n\r\t]/g, "") !== "";
  const hasHtmlImage = /<img[^>]*src=['\"][^'\"]+['\"][^>]*>/.test(content);
  return hasText || hasHtmlImage;
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
  const [formError, setFormError] = useState<string>("");
  const router = useRouter();

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // 등록 버튼 클릭 핸들러
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

  // Quill 에디터 설정
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    imageResize: {},
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

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

      {/* 소개글 입력 */}
      <div className="mb-6">
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          소개글 (카드/상세에 표시될 간단 요약)
        </label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full px-4 py-2 bg-[#18181b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/60 rounded-md text-base"
          placeholder="이 프로젝트를 한 줄로 소개해 주세요."
        />
      </div>

      {/* 본문(react-quill) */}
      <div>
        <label className="block text-lg text-gray-200 font-semibold mb-2">
          본문 (HTML 지원)
        </label>
        <div className="bg-[#18181b] border border-gray-700 rounded-md">
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={quillModules}
            formats={quillFormats}
            placeholder="프로젝트 내용을 작성해 주세요..."
            className="text-white"
            style={{
              height: "400px",
            }}
          />
        </div>
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
      </div>

      {/* 에러 메시지 */}
      {formError && (
        <div className="text-red-400 text-sm font-semibold mt-2">
          {formError}
        </div>
      )}
      {error && (
        <div className="text-red-400 text-sm font-semibold mt-2">{error}</div>
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
