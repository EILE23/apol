interface AccessStats {
  totalVisits: number;
  uniqueIPs: number;
  todayVisits: number;
  todayUniqueIPs: number;
  weekUniqueIPs: number;
  monthUniqueIPs: number;
  topPaths: Array<{ path: string; count: number }>;
}

interface StatsCardsProps {
  stats: AccessStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <>
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
          <h3 className="text-blue-400 text-sm font-medium mb-2">
            총 고유 방문자
          </h3>
          <p className="text-3xl font-bold text-white">
            {stats.uniqueIPs.toLocaleString()}
          </p>
          <p className="text-xs text-blue-300 mt-1">전체 기간</p>
        </div>
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-6">
          <h3 className="text-green-400 text-sm font-medium mb-2">
            오늘 고유 방문자
          </h3>
          <p className="text-3xl font-bold text-white">
            {stats.todayUniqueIPs?.toLocaleString() || 0}
          </p>
          <p className="text-xs text-green-300 mt-1">오늘</p>
        </div>
        <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-6">
          <h3 className="text-purple-400 text-sm font-medium mb-2">
            이번 주 고유 방문자
          </h3>
          <p className="text-3xl font-bold text-white">
            {stats.weekUniqueIPs?.toLocaleString() || 0}
          </p>
          <p className="text-xs text-purple-300 mt-1">최근 7일</p>
        </div>
        <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-6">
          <h3 className="text-orange-400 text-sm font-medium mb-2">
            이번 달 고유 방문자
          </h3>
          <p className="text-3xl font-bold text-white">
            {stats.monthUniqueIPs?.toLocaleString() || 0}
          </p>
          <p className="text-xs text-orange-300 mt-1">최근 30일</p>
        </div>
      </div>

      {/* 추가 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium mb-2">
            총 페이지뷰
          </h3>
          <p className="text-2xl font-bold text-white">
            {stats.totalVisits.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">모든 요청 포함</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium mb-2">
            오늘 페이지뷰
          </h3>
          <p className="text-2xl font-bold text-white">
            {stats.todayVisits.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">오늘의 모든 요청</p>
        </div>
      </div>
    </>
  );
}
