import express from "express";
import { AccessLogModel } from "../models/accessLog.model";

const router = express.Router();

// Get access logs with pagination
router.get("/logs", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;

    const logs = await AccessLogModel.getAllWithPagination(limit, offset);
    const total = await AccessLogModel.getTotalCount();

    res.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
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
