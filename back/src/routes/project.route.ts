import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET /api/projects - 모든 프로젝트 조회
router.get("/", ProjectController.getAllProjects);

// GET /api/projects/:id - 특정 프로젝트 조회
router.get("/:id", ProjectController.getProjectById);

// POST /api/projects - 새 프로젝트 생성
router.post("/", ProjectController.createProject);

// PUT /api/projects/:id - 프로젝트 수정
router.put("/:id", ProjectController.updateProject);

// DELETE /api/projects/:id - 프로젝트 삭제
router.delete("/:id", ProjectController.deleteProject);

// 이미지 업로드
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "파일이 업로드되지 않았습니다." });
  }
  // 실제 서비스라면, URL을 CDN 등으로 대체
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

export default router;
