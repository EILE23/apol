import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import multer from "multer";
import path from "path";
import { uploadImageToS3 } from "../controllers/upload.controller";
const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

// GET /api/projects - 모든 프로젝트 조회
router.get("/", ProjectController.getAllProjects);

router.get("/:id/content", ProjectController.getProjectContent);

// GET /api/projects/:id - 특정 프로젝트 조회
router.get("/:id", ProjectController.getProjectById);

// POST /api/projects - 새 프로젝트 생성
router.post("/", ProjectController.createProject);

// PUT /api/projects/:id - 프로젝트 수정
router.put("/:id", ProjectController.updateProject);

// DELETE /api/projects/:id - 프로젝트 삭제
router.delete("/:id", ProjectController.deleteProject);

// 이미지 업로드
router.post("/upload", upload.single("image"), uploadImageToS3);

export default router;
