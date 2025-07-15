import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 서버가 완전히 실행된 후 pool 쿼리 실행
(async () => {
  try {
    const res = await pool.query(
      "SELECT table_schema, table_name FROM information_schema.tables WHERE table_name = 'projects';"
    );
    console.log("서버에서 보는 projects 테이블:", res.rows);
  } catch (err) {
    console.error("테이블 조회 중 에러:", err);
  }
})();
