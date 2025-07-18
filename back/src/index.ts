import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes/main.route";
import projectRouter from "./routes/project.route";
import accessLogRouter from "./routes/accessLog.route";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { pool } from "./util/db";
import { accessLogMiddleware } from "./middleware/accessLog.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Trust proxy to get real IP addresses
app.set("trust proxy", true);

app.use(
  cors({
    origin: ["https://apol.site", "https://www.apol.site"],
    credentials: true,
  })
);
app.use(express.json({ limit: "100mb" }));

// Access logging middleware
app.use(accessLogMiddleware);

app.use("/api/main", mainRouter);
app.use("/api/projects", projectRouter);
app.use("/api/access-logs", accessLogRouter);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send(" 백엔드 서버 작동 중");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

app.listen(PORT, () => {
  console.log(` 서버 실행 중: http://localhost:${PORT}`);

  // apol_schema.projects 테이블 직접 select 테스트
  // (async () => {
  //   try {
  //     const res = await pool.query('SELECT * FROM "apol_schema.projects"');
  //     console.log("직접 select 결과:", res.rows);
  //   } catch (err) {
  //     console.error("직접 select 에러:", err);
  //   }
  // })();
});
