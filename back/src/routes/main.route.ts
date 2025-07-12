import { Router } from "express";
import { MainController } from "../controllers/main.controller";

const router = Router();

router.get("/", MainController.getMainContent);

export default router;
