import React, { useState } from 'react';
import { Testimonial } from '../types';
import { formatDateVN } from '../utils/kindergartenStore';
import {
  Star,
  MessageSquareQuote,
  Heart,
  PlusCircle,
  CheckCircle2,
  X
} from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onAddReview: (review: Omit<Testimonial, 'id' | 'isApproved'>) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddReview,
}) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childClass, setChildClass] = useState('Lớp Nhà Trẻ Lớn');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const approvedTestimonials = testimonials.filter((t) => t.isApproved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !quote.trim()) return;

    onAddReview({
      parentName: parentName.trim(),
      childName: childName.trim() || 'Bé yêu',
      childClass,
      quote: quote.trim(),
      rating,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      date: new Date().toISOString().split('T')[0],
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowFormModal(false);
      setParentName('');
      setChildName('');
      setQuote('');
    }, 2000);
  };

  return (
    <section className="py-16 lg:py-24 bg-emerald-900 text-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/80 px-3.5 py-1 rounded-full border border-emerald-700 mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Phụ huynh gửi gắm niềm tin</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Cảm Nhận Từ Quý Phụ Huynh Tại Đà Nẵng
          </h2>
          <p className="mt-3 text-base text-emerald-100">
            Sự an tâm, hạnh phúc của quý phụ huynh và nụ cười rạng rỡ của các bé mỗi chiều đón về là động lực lớn nhất của tập thể giáo viên BiBi Thiên Nga.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowFormModal(true)}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Gửi cảm nhận của bạn</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approvedTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-emerald-800/60 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-emerald-700/80 shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-300 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < t.rating ? 'fill-amber-300' : 'text-emerald-950'}`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-emerald-700/60">
                <img
                  src={t.avatarUrl}
                  alt={t.parentName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-400 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.parentName}</h4>
                  <p className="text-xs text-emerald-300">{t.childName} · {t.childClass}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Add Review */}
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200 text-slate-800">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setShowFormModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-black text-slate-900 mb-1">Chia Sẻ Cảm Nhận Phụ Huynh</h3>
              <p className="text-xs text-slate-500 mb-5">
                Ý kiến đóng góp quý báu của ba mẹ sẽ giúp nhà trường ngày càng hoàn thiện hơn.
              </p>

              {submittedSuccess ? (
                <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl text-center space-y-2 border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base">Cảm ơn lời chia sẻ của Ba Mẹ!</h4>
                  <p className="text-xs">Đánh giá đã được gửi tới Ban Giám Hiệu nhà trường để duyệt hiển thị.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Họ tên Phụ huynh *</label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="VD: Mẹ Thu Hằng"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tên bé & độ tuổi</label>
                      <input
                        type="text"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        placeholder="VD: Bé Bon (3 tuổi)"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Lớp đang theo học</label>
                      <input
                        type="text"
                        value={childClass}
                        onChange={(e) => setChildClass(e.target.value)}
                        placeholder="VD: Lớp Mầm STEAM"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Đánh giá của bạn</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setRating(s)}
                          className="p-1 focus:outline-hidden"
                        >
                          <Star className={`w-6 h-6 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Lời nhận xét / Cảm nghĩ *</label>
                    <textarea
                      required
                      rows={4}
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="Chia sẻ trải nghiệm của ba mẹ khi gửi bé tại BiBi Thiên Nga..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Gửi cảm nhận
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
