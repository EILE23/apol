import { Request, Response } from "express";
import { MainService } from "../services/main.service";
import { mainToViewModel } from "../viewmodels/main.viewmodel";

export class MainController {
  static async getMainContent(req: Request, res: Response) {
    const data = await MainService.getMain();
    res.json(data.map(mainToViewModel));
  }
}
