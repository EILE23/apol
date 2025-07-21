import { Pool } from "pg";
import fs from "fs/promises";
import path from "path";

// DB 연결 설정
const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT || 5432),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

// 마크다운 파일 저장 경로
const MARKDOWN_DIR = path.resolve(__dirname, "../markdown");

async function migrate() {
  try {
    // 폴더 없으면 생성
    await fs.mkdir(MARKDOWN_DIR, { recursive: true });

    // DB에서 content 조회
    const { rows } = await pool.query(`
      SELECT id, content FROM apol_schema.projects WHERE content IS NOT NULL
    `);

    for (const row of rows) {
      const { id, content } = row;
      const filename = `project-${id}.md`;
      const filePath = path.join(MARKDOWN_DIR, filename);

      // 마크다운 파일 저장
      await fs.writeFile(filePath, content, "utf-8");

      // contentPath 업데이트
      await pool.query(
        `UPDATE apol_schema.projects SET contentPath = $1 WHERE id = $2`,
        [filename, id]
      );

      console.log(` 프로젝트 ${id} → ${filename} 저장 완료`);
    }

    console.log(" 마이그레이션 완료!");
    process.exit(0);
  } catch (err) {
    console.error(" 마이그레이션 실패:", err);
    process.exit(1);
  }
}

migrate();
