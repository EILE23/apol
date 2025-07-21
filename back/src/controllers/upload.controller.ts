// controllers/upload.controller.ts
import { Request, Response } from "express";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

export const uploadImageToS3 = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "파일이 업로드되지 않았습니다." });
  }

  const key = `uploads/${uuidv4()}_${req.file.originalname}`;

  try {
    const result = await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        Body: req.file.buffer,
        ACL: "public-read",
        ContentType: req.file.mimetype,
      })
      .promise();

    return res.json({ url: result.Location });
  } catch (err) {
    console.error("S3 업로드 실패:", err);
    return res.status(500).json({ error: "S3 업로드 실패" });
  }
};
