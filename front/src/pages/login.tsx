import { useState } from "react";
import { useRouter } from "next/router";
import { loginAsAdmin } from "../util/auth";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === "asd123" && pw === "asd123") {
      loginAsAdmin();
      router.push("/");
    } else {
      setError("ID 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] to-[#111113] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-black/70 rounded-xl p-8 shadow-xl w-full max-w-sm flex flex-col gap-6 border border-gray-800"
      >
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          관리자 로그인
        </h1>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="px-4 py-2 rounded bg-[#23272f] border border-gray-700 text-white focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="px-4 py-2 rounded bg-[#23272f] border border-gray-700 text-white focus:outline-none"
        />
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-[#23272f] to-[#18181b] text-white font-semibold rounded hover:from-[#2d323a] hover:to-[#23272f]"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
