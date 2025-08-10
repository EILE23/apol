export type CategoryType = "project" | "study" | "record";

export interface Category {
  key: CategoryType;
  label: string;
  /** Tailwind 배경색 클래스. 필요하면 HEX로 바꿔서 inline style 써도 됨 */
  color: string;
}

export const categories: Category[] = [
  { key: "project", label: "프로젝트", color: "bg-indigo-500" },
  { key: "study", label: "개인 공부", color: "bg-emerald-500" },
  { key: "record", label: "기록", color: "bg-amber-500" },
];
