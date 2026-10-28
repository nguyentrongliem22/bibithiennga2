import React from 'react';
import { SchoolInfo } from '../types';
import {
  Compass,
  Heart,
  ShieldCheck,
  Smile,
  Lightbulb,
  Cpu,
  Palette,
  Calculator,
  MapPin,
  Clock,
  Phone,
  Check
} from 'lucide-react';

interface AboutSectionProps {
  schoolInfo: SchoolInfo;
  onOpenEnrollModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ schoolInfo, onOpenEnrollModal }) => {
  const steamPillars = [
    {
      letter: 'S',
      title: 'Science (Khoa học)',
      desc: 'Kích thích tò mò qua các thí nghiệm trực quan, khám phá cỏ cây, động vật và quy luật tự nhiên.',
      icon: Lightbulb,
      color: 'bg-emerald-500 text-white',
      accent: 'border-emerald-200'
    },
    {
      letter: 'T',
      title: 'Technology (Công nghệ)',
      desc: 'Làm quen các công cụ số an toàn, kính lúp điện tử, kính hiển vi nhí và thiết bị âm thanh thông minh.',
      icon: Cpu,
      color: 'bg-teal-500 text-white',
      accent: 'border-teal-200'
    },
    {
      letter: 'E',
      title: 'Engineering (Kỹ thuật)',
      desc: 'Tập lắp ráp mô hình Lego STEAM, thử nghiệm độ thăng bằng, thiết kế cầu đường và nhà cửa tí hon.',
      icon: Compass,
      color: 'bg-amber-500 text-white',
      accent: 'border-amber-200'
    },
    {
      letter: 'A',
      title: 'Art (Nghệ thuật)',
      desc: 'Tự do sáng tạo hội họa, điêu khắc đất sét, cảm thụ âm nhạc, hát kịch và làm đồ handmade từ vật liệu thiên nhiên.',
      icon: Palette,
      color: 'bg-rose-500 text-white',
      accent: 'border-rose-200'
    },
    {
      letter: 'M',
      title: 'Math (Toán học)',
      desc: 'Khái niệm số lượng, hình khối, sắp xếp logic, quy luật mẫu hình và phân loại đồ vật qua trò chơi vui vẻ.',
      icon: Calculator,
      color: 'bg-indigo-500 text-white',
      accent: 'border-indigo-200'
    }
  ];

  return (
    <section id="gioi-thieu" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3">
            <Heart className="w-3.5 h-3.5 text-emerald-600" />
            <span>Về BiBi Thiên Nga Preschool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nơi Khởi Đầu Hoàn Hảo Cho Tương Lai Rạng Rỡ Của Bé
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {schoolInfo.shortIntro}
          </p>
        </div>

        {/* 2-Column Story & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Triết lý giáo dục: <span className="text-emerald-700">"Mỗi đứa trẻ là một thiên tài duy nhất"</span>
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {schoolInfo.fullIntro}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">An toàn & Yêu thương tuyệt đối</h4>
                  <p className="text-xs text-slate-600">Không gian thiết kế bo tròn chống va đập, sàn gỗ kháng khuẩn, tỷ lệ giáo viên cao chăm sóc tận tình từng bữa ăn giấc ngủ.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-50/60 border border-teal-100">
                <Smile className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Tự do trải nghiệm & Phát triển tự nhiên</h4>
                  <p className="text-xs text-slate-600">Bé được khuyến khích đặt câu hỏi, tự làm thí nghiệm, tự xúc ăn và giao tiếp lễ phép, hòa đồng với bạn bè.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEnrollModal}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Hẹn lịch tham quan trực tiếp
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                  alt="Không gian mầm non BiBi Thiên Nga"
                  className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md">
                <div className="text-3xl font-black mb-1">05+</div>
                <div className="text-xs font-medium text-emerald-100">Khối lớp chuyên biệt từ 6 tháng đến 5 tuổi</div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm">
                <div className="text-3xl font-black text-amber-700 mb-1">100%</div>
                <div className="text-xs font-semibold text-slate-700">Giáo viên tốt nghiệp Sư phạm Mầm non</div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80"
                  alt="Trẻ em học vẽ sáng tạo"
                  className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 5 STEAM Pillars Cards */}
        <div className="mt-8 pt-8 border-t border-slate-100">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              5 Yếu Tố Cốt Lõi Trong Phương Pháp STEAM Tại BiBi Thiên Nga
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tích hợp đa môn học giúp trẻ tư duy phản biện, giải quyết vấn đề và phát triển não bộ tối ưu
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steamPillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.letter}
                  className="bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg ${pillar.color}`}>
                        {pillar.letter}
                      </span>
                      <IconComp className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">{pillar.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* School Information Snapshot Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div className="flex items-start gap-3.5 pt-4 md:pt-0">
              <MapPin className="w-6 h-6 text-emerald-300 shrink-0 mt-1" />
              <div>
                <p className="text-xs text-emerald-200 uppercase font-semibold">Địa chỉ trường</p>
                <p className="text-sm font-bold mt-0.5">{schoolInfo.address}, {schoolInfo.ward}</p>
                <p className="text-xs text-emerald-100">{schoolInfo.district}, {schoolInfo.city}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-6">
              <Clock className="w-6 h-6 text-emerald-300 shrink-0 mt-1" />
              <div>
                <p className="text-xs text-emerald-200 uppercase font-semibold">Thời gian hoạt động</p>
                <p className="text-sm font-bold mt-0.5">{schoolInfo.scheduleHours}</p>
                <p className="text-xs text-emerald-100">{schoolInfo.scheduleDays} · {schoolInfo.closedDays}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-6">
              <Phone className="w-6 h-6 text-emerald-300 shrink-0 mt-1" />
              <div>
                <p className="text-xs text-emerald-200 uppercase font-semibold">Hotline Tuyển sinh & Tư vấn</p>
                <a
                  href={`tel:${schoolInfo.hotline.replace(/[^0-9]/g, '')}`}
                  className="text-base font-extrabold text-amber-300 hover:text-white transition-colors block mt-0.5"
                >
                  {schoolInfo.hotline}
                </a>
                <p className="text-xs text-emerald-100">Độ tuổi: {schoolInfo.ageRange}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
