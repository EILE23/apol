import { Request, Response, NextFunction } from "express";
import { AccessLogModel } from "../models/accessLog.model";

export const accessLogMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  const originalSend = res.send;

  // Override res.send to capture response time
  res.send = function (body: any) {
    const responseTime = Date.now() - startTime;

    // Log the access
    AccessLogModel.create({
      timestamp: new Date(),
      ip: req.ip || req.connection.remoteAddress || "unknown",
      user_agent: req.get("User-Agent") || "unknown",
      referrer: req.get("Referer") || undefined,
      path: req.path,
      method: req.method,
      status_code: res.statusCode,
      response_time: responseTime,
    }).catch((err) => {
      console.error("Access log error:", err);
    });

    return originalSend.call(this, body);
  };

  next();
};
