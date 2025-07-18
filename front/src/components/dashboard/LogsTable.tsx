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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface LogsTableProps {
  logs: AccessLog[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export default function LogsTable({
  logs,
  pagination,
  onPageChange,
}: LogsTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR");
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "text-green-400";
    if (statusCode >= 400 && statusCode < 500) return "text-yellow-400";
    if (statusCode >= 500) return "text-red-400";
    return "text-gray-400";
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white">최근 접속 로그</h3>
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
                  <span className="font-mono">{log.method}</span> {log.path}
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

      {/* 페이지네이션 */}
      {pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              총 {pagination.total.toLocaleString()}개 중{" "}
              {(pagination.page - 1) * pagination.limit + 1}-
              {Math.min(pagination.page * pagination.limit, pagination.total)}개
              표시
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>

              <div className="flex items-center space-x-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    const pageNum =
                      Math.max(
                        1,
                        Math.min(pagination.totalPages - 4, pagination.page - 2)
                      ) + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`px-3 py-1 text-sm rounded ${
                          pageNum === pagination.page
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}
              </div>

              <button
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={!pagination.hasNext}
                className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
