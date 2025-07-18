import { pool } from "../util/db";

export interface AccessLog {
  id: number;
  timestamp: Date;
  ip: string;
  user_agent: string;
  referrer?: string;
  path: string;
  method: string;
  status_code: number;
  response_time: number;
  created_at: Date;
  updated_at: Date;
}

export class AccessLogModel {
  static async create(
    logData: Omit<AccessLog, "id" | "created_at" | "updated_at">
  ): Promise<AccessLog> {
    const {
      timestamp,
      ip,
      user_agent,
      referrer,
      path,
      method,
      status_code,
      response_time,
    } = logData;
    const { rows } = await pool.query(
      `INSERT INTO "apol_schema"."access_logs" (timestamp, ip, user_agent, referrer, path, method, status_code, response_time)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        timestamp,
        ip,
        user_agent,
        referrer,
        path,
        method,
        status_code,
        response_time,
      ]
    );
    return rows[0];
  }

  static async getAll(limit: number = 100): Promise<AccessLog[]> {
    const { rows } = await pool.query(
      `SELECT * FROM "apol_schema"."access_logs"
       ORDER BY timestamp DESC
       LIMIT $1`,
      [limit]
    );
    return rows;
  }

  static async getAllWithPagination(
    limit: number = 50,
    offset: number = 0
  ): Promise<AccessLog[]> {
    const { rows } = await pool.query(
      `SELECT * FROM "apol_schema"."access_logs"
       ORDER BY timestamp DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return rows;
  }

  static async getTotalCount(): Promise<number> {
    const { rows } = await pool.query(
      'SELECT COUNT(*) as total FROM "apol_schema"."access_logs"'
    );
    return parseInt(rows[0].total);
  }

  static async getStats(): Promise<{
    totalVisits: number;
    uniqueIPs: number;
    todayVisits: number;
    topPaths: Array<{ path: string; count: number }>;
  }> {
    // Total visits
    const totalResult = await pool.query(
      'SELECT COUNT(*) as total FROM "apol_schema"."access_logs"'
    );
    const totalVisits = parseInt(totalResult.rows[0].total);

    // Unique IPs
    const uniqueResult = await pool.query(
      'SELECT COUNT(DISTINCT ip) as unique_ips FROM "apol_schema"."access_logs"'
    );
    const uniqueIPs = parseInt(uniqueResult.rows[0].unique_ips);

    // Today's visits
    const todayResult = await pool.query(
      `SELECT COUNT(*) as today FROM "apol_schema"."access_logs"
       WHERE DATE(timestamp) = CURRENT_DATE`
    );
    const todayVisits = parseInt(todayResult.rows[0].today);

    // Top paths
    const topPathsResult = await pool.query(
      `SELECT path, COUNT(*) as count FROM "apol_schema"."access_logs"
       GROUP BY path
       ORDER BY count DESC
       LIMIT 10`
    );
    const topPaths = topPathsResult.rows;

    return {
      totalVisits,
      uniqueIPs,
      todayVisits,
      topPaths,
    };
  }
}
