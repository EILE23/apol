import { useState, useEffect } from "react";
import { isAdminLoggedIn } from "../util/auth";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

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
  topPaths: Array<{ path: string; count: number }>;
}

export default function Dashboard() {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [stats, setStats] = useState<AccessStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    if (typeof window !== "undefined" && !isAdminLoggedIn()) {
      window.location.href = "/login";
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [logsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/access-logs/logs?limit=50`),
        fetch(`${API_BASE_URL}/api/access-logs/stats`),
      ]);

      if (logsRes.ok && statsRes.ok) {
        const logsData = await logsRes.json();
        const statsData = await statsRes.json();
        setLogs(logsData);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR");
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "text-green-400";
    if (statusCode >= 400 && statusCode < 500) return "text-yellow-400";
    if (statusCode >= 500) return "text-red-400";
    return "text-gray-400";
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
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h3 className="text-gray-400 text-sm font-medium mb-2">
                  총 방문수
                </h3>
                <p className="text-3xl font-bold text-white">
                  {stats.totalVisits.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h3 className="text-gray-400 text-sm font-medium mb-2">
                  고유 IP 수
                </h3>
                <p className="text-3xl font-bold text-white">
                  {stats.uniqueIPs.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h3 className="text-gray-400 text-sm font-medium mb-2">
                  오늘 방문수
                </h3>
                <p className="text-3xl font-bold text-white">
                  {stats.todayVisits.toLocaleString()}
                </p>
              </div>
            </div>
          )}

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
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">
                최근 접속 로그
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      시간
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      IP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      경로
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      응답시간
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-700/30">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                        {log.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span className="font-mono">{log.method}</span>{" "}
                        {log.path}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`font-semibold ${getStatusColor(
                            log.status_code
                          )}`}
                        >
                          {log.status_code}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {log.response_time}ms
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
