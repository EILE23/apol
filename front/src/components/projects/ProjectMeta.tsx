export default function ProjectMeta({ duration }: { duration?: string }) {
  return (
    <div className="flex items-center gap-2 mb-1 text-left">
      <span className="text-gray-400 text-sm font-semibold">작업기간</span>
      <span className="text-blue-300 font-bold">{duration || "8일"}</span>
    </div>
  );
}
