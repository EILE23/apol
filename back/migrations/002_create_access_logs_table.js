const up = (pgm) => {
  // 접속 로그 테이블 생성
  pgm.createTable(
    { schema: "apol_schema", name: "access_logs" },
    {
      id: { type: "serial", primaryKey: true },
      timestamp: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("now()"),
      },
      ip: { type: "varchar(45)", notNull: true },
      user_agent: { type: "text", notNull: true },
      referrer: { type: "text" },
      path: { type: "varchar(255)", notNull: true },
      method: { type: "varchar(10)", notNull: true },
      status_code: { type: "integer", notNull: true },
      response_time: { type: "integer", notNull: true },
      created_at: { type: "timestamp", default: pgm.func("now()") },
      updated_at: { type: "timestamp", default: pgm.func("now()") },
    }
  );

  // 인덱스 생성 (정상 컬럼 기준)
  pgm.createIndex({ schema: "apol_schema", name: "access_logs" }, "timestamp", {
    name: "idx_access_logs_timestamp",
  });

  pgm.createIndex({ schema: "apol_schema", name: "access_logs" }, "ip", {
    name: "idx_access_logs_ip",
  });

  pgm.createIndex({ schema: "apol_schema", name: "access_logs" }, "path", {
    name: "idx_access_logs_path",
  });
};

const down = (pgm) => {
  // 테이블 삭제
  pgm.dropTable({ schema: "apol_schema", name: "access_logs" });
};

module.exports = { up, down };
