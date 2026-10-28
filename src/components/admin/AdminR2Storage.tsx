import React, { useState, useEffect, useRef } from 'react';
import {
  UploadCloud,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Trash2,
  Copy,
  ExternalLink,
  Plus,
  Image as ImageIcon,
  Search,
  Check,
  FileCheck
} from 'lucide-react';
import { formatDateVN } from '../../utils/kindergartenStore';
import { GalleryItem, KindergartenState } from '../../types';

interface R2File {
  key: string;
  size: number;
  lastModified?: string;
  url: string;
}

interface AdminR2StorageProps {
  onShowToast: (msg: string) => void;
  onAddGalleryItem?: (item: Omit<GalleryItem, 'id'>) => void;
}

export const AdminR2Storage: React.FC<AdminR2StorageProps> = ({
  onShowToast,
  onAddGalleryItem,
}) => {
  const [files, setFiles] = useState<R2File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    ok: boolean;
    bucket: string;
    message: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load files from R2
  const fetchR2Files = async () => {
    setIsLoading(true);
    try {
      // 1. Check status
      const statusRes = await fetch('/api/r2/status');
      const statusData = await statusRes.json();
      setConnectionStatus({
        ok: statusData.success,
        bucket: statusData.bucket || 'bibimage',
        message: statusData.message || (statusData.success ? 'Đã kết nối' : 'Không thể kết nối'),
      });

      // 2. Fetch list
      const listRes = await fetch('/api/r2/list');
      const listData = await listRes.json();
      if (listData.success) {
        setFiles(listData.files || []);
      }
    } catch (err: any) {
      console.error('Failed to load R2 files:', err);
      setConnectionStatus({
        ok: false,
        bucket: 'bibimage',
        message: 'Lỗi máy chủ khi kết nối Cloudflare R2',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchR2Files();
  }, []);

  // Multi-file upload handler
  const handleUploadFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      Array.from(fileList).forEach((file) => {
        formData.append('images', file);
      });
      formData.append('folder', 'photos');

      const response = await fetch('/api/r2/upload-multiple', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.success) {
        onShowToast(`Đã tải lên ${data.files.length} ảnh vào Cloudflare R2 thành công!`);
        await fetchR2Files();
      } else {
        throw new Error(data.error || 'Lỗi tải ảnh');
      }
    } catch (err: any) {
      alert(`Lỗi tải ảnh: ${err?.message || 'Không thể tải lên R2'}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Delete file handler
  const handleDeleteFile = async (key: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa tệp "${key}" khỏi Cloudflare R2 không?`)) {
      return;
    }

    try {
      const res = await fetch('/api/r2/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onShowToast(`Đã xóa ảnh "${key}" khỏi R2!`);
        setFiles((prev) => prev.filter((f) => f.key !== key));
      } else {
        alert(data.error || 'Lỗi khi xóa tệp');
      }
    } catch (err: any) {
      alert(`Lỗi: ${err?.message}`);
    }
  };

  // Copy URL to clipboard
  const handleCopyUrl = (url: string, key: string) => {
    const fullUrl = url.startsWith('http') ? url : window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedKey(key);
    onShowToast('Đã sao chép liên kết ảnh vào bộ nhớ tạm!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Quick add to public school gallery
  const handleQuickAddToGallery = (file: R2File) => {
    if (!onAddGalleryItem) return;
    const title = file.key.split('_').slice(2).join(' ').replace(/\.[^/.]+$/, '') || 'Khoảnh khắc BiBi Thiên Nga';
    onAddGalleryItem({
      title: title.charAt(0).toUpperCase() + title.slice(1),
      category: 'Hoạt động STEAM',
      imageUrl: file.url,
      date: new Date().toISOString().split('T')[0],
      description: 'Hình ảnh được lưu trữ trên Cloudflare R2.',
    });
    onShowToast(`Đã thêm ảnh vào Thư viện ảnh trường!`);
  };

  // Format bytes to human readable
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFiles = files.filter((f) =>
    f.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBytes = files.reduce((acc, f) => acc + (f.size || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header & Status Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-700/80">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  Kho Lưu Trữ Đám Mây Cloudflare R2
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Bucket: bibimage
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Lưu trữ vĩnh viễn hình ảnh trường, khối lớp, giáo viên và hoạt động với độ trễ cực thấp.
              </p>
            </div>
          </div>

          <button
            onClick={fetchR2Files}
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Làm mới & Kiểm tra kết nối</span>
          </button>
        </div>

        {/* Quick Storage Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
          <div className="bg-slate-800/60 rounded-2xl p-3.5 border border-slate-700">
            <span className="text-[11px] text-slate-400 block font-medium">Trạng thái kết nối:</span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${connectionStatus?.ok ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              <span className="text-xs font-bold text-white">
                {connectionStatus?.ok ? 'Đã kết nối thành công' : 'Đang kiểm tra...'}
              </span>
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-3.5 border border-slate-700">
            <span className="text-[11px] text-slate-400 block font-medium">Tổng số tệp trong bucket:</span>
            <span className="text-lg font-black text-emerald-400 mt-1 block">
              {files.length} <span className="text-xs font-normal text-slate-400">tệp</span>
            </span>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-3.5 border border-slate-700">
            <span className="text-[11px] text-slate-400 block font-medium">Tổng dung lượng đã dùng:</span>
            <span className="text-lg font-black text-amber-300 mt-1 block">
              {formatBytes(totalBytes)}
            </span>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 mb-1">
          Tải Thêm Ảnh Mới Lên Cloudflare R2
        </h4>
        <p className="text-xs text-slate-500 mb-4">
          Có thể chọn nhiều ảnh cùng một lúc (hỗ trợ JPG, PNG, WEBP, GIF tối đa 15MB/ảnh)
        </p>

        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={(e) => handleUploadFiles(e.target.files)}
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 rounded-2xl p-8 text-center cursor-pointer transition-colors duration-200"
        >
          <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-3">
            <UploadCloud className="w-7 h-7" />
          </div>
          <p className="text-sm font-bold text-slate-800">
            {isUploading ? 'Đang tải ảnh lên Cloudflare R2...' : 'Bấm vào đây để chọn ảnh hoặc kéo thả ảnh vào khung'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Ảnh sẽ được lưu trực tiếp vào bucket <strong className="text-emerald-700">bibimage</strong> trên máy chủ Cloudflare
          </p>
        </div>
      </div>

      {/* Files Grid & Search */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Danh Sách Ảnh Trong Bucket ({filteredFiles.length})
            </h4>
            <p className="text-xs text-slate-500">
              Sao chép liên kết hoặc đưa trực tiếp vào Thư viện ảnh / Tin tức
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên tệp..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin text-emerald-600 mx-auto mb-2" />
            Đang tải danh sách ảnh từ Cloudflare R2...
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400 border border-slate-100 rounded-2xl bg-slate-50/50">
            <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            Chưa có tệp ảnh nào trong bucket. Hãy tải lên ảnh đầu tiên của bạn ở trên!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.key}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                {/* Image thumbnail */}
                <div className="relative h-36 bg-slate-200 overflow-hidden">
                  <img
                    src={file.url}
                    alt={file.key}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23eee"/><text x="50%" y="50%" fill="%23aaa" dominant-baseline="middle" text-anchor="middle" font-size="12">File</text></svg>';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                    {formatBytes(file.size)}
                  </div>
                </div>

                {/* File Details & Actions */}
                <div className="p-3">
                  <p className="text-xs font-semibold text-slate-800 truncate" title={file.key}>
                    {file.key.split('/').pop()}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    Thư mục: {file.key.split('/')[0]}
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 mt-2.5 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => handleCopyUrl(file.url, file.key)}
                      className="inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-[11px] font-bold border border-slate-200 transition-colors"
                      title="Sao chép link"
                    >
                      {copiedKey === file.key ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Link ảnh</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteFile(file.key)}
                      className="inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white hover:bg-rose-50 text-rose-600 text-[11px] font-bold border border-slate-200 transition-colors"
                      title="Xóa tệp khỏi R2"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Xóa</span>
                    </button>
                  </div>

                  {onAddGalleryItem && (
                    <button
                      onClick={() => handleQuickAddToGallery(file)}
                      className="w-full mt-1.5 py-1 px-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Thêm vào Thư viện web</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
