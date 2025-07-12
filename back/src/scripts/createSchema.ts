import { pool } from "../util/db";

async function createSchema() {
  try {
    // 1. 스키마 생성
    await pool.query(`
      CREATE SCHEMA IF NOT EXISTS apol_schema;
    `);
    console.log("✅ 스키마 생성 완료: apol_schema");

    // 2. 테이블 생성
    await pool.query(`
      CREATE TABLE IF NOT EXISTS apol_schema.projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        summary TEXT,
        content TEXT,
        tags TEXT[],
        thumbnail VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ 테이블 생성 완료: apol_schema.projects");

    // 3. 샘플 데이터 삽입 (선택사항)
    const sampleData = [
      {
        title: "포트폴리오 웹사이트",
        summary: "React와 Next.js를 사용한 개인 포트폴리오 웹사이트",
        content:
          "이 프로젝트는 React와 Next.js를 사용하여 개발된 개인 포트폴리오 웹사이트입니다. TypeScript를 사용하여 타입 안정성을 보장하고, Tailwind CSS로 스타일링을 구현했습니다.",
        tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        thumbnail: "/api/images/portfolio-thumbnail.jpg",
      },
      {
        title: "할일 관리 앱",
        summary: "Vue.js와 Firebase를 사용한 실시간 할일 관리 애플리케이션",
        content:
          "Vue.js 3와 Firebase를 활용하여 실시간으로 할일을 관리할 수 있는 웹 애플리케이션을 개발했습니다. 사용자 인증, 실시간 데이터 동기화, 푸시 알림 기능을 포함합니다.",
        tags: ["Vue.js", "Firebase", "JavaScript", "PWA"],
        thumbnail: "/api/images/todo-thumbnail.jpg",
      },
    ];

    for (const data of sampleData) {
      await pool.query(
        `
        INSERT INTO apol_schema.projects (title, summary, content, tags, thumbnail)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT DO NOTHING;
      `,
        [data.title, data.summary, data.content, data.tags, data.thumbnail]
      );
    }
    console.log("✅ 샘플 데이터 삽입 완료");

    console.log("🎉 모든 스키마 및 테이블 생성이 완료되었습니다!");
  } catch (error) {
    console.error("❌ 스키마 생성 실패:", error);
  } finally {
    await pool.end();
  }
}

createSchema();
