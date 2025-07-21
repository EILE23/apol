import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: "ap-northeast-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function deleteS3ObjectByUrl(url: string): Promise<void> {
  const bucketName = "apol-static";
  const prefix = `https://${bucketName}.s3.ap-northeast-2.amazonaws.com/`;

  if (!url.startsWith(prefix)) return;

  const key = url.replace(prefix, ""); // uploads/abc.png

  await s3
    .deleteObject({
      Bucket: bucketName,
      Key: key,
    })
    .promise();
}
