import { useState, useEffect } from "react";
import { isAdminLoggedIn } from "../util/auth";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import StatsCards from "../components/dashboard/StatsCards";
import LogsTable from "../components/dashboard/LogsTable";

interface AccessLog {
  id: number;
  timestamp: string;
  ip: string;
  user_agent: string;
  referrer?: string;
  path: string;
  method: string;
  status_code: number;
  response_time: number;
}

interface AccessStats {
  totalVisits: number;
  uniqueIPs: number;
  todayVisits: number;
  todayUniqueIPs: number;
  weekUniqueIPs: number;
  monthUniqueIPs: number;
  topPaths: Array<{ path: string; count: number }>;
}

export default function Dashboard() {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [stats, setStats] = useState<AccessStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    if (typeof window !== "undefined" && !isAdminLoggedIn()) {
      window.location.href = "/login";
      return;
    }
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const [logsRes, statsRes] = await Promise.all([
        fetch(
          `${API_BASE_URL}/api/access-logs/logs?page=${currentPage}&limit=50`
        ),
        fetch(`${API_BASE_URL}/api/access-logs/stats`),
      ]);

      if (logsRes.ok && statsRes.ok) {
        const logsData = await logsRes.json();
        const statsData = await statsRes.json();
        setLogs(logsData.logs);
        setPagination(logsData.pagination);
        setStats(statsData);
      } else {
        setError("데이터를 불러오는데 실패했습니다.");
      }
    } catch (err) {
      setError("서버 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
        <Header type="projects" />
        <main className="pt-20 flex-1">
          <div className="max-w-6xl mx-auto px-8 py-12">
            <div className="text-center text-gray-400">로딩 중...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Header type="projects" />
      <main className="pt-20 flex-1">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-8">
            접속 로그 대시보드
          </h1>

          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* 통계 카드 */}
          {stats && <StatsCards stats={stats} />}

          {/* 인기 경로 */}
          {stats && stats.topPaths.length > 0 && (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                인기 경로
              </h3>
              <div className="space-y-2">
                {stats.topPaths.map((path, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-300 font-mono text-sm">
                      {path.path}
                    </span>
                    <span className="text-blue-400 font-semibold">
                      {path.count}회
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 접속 로그 테이블 */}
          <LogsTable
            logs={logs}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
