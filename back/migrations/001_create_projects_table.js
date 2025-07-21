exports.up = async (pgm) => {
  await pgm.createSchema("apol_schema", { ifNotExists: true });

  await pgm.createTable(
    { schema: "apol_schema", name: "projects" },
    {
      id: { type: "serial", primaryKey: true },
      title: { type: "varchar(255)", notNull: true },
      summary: { type: "text" },
      '"contentPath"': { type: "text" },
      tags: { type: "text[]" },
      thumbnail: { type: "varchar(255)" },
      duration: { type: "text" },
      created_at: { type: "timestamp", default: pgm.func("now()") },
      updated_at: { type: "timestamp", default: pgm.func("now()") },
    },
    { ifNotExists: true }
  );

  //  조건부로 컬럼 추가
  await pgm.db.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'apol_schema' 
        AND table_name = 'projects' 
        AND column_name = 'contentPath'
      ) THEN
        ALTER TABLE "apol_schema"."projects" ADD COLUMN "contentPath" TEXT;
      END IF;
    END$$;
  `);
};
const down = (pgm) => {
  // 테이블 삭제
  pgm.dropTable({ schema: "apol_schema", name: "projects" });
  // 스키마 삭제
  pgm.dropSchema("apol_schema");
};

module.exports = { up, down };
