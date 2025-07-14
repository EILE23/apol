import { MainModel } from "../models/main.model";

export class MainService {
  static async getMain() {
    return await MainModel.findAll();
  }
}
