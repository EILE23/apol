import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { ProjectModel } from "../models/project.model";
import { deleteS3ObjectByUrl } from "../util/s3";
import TurndownService from "turndown";
const turndownService = new TurndownService();

const MARKDOWN_DIR = path.resolve("markdown");
export class ProjectController {
  // 모든 프로젝트 조회
  static async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await ProjectModel.getAll();
      res.json(projects);
    } catch (error) {
      console.error("[getAllProjects]", error);
      res
        .status(500)
        .json({ error: "프로젝트 목록을 가져오는데 실패했습니다." });
    }
  }

  // 특정 프로젝트 조회
  static async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await ProjectModel.getById(id);

      if (!project) {
        return res.status(404).json({ error: "프로젝트를 찾을 수 없습니다." });
      }

      // content 필드 제거
      const { content, ...metaOnly } = project;
      res.json(metaOnly);
    } catch (error) {
      console.error("[getProjectById]", error);
      res.status(500).json({ error: "프로젝트를 가져오는데 실패했습니다." });
    }
  }

  // 새 프로젝트 생성
  static async createProject(req: Request, res: Response) {
    try {
      const { title, summary, content, tags, thumbnail, duration } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: "제목과 내용은 필수입니다." });
      }
      // 1. 우선 DB에 contentPath 없이 저장 (id 확보 목적)
      const newProject = await ProjectModel.create({
        title,
        summary: summary ?? "",
        tags: tags ?? [],
        thumbnail,
        duration,
        contentPath: "", // 일단 빈 값
      });

      // 2. 마크다운 파일 생성
      const filename = `project-${newProject.id}.md`;
      const filePath = path.join(MARKDOWN_DIR, filename);
      const markdownContent = turndownService.turndown(content);

      await fs.writeFile(filePath, content, "utf-8");

      // 3. 다시 contentPath 업데이트
      const updatedProject = await ProjectModel.update(
        newProject.id.toString(),
        {
          contentPath: filename,
        }
      );

      res.status(201).json(updatedProject);
    } catch (error) {
      console.error("[createProject]", error);
      res.status(500).json({ error: "프로젝트 생성에 실패했습니다." });
    }
  }
  // 프로젝트 수정
  static async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, summary, content, tags, thumbnail, duration } = req.body;

      const project = await ProjectModel.getById(id);
      if (!project) {
        return res.status(404).json({ error: "프로젝트를 찾을 수 없습니다." });
      }

      if (content && project.contentPath) {
        const filePath = path.join(MARKDOWN_DIR, project.contentPath);
        const markdownContent = turndownService.turndown(content);

        await fs.writeFile(filePath, content, "utf-8");
      }

      const updatedProject = await ProjectModel.update(id, {
        title,
        summary,
        tags,
        thumbnail,
        duration,
      });

      res.json(updatedProject);
    } catch (error) {
      console.error("[updateProject]", error);
      res.status(500).json({ error: "프로젝트 수정에 실패했습니다." });
    }
  }
  // 프로젝트 삭제
  static async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await ProjectModel.getById(id);
      if (!project) {
        return res.status(404).json({ error: "프로젝트를 찾을 수 없습니다." });
      }

      //  썸네일 S3 삭제
      if (project.thumbnail) {
        await deleteS3ObjectByUrl(project.thumbnail).catch((err) =>
          console.warn("S3 썸네일 삭제 실패:", err.message)
        );
      }

      //  마크다운 파일도 삭제
      if (project.contentPath) {
        const filePath = path.join(MARKDOWN_DIR, project.contentPath);
        await fs.unlink(filePath).catch(() => {}); // 파일 없어도 무시
      }

      const success = await ProjectModel.delete(id);
      if (!success) {
        return res.status(404).json({ error: "삭제 실패" });
      }

      res.json({ message: "프로젝트가 성공적으로 삭제되었습니다." });
    } catch (error) {
      console.error("[deleteProject]", error);
      res.status(500).json({ error: "프로젝트 삭제에 실패했습니다." });
    }
  }

  static async getProjectContent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await ProjectModel.getById(id);

      if (!project || !project.contentPath) {
        return res.status(404).send("프로젝트를 찾을 수 없습니다.");
      }

      const filePath = path.join(MARKDOWN_DIR, project.contentPath);
      const content = await fs.readFile(filePath, "utf-8");
      res.send(content);
    } catch (error) {
      console.error("[getProjectContent]", error);
      res.status(500).send("본문을 가져오는데 실패했습니다.");
    }
  }
}
