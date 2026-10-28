import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  HeadBucketCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

function getValidEndpoint(): string {
  if (process.env.CLOUDFLARE_R2_ENDPOINT?.startsWith('http')) {
    return process.env.CLOUDFLARE_R2_ENDPOINT.trim();
  }
  if (process.env.CLOUDFLARE_R2_PUBLIC_URL?.includes('r2.cloudflarestorage.com')) {
    return process.env.CLOUDFLARE_R2_PUBLIC_URL.trim();
  }
  return 'https://9aadbfa437c0a55ce58fdef80f8b4471.r2.cloudflarestorage.com';
}

function getSecretAccessKey(): string {
  if (process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY && process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY.length > 20) {
    return process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY.trim();
  }
  if (process.env.CLOUDFLARE_R2_ENDPOINT && !process.env.CLOUDFLARE_R2_ENDPOINT.startsWith('http')) {
    return process.env.CLOUDFLARE_R2_ENDPOINT.trim();
  }
  return 'b612c1ae67447c0257f914024ec3280429c1d3232e9f02df95fcb23d4b7aaa25';
}

function getAccessKeyId(): string {
  return process.env.CLOUDFLARE_R2_ACCESS_KEY_ID?.trim() || '107d30faa8cb1be27273b8e1a611a9bd';
}

function getBucketName(): string {
  return process.env.CLOUDFLARE_R2_BUCKET_NAME?.trim() || 'bibimage';
}

function getPublicUrl(): string {
  if (process.env.CLOUDFLARE_R2_PUBLIC_URL && !process.env.CLOUDFLARE_R2_PUBLIC_URL.includes('r2.cloudflarestorage.com')) {
    return process.env.CLOUDFLARE_R2_PUBLIC_URL.trim();
  }
  return '';
}

// Cloudflare R2 Credentials
export const R2_CONFIG = {
  bucketName: getBucketName(),
  accessKeyId: getAccessKeyId(),
  secretAccessKey: getSecretAccessKey(),
  endpoint: getValidEndpoint(),
  publicUrl: getPublicUrl(),
};

export function getR2Client(): S3Client {
  return new S3Client({
    region: 'auto',
    endpoint: R2_CONFIG.endpoint,
    credentials: {
      accessKeyId: R2_CONFIG.accessKeyId,
      secretAccessKey: R2_CONFIG.secretAccessKey,
    },
  });
}

export interface UploadResult {
  key: string;
  url: string;
  publicUrl?: string;
  size: number;
  contentType: string;
}

export interface R2FileItem {
  key: string;
  size: number;
  lastModified?: Date;
  url: string;
}

/**
 * Check if bucket exists and is accessible
 */
export async function testR2Connection(): Promise<{ ok: boolean; message: string; bucket: string }> {
  try {
    const client = getR2Client();
    await client.send(new HeadBucketCommand({ Bucket: R2_CONFIG.bucketName }));
    return { ok: true, message: 'Kết nối Cloudflare R2 thành công!', bucket: R2_CONFIG.bucketName };
  } catch (err: any) {
    return { ok: false, message: err?.message || 'Không thể kết nối đến Cloudflare R2', bucket: R2_CONFIG.bucketName };
  }
}

/**
 * Upload buffer to Cloudflare R2
 */
export async function uploadToR2(
  buffer: Buffer,
  originalFilename: string,
  contentType: string,
  folder = 'uploads'
): Promise<UploadResult> {
  const client = getR2Client();
  
  // Clean filename: remove Vietnamese accents and spaces
  const cleanBase = originalFilename
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .toLowerCase();

  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 7);
  const key = `${folder}/${timestamp}_${randomStr}_${cleanBase}`;

  await client.send(
    new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000',
    })
  );

  // If a public domain is configured on R2 (e.g. pub-xxx.r2.dev or custom domain)
  const publicUrl = R2_CONFIG.publicUrl ? `${R2_CONFIG.publicUrl.replace(/\/$/, '')}/${key}` : undefined;
  
  // Local/proxy endpoint URL that serves the image directly
  const localUrl = `/api/r2/image/${key}`;

  return {
    key,
    url: publicUrl || localUrl,
    publicUrl,
    size: buffer.length,
    contentType,
  };
}

/**
 * List objects in Cloudflare R2 bucket
 */
export async function listR2Files(prefix = '', maxKeys = 100): Promise<R2FileItem[]> {
  const client = getR2Client();
  const response = await client.send(
    new ListObjectsV2Command({
      Bucket: R2_CONFIG.bucketName,
      Prefix: prefix,
      MaxKeys: maxKeys,
    })
  );

  const items = response.Contents || [];
  return items.map((item) => ({
    key: item.Key || '',
    size: item.Size || 0,
    lastModified: item.LastModified,
    url: R2_CONFIG.publicUrl
      ? `${R2_CONFIG.publicUrl.replace(/\/$/, '')}/${item.Key}`
      : `/api/r2/image/${item.Key}`,
  }));
}

/**
 * Delete object from R2
 */
export async function deleteFromR2(key: string): Promise<boolean> {
  const client = getR2Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
    })
  );
  return true;
}

/**
 * Get presigned URL for an object (valid for 1 hour by default)
 */
export async function getPresignedDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  const client = getR2Client();
  const command = new GetObjectCommand({
    Bucket: R2_CONFIG.bucketName,
    Key: key,
  });
  return getSignedUrl(client, command, { expiresIn });
}

/**
 * Get object stream and content type directly from R2
 */
export async function getR2Object(key: string) {
  const client = getR2Client();
  return client.send(
    new GetObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
    })
  );
}
