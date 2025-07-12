import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    console.log("데이터베이스 연결 테스트 중...");
    const client = await pool.connect();
    console.log("✅ 데이터베이스 연결 성공!");

    // 테이블 존재 확인
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'apol_schema' AND table_name = 'projects'
    `);

    if (result.rows.length > 0) {
      console.log("✅ apol_schema.projects 테이블 존재 확인!");

      // 데이터 개수 확인
      const countResult = await client.query(
        "SELECT COUNT(*) FROM apol_schema.projects"
      );
      console.log(`📊 프로젝트 개수: ${countResult.rows[0].count}`);

      // 샘플 데이터 확인
      const dataResult = await client.query(
        "SELECT * FROM apol_schema.projects LIMIT 5"
      );
      console.log("📋 샘플 데이터:", dataResult.rows);
    } else {
      console.log("❌ apol_schema.projects 테이블이 존재하지 않습니다.");
    }

    client.release();
  } catch (error) {
    console.error("❌ 데이터베이스 연결 실패:", error.message);
  } finally {
    await pool.end();
  }
}

testConnection();
