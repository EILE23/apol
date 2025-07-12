import { ProjectModel, Project } from "../models/project.model";

export class ProjectService {
  static async getAllProjects(): Promise<Project[]> {
    return await ProjectModel.getAll();
  }

  static async getProjectById(id: string): Promise<Project | null> {
    return await ProjectModel.getById(id);
  }

  static async createProject(projectData: {
    title: string;
    summary: string;
    content: string;
    tags: string[];
    thumbnail?: string;
  }): Promise<Project> {
    return await ProjectModel.create(projectData);
  }

  static async updateProject(
    id: string,
    projectData: {
      title?: string;
      summary?: string;
      content?: string;
      tags?: string[];
      thumbnail?: string;
    }
  ): Promise<Project | null> {
    return await ProjectModel.update(id, projectData);
  }

  static async deleteProject(id: string): Promise<boolean> {
    return await ProjectModel.delete(id);
  }
}
