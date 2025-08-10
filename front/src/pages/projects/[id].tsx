"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import { projectApi, Project } from "../../util/api";
import PostDetail, {
  PostDetailData,
} from "../../features/portfolio/PostDetail";
import { isAdminLoggedIn } from "../../util/auth";

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchProject();
    }
  }, [id]);

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn());
  }, []);

  const fetchProject = async () => {
    try {
      const data = await projectApi.getById(id as string);
      const contentText = await projectApi.getContent(id as string);
      setProject(data);
      setContent(contentText);
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
  const handleDelete = async () => {
    if (!project || !confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await projectApi.delete(project.id);
      router.push("/projects");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "프로젝트 삭제에 실패했습니다."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
        <Header type="projects" />
        <main className="pt-20 flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="text-gray-500">프로젝트를 불러오는 중...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
        <Header type="projects" />
        <main className="pt-20 flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="text-red-500">
                {error || "프로젝트를 찾을 수 없습니다."}
              </div>
              <Link
                href="/projects"
                className="mt-4 inline-block text-blue-600 hover:text-blue-800"
              >
                프로젝트 목록으로 돌아가기
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const postDetailData: PostDetailData = {
    id: project.id,
    title: project.title,
    description: project.summary,
    fullDescription: content,
    image: project.thumbnail,
    technologies: project.tags,
    date: project.createdAt,
    category: project.category,
    content: content,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Header type="projects" />
      <main className="pt-20 flex-1">
        <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 py-12">
          <PostDetail post={postDetailData} />
          {isAdmin ? (
            <div className="flex gap-3 justify-end mt-8">
              <Link
                href={`/projects/${project.id}/edit`}
                className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-md hover:from-gray-600 hover:to-gray-500"
              >
                수정
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-md hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          ) : null}
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center text-gray-300 hover:text-white"
            >
              ← 프로젝트 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
