import React, { useState } from 'react';
import { GalleryItem, GalleryCategory } from '../types';
import { filterGalleryByCategory, formatDateVN } from '../utils/kindergartenStore';
import {
  Image,
  Sparkles,
  Eye,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | 'Tất cả'>('Tất cả');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories: (GalleryCategory | 'Tất cả')[] = [
    'Tất cả',
    'Hoạt động STEAM',
    'Lớp học vui vẻ',
    'Dã ngoại khám phá',
    'Lễ hội & Sự kiện',
    'Cơ sở vật chất',
  ];

  const filteredGallery = filterGalleryByCategory(gallery, selectedCategory);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const nextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredGallery.length);
  };

  const prevImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <section id="hinh-anh" className="py-16 lg:py-24 bg-emerald-50/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 mb-3">
            <Image className="w-3.5 h-3.5 text-emerald-700" />
            <span>Khoảnh khắc hạnh phúc</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Thư Viện Ảnh Hoạt Động Của Các Bé
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Mỗi nụ cười, mỗi khám phá nhỏ bé của con đều là những viên gạch quý giá xây dựng nên sự tự tin và lòng đam mê học tập suốt đời.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-3xl overflow-hidden bg-slate-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-4/3"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-800">
                {item.category}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" /> {formatDateVN(item.date)}
                </span>
                <h3 className="text-sm sm:text-base font-bold leading-snug line-clamp-2">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            Chưa có hình ảnh nào trong danh mục này.
          </div>
        )}

        {/* Lightbox Modal */}
        {activeImageIndex !== null && filteredGallery[activeImageIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Đóng xem ảnh"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
              <img
                src={filteredGallery[activeImageIndex].imageUrl}
                alt={filteredGallery[activeImageIndex].title}
                className="max-h-[65vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center text-white max-w-2xl px-4">
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block mb-1">
                  {filteredGallery[activeImageIndex].category} · {formatDateVN(filteredGallery[activeImageIndex].date)}
                </span>
                <h4 className="text-lg font-bold">{filteredGallery[activeImageIndex].title}</h4>
                {filteredGallery[activeImageIndex].description && (
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">{filteredGallery[activeImageIndex].description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
