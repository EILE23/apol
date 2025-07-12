import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";

const router = Router();

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

export default router;
