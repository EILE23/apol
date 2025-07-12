import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testQuery() {
  try {
    console.log("쿼리 테스트 중...");
    const client = await pool.connect();

    // 직접 쿼리 실행
    const result = await client.query(
      'SELECT * FROM "apol_schema.projects" ORDER BY id DESC'
    );
    console.log("✅ 쿼리 성공!");
    console.log("📊 결과 개수:", result.rows.length);
    console.log("📋 데이터:", result.rows);

    client.release();
  } catch (error) {
    console.error("❌ 쿼리 실패:", error.message);
  } finally {
    await pool.end();
  }
}

testQuery();
