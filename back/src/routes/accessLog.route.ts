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

// Save client IP from frontend
router.post("/client-ip", async (req, res) => {
  try {
    const { ip, user_agent, path, referrer } = req.body;

    await AccessLogModel.create({
      timestamp: new Date(),
      ip: ip,
      user_agent: user_agent,
      referrer: referrer,
      path: path,
      method: "GET",
      status_code: 200,
      response_time: 0,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving client IP:", error);
    res.status(500).json({ error: "Failed to save client IP" });
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
