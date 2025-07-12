import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkData() {
  try {
    console.log("데이터 확인 중...");
    const client = await pool.connect();

    // public 스키마의 apol_schema.projects 테이블 확인
    const dataResult = await client.query(
      'SELECT * FROM "apol_schema.projects"'
    );
    console.log("📋 테이블 데이터:", dataResult.rows);

    // 테이블 구조 확인
    const structureResult = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'apol_schema.projects'
    `);
    console.log("📋 테이블 구조:", structureResult.rows);

    client.release();
  } catch (error) {
    console.error("❌ 확인 실패:", error.message);
  } finally {
    await pool.end();
  }
}

checkData();
