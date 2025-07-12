import { useState } from "react";

export interface ProjectFormProps {
  initial?: {
    title?: string;
    summary?: string;
    tags?: string[];
    thumbnail?: string;
  };
  onSubmit: (data: {
    title: string;
    summary: string;
    tags: string[];
    thumbnail?: File | null;
  }) => void;
  isEdit?: boolean;
  loading?: boolean;
  error?: string;
}

export default function ProjectForm({
  initial,
  onSubmit,
  isEdit,
  loading,
  error,
}: ProjectFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [summary, setSummary] = useState(initial?.summary || "");
  const [tags, setTags] = useState<string[]>(initial?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

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
    onSubmit({ title, summary, tags, thumbnail });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">설명</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">태그</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddTag())
            }
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="태그 입력 후 Enter"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            추가
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => handleRemoveTag(tag)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          썸네일 이미지
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-gray-100 file:to-gray-200 file:text-gray-700 hover:file:from-gray-200 hover:file:to-gray-300"
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
        {initial?.thumbnail && !thumbnail && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">현재 썸네일:</p>
            <img
              src={initial.thumbnail}
              alt="현재 썸네일"
              className="h-32 rounded-md border border-gray-200 object-cover"
            />
          </div>
        )}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-md font-bold"
        disabled={loading}
      >
        {isEdit ? "수정하기" : "등록하기"}
      </button>
    </form>
  );
}
