// categorys.ts

export type CategoryType = "project" | "study" | "record";

export interface Category {
  key: CategoryType;
  label: string;
}

export const categories: Category[] = [
  { key: "project", label: "프로젝트" },
  { key: "study", label: "개인 공부" },
  { key: "record", label: "기록" },
];
