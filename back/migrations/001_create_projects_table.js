/* eslint-disable camelcase */

const up = (pgm) => {
  // 스키마 생성
  pgm.createSchema("apol_schema", { ifNotExists: true });

  // 프로젝트 테이블 생성
  pgm.createTable(["apol_schema", "projects"], {
    id: { type: "serial", primaryKey: true },
    title: { type: "varchar(255)", notNull: true },
    summary: { type: "text" },
    content: { type: "text" },
    tags: { type: "text[]" },
    thumbnail: { type: "varchar(255)" },
    duration: { type: "text" },
    created_at: { type: "timestamp", default: pgm.func("now()") },
    updated_at: { type: "timestamp", default: pgm.func("now()") },
  });
};

const down = (pgm) => {
  // 테이블 삭제
  pgm.dropTable(["apol_schema", "projects"]);
  // 스키마 삭제
  pgm.dropSchema("apol_schema");
};

module.exports = { up, down };
