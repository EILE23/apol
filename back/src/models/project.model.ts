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
  created_at?: Date;
  updated_at?: Date;
}

export class ProjectModel {
  static async getAll(): Promise<Project[]> {
    const start = Date.now();

    const { rows } = await pool.query(
      `SELECT id, title, summary, tags, thumbnail, duration, created_at
        FROM "apol_schema"."projects"
        ORDER BY id DESC`
    );

    console.log("쿼리 소요 시간:", Date.now() - start, "ms");
    return rows;
  }

  static async getById(id: string): Promise<Project | null> {
    const { rows } = await pool.query(
      'SELECT * FROM "apol_schema"."projects" WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  static async create(
    projectData: Omit<Project, "id" | "created_at" | "updated_at">
  ): Promise<Project> {
    const { title, summary, tags, thumbnail, duration, contentPath } =
      projectData;
    const { rows } = await pool.query(
      `INSERT INTO "apol_schema"."projects" (title, summary, tags, thumbnail, duration,contentpath)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, summary, tags, thumbnail, duration, contentPath]
    );
    return rows[0];
  }

  static async update(
    id: string,
    projectData: Partial<Omit<Project, "id" | "created_at">>
  ): Promise<Project | null> {
    const fields = [];
    const values = [];
    let idx = 1;
    for (const key in projectData) {
      fields.push(`${key} = $${idx}`);
      values.push((projectData as any)[key]);
      idx++;
    }
    if (fields.length === 0) return this.getById(id);
    values.push(id);
    const { rows } = await pool.query(
      `UPDATE "apol_schema"."projects" SET ${fields.join(
        ", "
      )}, updated_at = NOW() WHERE id = $${idx} RETURNING *`,
      values
    );
    return rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM "apol_schema"."projects" WHERE id = $1',
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  }
}
