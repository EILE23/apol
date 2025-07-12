import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkSchema() {
  try {
    console.log("스키마 확인 중...");
    const client = await pool.connect();

    // 모든 스키마 확인
    const schemasResult = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
    `);
    console.log(
      "📋 존재하는 스키마:",
      schemasResult.rows.map((row) => row.schema_name)
    );

    // 모든 테이블 확인
    const tablesResult = await client.query(`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_schema NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
    `);
    console.log("📋 존재하는 테이블:", tablesResult.rows);

    // public 스키마의 테이블 확인
    const publicTablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("📋 public 스키마의 테이블:", publicTablesResult.rows);

    client.release();
  } catch (error) {
    console.error("❌ 확인 실패:", error.message);
  } finally {
    await pool.end();
  }
}

checkSchema();
