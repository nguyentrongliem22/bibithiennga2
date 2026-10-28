import 'dotenv/config';
import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  testR2Connection,
  uploadToR2,
  listR2Files,
  deleteFromR2,
  getR2Object,
  R2_CONFIG,
} from './src/utils/r2Service';
import type { Readable } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

// Body parsers
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Multer memory storage for image uploads (max 15MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Accept standard image MIME types
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận tệp hình ảnh (JPEG, PNG, WEBP, GIF, SVG)!'));
    }
  },
});

/* ============================================================
   CLOUDFLARE R2 API ENDPOINTS
   ============================================================ */

// 1. Check R2 connection status
app.get('/api/r2/status', async (_req: Request, res: Response) => {
  try {
    const status = await testR2Connection();
    res.json({
      success: status.ok,
      bucket: status.bucket,
      message: status.message,
      hasPublicUrl: Boolean(R2_CONFIG.publicUrl),
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Lỗi kiểm tra R2' });
  }
});

// 2. Upload single image to Cloudflare R2
app.post('/api/r2/upload', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Vui lòng chọn tệp hình ảnh để tải lên!' });
    }

    const folder = (req.body.folder as string) || 'photos';
    const result = await uploadToR2(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
      folder
    );

    res.json({
      success: true,
      message: 'Tải ảnh lên Cloudflare R2 thành công!',
      file: {
        key: result.key,
        url: result.url,
        publicUrl: result.publicUrl,
        size: result.size,
        contentType: result.contentType,
        originalName: req.file.originalname,
      },
    });
  } catch (err: any) {
    console.error('Error uploading to Cloudflare R2:', err);
    res.status(500).json({ success: false, error: err?.message || 'Lỗi khi tải ảnh lên R2' });
  }
});

// 3. Upload multiple images to Cloudflare R2
app.post('/api/r2/upload-multiple', upload.array('images', 10), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, error: 'Vui lòng chọn ít nhất 1 ảnh để tải lên!' });
    }

    const folder = (req.body.folder as string) || 'gallery';
    const uploadPromises = files.map((file) =>
      uploadToR2(file.buffer, file.originalname, file.mimetype, folder)
    );

    const results = await Promise.all(uploadPromises);

    res.json({
      success: true,
      message: `Đã tải lên ${results.length} ảnh lên Cloudflare R2 thành công!`,
      files: results.map((r, i) => ({
        key: r.key,
        url: r.url,
        size: r.size,
        contentType: r.contentType,
        originalName: files[i]?.originalname,
      })),
    });
  } catch (err: any) {
    console.error('Error batch uploading to R2:', err);
    res.status(500).json({ success: false, error: err?.message || 'Lỗi khi tải nhiều ảnh lên R2' });
  }
});

// 4. Stream image directly from Cloudflare R2
app.get('/api/r2/image/*', async (req: Request, res: Response) => {
  try {
    // Extract key from path after /api/r2/image/
    const key = req.params[0] || (req.url.replace('/api/r2/image/', '').split('?')[0]);
    if (!key) {
      return res.status(400).send('Missing image key');
    }

    const obj = await getR2Object(key);
    if (!obj.Body) {
      return res.status(404).send('Image not found in R2');
    }

    if (obj.ContentType) {
      res.setHeader('Content-Type', obj.ContentType);
    }
    if (obj.ContentLength) {
      res.setHeader('Content-Length', obj.ContentLength);
    }
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const stream = obj.Body as Readable;
    stream.pipe(res);
  } catch (err: any) {
    if (err?.name === 'NoSuchKey') {
      return res.status(404).send('Image not found in R2 bucket');
    }
    console.error('Error streaming R2 image:', err);
    res.status(500).send('Error loading image');
  }
});

// 5. List images in Cloudflare R2 bucket
app.get('/api/r2/list', async (req: Request, res: Response) => {
  try {
    const prefix = (req.query.prefix as string) || '';
    const files = await listR2Files(prefix);
    res.json({ success: true, files, count: files.length, bucket: R2_CONFIG.bucketName });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Lỗi khi lấy danh sách ảnh R2' });
  }
});

// 6. Delete image from Cloudflare R2 bucket
app.delete('/api/r2/delete', async (req: Request, res: Response) => {
  try {
    const { key } = req.body;
    if (!key) {
      return res.status(400).json({ success: false, error: 'Thiếu key của ảnh cần xóa' });
    }

    await deleteFromR2(key);
    res.json({ success: true, message: `Đã xóa ảnh "${key}" khỏi Cloudflare R2` });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Lỗi khi xóa ảnh R2' });
  }
});

/* ============================================================
   VITE MIDDLEWARE (DEV) & STATIC SERVE (PROD)
   ============================================================ */

async function startServer() {
  if (!isProd) {
    // Mount Vite dev server middleware
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 BiBi Thien Nga STEAM Preschool Server running at http://localhost:${PORT}`);
    console.log(`📦 Cloudflare R2 Bucket: ${R2_CONFIG.bucketName}`);
  });
}

// Export app for serverless platforms (e.g. Vercel)
export default app;

// Start server if executed directly
if (process.env.NODE_ENV !== 'test') {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
