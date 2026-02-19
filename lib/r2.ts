import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToR2(
  file: File,
  type: "dishes" | "alcohol"
) {
  const buffer = Buffer.from(await file.arrayBuffer());

  // Get extension safely
  const extension = file.name.split(".").pop();

  // Generate short random ID (8 chars)
  const shortId = crypto.randomUUID().replace(/-/g, "").slice(0, 8);

  const fileName = `${shortId}.${extension}`;

  const key = `pathare-new/${type}/${fileName}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return `${process.env.R2_PUBLIC_URL}/${key}`;
}
