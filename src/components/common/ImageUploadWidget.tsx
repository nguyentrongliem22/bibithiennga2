import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Copy,
  ExternalLink,
  X
} from 'lucide-react';

interface ImageUploadWidgetProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export const ImageUploadWidget: React.FC<ImageUploadWidgetProps> = ({
  value,
  onChange,
  folder = 'photos',
  label = 'Hình ảnh',
  placeholder = 'https://...',
  required = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Chỉ hỗ trợ tệp hình ảnh (JPEG, PNG, WEBP, GIF, SVG)!');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setUploadError('Dung lượng ảnh tối đa 15MB!');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);

      const response = await fetch('/api/r2/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Tải ảnh lên Cloudflare R2 thất bại');
      }

      // Update the input with the R2 storage URL
      onChange(data.file.url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err: any) {
      console.error('R2 upload failed:', err);
      setUploadError(err?.message || 'Lỗi kết nối khi tải ảnh lên R2');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUploadFile(file);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
          <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
            <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
            Lưu trữ Cloudflare R2
          </span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Drop zone & preview area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-3.5 transition-all duration-200 ${
          isDragging
            ? 'border-emerald-500 bg-emerald-50/70'
            : 'border-slate-300 hover:border-emerald-400 bg-slate-50/50'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Thumbnail preview */}
          {value ? (
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200 group">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23eee"/><text x="50%" y="50%" fill="%23aaa" dominant-baseline="middle" text-anchor="middle" font-size="12">Lỗi ảnh</text></svg>';
                }}
              />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition-colors"
                title="Xóa ảnh"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 border border-slate-200">
              <ImageIcon className="w-8 h-8 text-slate-300" />
            </div>
          )}

          {/* Action and description */}
          <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang tải lên R2...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Chọn ảnh từ máy tính</span>
                  </>
                )}
              </button>
              <span className="text-[11px] text-slate-400 hidden sm:inline">hoặc kéo thả ảnh vào đây</span>
            </div>

            <p className="text-[11px] text-slate-500">
              Hỗ trợ JPG, PNG, WEBP, SVG tối đa 15MB. Ảnh sẽ được tự động tối ưu và lưu vào bucket <strong>bibimage</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Manual URL input fallback / display */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-[11px] focus:outline-hidden focus:border-emerald-500"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(value);
              setUploadSuccess(true);
              setTimeout(() => setUploadSuccess(false), 2000);
            }}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-emerald-700 transition-colors"
            title="Sao chép liên kết ảnh"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Upload feedback */}
      {uploadSuccess && (
        <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 animate-in fade-in">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Đã tải ảnh lên Cloudflare R2 thành công!
        </p>
      )}
      {uploadError && (
        <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 animate-in fade-in">
          <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          {uploadError}
        </p>
      )}
    </div>
  );
};
