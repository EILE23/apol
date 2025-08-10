import { pool } from "../util/db";

export interface Project {
  id: number;
  title?: string;
  summary?: string;
  content?: string;
  tags?: string[];
  thumbnail?: string;
  duration?: string;
  contentPath?: string;
  createdAt?: Date;
  updatedAt?: Date;
  category?: string;
}

export class ProjectModel {
  static async getAll(): Promise<Project[]> {
    const start = Date.now();

    const { rows } = await pool.query(
      `SELECT id, "title", "summary", "tags", "thumbnail", "duration", "category", "createdAt"
     FROM "apol_schema"."projects"
     ORDER BY id DESC`
    );

    console.log("쿼리 소요 시간:", Date.now() - start, "ms");
    return rows;
  }

  static async getById(id: string): Promise<Project | null> {
    const { rows } = await pool.query(
      `SELECT * FROM "apol_schema"."projects" WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  static async create(
    projectData: Omit<Project, "id" | "created_at" | "updated_at">
  ): Promise<Project> {
    const { title, summary, tags, thumbnail, duration, contentPath, category } =
      projectData;

    const { rows } = await pool.query(
      `INSERT INTO "apol_schema"."projects" 
     ("title", "summary", "tags", "thumbnail", "duration", "contentPath", "category")
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
      [title, summary, tags, thumbnail, duration, contentPath, category]
    );

    return rows[0];
  }

  static async update(
    id: string,
    projectData: Partial<Omit<Project, "id" | "created_at">>
  ): Promise<Project | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const key in projectData) {
      // 쌍따옴표 포함된 camelCase로 컬럼명 처리
      fields.push(`"${key}" = $${idx}`);
      values.push((projectData as any)[key]);
      idx++;
    }

    if (fields.length === 0) return this.getById(id);

    values.push(id);
    const { rows } = await pool.query(
      `UPDATE "apol_schema"."projects" 
       SET ${fields.join(", ")}, "updatedAt" = NOW()
       WHERE id = $${idx}
       RETURNING *`,
      values
    );

    return rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM "apol_schema"."projects" WHERE id = $1`,
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  }
}
