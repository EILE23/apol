import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";

export class ProjectController {
  // 모든 프로젝트 조회
  static async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await ProjectService.getAllProjects();
      res.json(projects);
    } catch (error) {
      res
        .status(500)
        .json({ error: "프로젝트 목록을 가져오는데 실패했습니다." });
    }
  }

  // 특정 프로젝트 조회
  static async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await ProjectService.getProjectById(id);

      if (!project) {
        return res.status(404).json({ error: "프로젝트를 찾을 수 없습니다." });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "프로젝트를 가져오는데 실패했습니다." });
    }
  }

  // 새 프로젝트 생성
  static async createProject(req: Request, res: Response) {
    try {
      const { title, summary, content, tags, thumbnail } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: "제목과 내용은 필수입니다." });
      }

      const newProject = await ProjectService.createProject({
        title,
        summary: summary || "",
        content,
        tags: tags || [],
        thumbnail,
      });

      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ error: "프로젝트 생성에 실패했습니다." });
    }
  }

  // 프로젝트 수정
  static async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, summary, content, tags, thumbnail } = req.body;

      const updatedProject = await ProjectService.updateProject(id, {
        title,
        summary,
        content,
        tags,
        thumbnail,
      });

      if (!updatedProject) {
        return res.status(404).json({ error: "프로젝트를 찾을 수 없습니다." });
      }

      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ error: "프로젝트 수정에 실패했습니다." });
    }
  }

  // 프로젝트 삭제
  static async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await ProjectService.deleteProject(id);

      if (!success) {
        return res.status(404).json({ error: "프로젝트를 찾을 수 없습니다." });
      }

      res.json({ message: "프로젝트가 성공적으로 삭제되었습니다." });
    } catch (error) {
      res.status(500).json({ error: "프로젝트 삭제에 실패했습니다." });
    }
  }
}
