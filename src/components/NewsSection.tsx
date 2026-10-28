import React, { useState } from 'react';
import { NewsArticle, NewsCategory } from '../types';
import { filterNewsByCategory, formatDateVN } from '../utils/kindergartenStore';
import {
  Newspaper,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  Tag,
  X
} from 'lucide-react';

interface NewsSectionProps {
  news: NewsArticle[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'Tất cả'>('Tất cả');
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null);

  const categories: (NewsCategory | 'Tất cả')[] = [
    'Tất cả',
    'Sự kiện',
    'STEAM & Trải nghiệm',
    'Thông báo',
    'Dinh dưỡng & Sức khỏe',
  ];

  const publishedNews = news.filter((item) => item.isPublished);
  const filteredNews = filterNewsByCategory(publishedNews, selectedCategory);

  return (
    <section id="tin-tuc" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 mb-3">
            <Newspaper className="w-3.5 h-3.5 text-emerald-700" />
            <span>Tin tức & Sự kiện trường</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Góc Tin Tức & Cẩm Nang Giáo Dục Sớm
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Cập nhật những hoạt động nổi bật, thông báo tuyển sinh và kiến thức chăm sóc bé khoa học từ các chuyên gia BiBi Thiên Nga.
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
                    : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-800 shadow-xs">
                    {article.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {formatDateVN(article.date)}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 truncate">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {article.author}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <button
                  onClick={() => setReadingArticle(article)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-emerald-200 hover:bg-emerald-600 hover:text-white text-emerald-700 text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Đọc bài viết chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal: Read Full Article */}
        {readingArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 p-6 sm:p-8 relative">
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                aria-label="Đóng bài viết"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-4">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
                  {readingArticle.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {readingArticle.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                  <span>Ngày đăng: {formatDateVN(readingArticle.date)}</span>
                  <span>·</span>
                  <span>Tác giả: {readingArticle.author}</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden mb-5">
                <img src={readingArticle.coverImage} alt={readingArticle.title} className="w-full h-64 object-cover" />
              </div>

              <p className="text-sm font-semibold text-slate-700 mb-4 bg-emerald-50/50 p-4 rounded-xl border-l-4 border-emerald-500 leading-relaxed">
                {readingArticle.summary}
              </p>

              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                {readingArticle.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors"
                >
                  Đóng bài viết
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
