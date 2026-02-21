import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

function must(name: string, v?: string) {
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export const r2 = new S3Client({
  region: "auto",
  endpoint: must("R2_ENDPOINT", process.env.R2_ENDPOINT),
  credentials: {
    accessKeyId: must("R2_ACCESS_KEY_ID", process.env.R2_ACCESS_KEY_ID),
    secretAccessKey: must("R2_SECRET_ACCESS_KEY", process.env.R2_SECRET_ACCESS_KEY),
  },
});

const APP_PREFIX = "pathare-new";

/**
 * Upload image to R2 and return PUBLIC Cloudflare URL
 * URL format (your bucket): https://<pub>.r2.dev/<bucket>/<key>
 */
export async function uploadToR2(file: File, type: "dishes" | "alcohol") {
  const buffer = Buffer.from(await file.arrayBuffer());

  const extension = (file.name.split(".").pop() || "jpg").toLowerCase();
  const shortId = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const fileName = `${shortId}.${extension}`;

  const key = `${APP_PREFIX}/${type}/${fileName}`;

  const bucket = must("R2_BUCKET", process.env.R2_BUCKET);

  await r2.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type || `image/${extension}`,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  const publicBase = must("R2_PUBLIC_URL", process.env.R2_PUBLIC_URL);

  // ✅ IMPORTANT: bucket must be included for r2.dev public URLs
  return `${publicBase}/${bucket}/${key}`;
}

/**
 * List objects under a prefix in R2
 * Examples:
 *  - prefix="" -> lists everything under pathare-new/
 *  - prefix="dishes/" -> lists under pathare-new/dishes/
 *  - prefix="pathare-new/dishes/" -> also works
 */
export async function listR2Objects(prefix = "") {
  const bucket = must("R2_BUCKET", process.env.R2_BUCKET);

  const cleanPrefix = prefix
    ? prefix.startsWith(APP_PREFIX)
      ? prefix
      : `${APP_PREFIX}/${prefix}`.replace(/\/+/g, "/")
    : `${APP_PREFIX}/`;

  const out = await r2.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: cleanPrefix,
      MaxKeys: 100,
    })
  );

  return (out.Contents ?? []).map((o) => ({
    key: o.Key!,
    size: o.Size ?? 0,
    lastModified: o.LastModified?.toISOString?.() ?? null,
  }));
}
