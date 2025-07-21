import { pool } from "../util/db";

async function createSchema() {
  try {
    // 1. 스키마 생성
    await pool.query(`
      CREATE SCHEMA IF NOT EXISTS apol_schema;
    `);
    console.log(" 스키마 생성 완료: apol_schema");

    // 2. 테이블 생성
    await pool.query(`
      CREATE TABLE IF NOT EXISTS apol_schema.projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        summary TEXT,
        content TEXT,
        tags TEXT[],
        thumbnail VARCHAR(255),
        duration TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log(" 테이블 생성 완료: apol_schema.projects");

    // 3. 샘플 데이터 삽입 (선택사항)

    console.log(" 모든 스키마가 생성이 완료되었습니다!");
  } catch (error) {
    console.error(" 스키마 생성 실패:", error);
  } finally {
    await pool.end();
  }
}

createSchema();
