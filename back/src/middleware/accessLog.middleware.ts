import { Request, Response, NextFunction } from "express";
import { AccessLogModel } from "../models/accessLog.model";

// Helper function to get real IP address
const getRealIP = (req: Request): string => {
  // Check various headers for real IP (in order of preference)
  const headers = [
    "x-forwarded-for",
    "x-real-ip",
    "x-client-ip",
    "cf-connecting-ip", // Cloudflare
    "x-forwarded",
    "forwarded-for",
    "forwarded",
  ];

  for (const header of headers) {
    const value = req.get(header);
    if (value) {
      // x-forwarded-for can contain multiple IPs, take the first one
      const ip = value.split(",")[0].trim();
      if (ip && ip !== "127.0.0.1" && ip !== "localhost") {
        console.log(`Found real IP from ${header}: ${ip}`);
        return ip;
      }
    }
  }

  // Fallback to direct connection IP
  const fallbackIP =
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    "unknown";
  console.log(`Using fallback IP: ${fallbackIP}`);
  return fallbackIP;
};

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

    // Get real IP address
    const realIP = getRealIP(req);

    // Log the access
    AccessLogModel.create({
      timestamp: new Date(),
      ip: realIP,
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
