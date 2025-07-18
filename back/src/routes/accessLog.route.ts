import express from "express";
import { AccessLogModel } from "../models/accessLog.model";

const router = express.Router();

// Get access logs with pagination
router.get("/logs", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const logs = await AccessLogModel.getAll(limit);
    res.json(logs);
  } catch (error) {
    console.error("Error fetching access logs:", error);
    res.status(500).json({ error: "Failed to fetch access logs" });
  }
});

// Get access statistics
router.get("/stats", async (req, res) => {
  try {
    const stats = await AccessLogModel.getStats();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching access stats:", error);
    res.status(500).json({ error: "Failed to fetch access statistics" });
  }
});

export default router;
