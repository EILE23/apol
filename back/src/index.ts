import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes/main.route";
import projectRouter from "./routes/project.route";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/main", mainRouter);

app.use("/api/projects", projectRouter);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send(" 백엔드 서버 작동 중");
});

app.listen(PORT, () => {
  console.log(` 서버 실행 중: http://localhost:${PORT}`);
});
