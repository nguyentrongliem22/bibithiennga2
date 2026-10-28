import React from 'react';
import { SchoolInfo } from '../types';
import {
  Sparkles,
  Shield,
  Heart,
  Compass,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  CalendarCheck,
  Video
} from 'lucide-react';

interface HeroProps {
  schoolInfo: SchoolInfo;
  onOpenEnrollModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ schoolInfo, onOpenEnrollModal }) => {
  return (
    <section id="trang-chu" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/30">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-200/20 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-48 h-48 bg-amber-100/40 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Phương pháp giáo dục STEAM chuẩn Quốc tế</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Khai mở tiềm năng{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 underline decoration-amber-300 decoration-wavy decoration-2">
                Sáng tạo & Hạnh phúc
              </span>{' '}
              cho bé từ những năm tháng đầu đời
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {schoolInfo.slogan}. Tọa lạc tại số{' '}
              <strong className="text-slate-800 font-semibold">{schoolInfo.address}, {schoolInfo.ward}, {schoolInfo.district}, TP. Đà Nẵng</strong>
              , mang đến cho trẻ từ <span className="font-semibold text-emerald-700">{schoolInfo.ageRange}</span> một ngôi trường ngập tràn tình yêu thương và sự khám phá.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Nhận trẻ từ <strong>6 tháng - 5 tuổi</strong></span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Camera Full HD <strong>xem trực tuyến 24/7</strong></span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>100% Giáo viên <strong>chuẩn bằng cấp Sư phạm</strong></span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Thực đơn dinh dưỡng <strong>5 bữa/ngày hữu cơ</strong></span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <button
                onClick={onOpenEnrollModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all cursor-pointer"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>Đăng ký tham quan trường</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${schoolInfo.hotline.replace(/[^0-9]/g, '')}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 px-6 py-3.5 rounded-xl font-bold text-base shadow-xs transition-all"
              >
                <PhoneCall className="w-5 h-5 text-emerald-600" />
                <span>Hotline: {schoolInfo.hotline}</span>
              </a>
            </div>

            {/* Schedule note */}
            <p className="text-xs text-slate-500 pt-1">
              Thời gian mở cửa đón trẻ: <span className="font-semibold text-slate-700">{schoolInfo.scheduleHours}</span> ({schoolInfo.scheduleDays}) · {schoolInfo.closedDays}
            </p>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=80"
                  alt="Trẻ em học tập STEAM tại BiBi Thiên Nga Preschool"
                  className="w-full h-[380px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
                  <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">STEAM Learning in Action</p>
                  <p className="text-sm font-bold">Phương pháp Học qua Trải nghiệm - Chơi mà Học</p>
                </div>
              </div>

              {/* Floating Badge 1: Location Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase">Địa chỉ thuận tiện</p>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-800">37 Phan Văn Trị, Cẩm Lệ</p>
                </div>
              </div>

              {/* Floating Badge 2: Camera Live 24/7 */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase">Camera Phụ huynh</p>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-800">Trực tuyến 24/7 Full HD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
