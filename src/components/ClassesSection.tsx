import React, { useState } from 'react';
import { KindergartenClass } from '../types';
import { formatVND } from '../utils/kindergartenStore';
import {
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Baby,
  Calendar,
  Layers,
  Award
} from 'lucide-react';

interface ClassesSectionProps {
  classes: KindergartenClass[];
  onOpenEnrollModal: (preferredClass?: string) => void;
}

export const ClassesSection: React.FC<ClassesSectionProps> = ({ classes, onOpenEnrollModal }) => {
  const [selectedClass, setSelectedClass] = useState<KindergartenClass | null>(null);

  return (
    <section id="khoi-lop" className="py-16 lg:py-24 bg-emerald-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 mb-3">
            <Baby className="w-3.5 h-3.5 text-emerald-700" />
            <span>Chương trình & Khối lớp</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Khối Lớp STEAM Theo Từng Độ Tuổi (Từ 6 Tháng Đến 5 Tuổi)
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Mỗi lứa tuổi có nhịp sinh học và tâm lý phát triển riêng biệt. BiBi Thiên Nga thiết kế lộ trình chuẩn cá nhân hóa để trẻ luôn háo hức mỗi ngày đến trường.
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls) => {
            const percentFilled = Math.min(100, Math.round((cls.enrolledCount / cls.capacity) * 100));
            const spotsRemaining = Math.max(0, cls.capacity - cls.enrolledCount);

            return (
              <div
                key={cls.id}
                className="bg-white rounded-3xl overflow-hidden border border-emerald-100/80 shadow-md hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Class Image & Age Badge */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={cls.imageUrl}
                      alt={cls.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                    {/* Age Group Floating Tag */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-sm text-xs font-bold text-emerald-800 border border-emerald-100">
                      {cls.ageGroup}
                    </div>

                    {/* Spots remaining badge */}
                    <div className="absolute top-3 right-3 bg-amber-500/95 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-xs">
                      {spotsRemaining > 0 ? `Còn ${spotsRemaining} chỉ tiêu` : 'Đã đủ sĩ số'}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs text-emerald-200 font-medium">Giáo viên phụ trách:</p>
                      <p className="text-sm font-semibold truncate">{cls.teacherLead}</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                      {cls.name}
                    </h3>

                    {/* STEAM Focus Box */}
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 mb-4">
                      <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Trọng tâm STEAM:
                      </p>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">{cls.steamFocus}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {cls.description}
                    </p>

                    {/* Key Features Bullet List */}
                    <ul className="space-y-1.5 mb-5 text-xs text-slate-600">
                      {cls.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Capacity & Progress */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Sĩ số đã nhận:</span>
                        <span className="font-semibold text-slate-700">{cls.enrolledCount}/{cls.capacity} bé</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with Tuition & Enroll CTA */}
                <div className="p-6 pt-0 mt-2">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xs text-slate-500">Học phí niêm yết:</span>
                    <span className="text-base sm:text-lg font-extrabold text-emerald-700">
                      {formatVND(cls.feePerMonth)}
                      <span className="text-xs font-normal text-slate-400">/tháng</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedClass(cls)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => onOpenEnrollModal(cls.name)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-semibold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Đăng ký</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Class Details Popup */}
        {selectedClass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 p-6 sm:p-8 relative">
              <button
                onClick={() => setSelectedClass(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                aria-label="Đóng cửa sổ chi tiết"
              >
                ✕
              </button>

              <div className="relative h-48 rounded-2xl overflow-hidden mb-5">
                <img src={selectedClass.imageUrl} alt={selectedClass.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-emerald-800">
                  Độ tuổi: {selectedClass.ageGroup}
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-2">{selectedClass.name}</h3>
              <p className="text-xs font-semibold text-emerald-700 mb-4 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> Trọng tâm STEAM: {selectedClass.steamFocus}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed mb-5">{selectedClass.description}</p>

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Đặc quyền & Phương pháp nổi bật:
              </h4>
              <ul className="space-y-2 mb-6">
                {selectedClass.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between mb-6 border border-slate-100">
                <div>
                  <span className="text-xs text-slate-500 block">Học phí:</span>
                  <span className="text-xl font-extrabold text-emerald-700">{formatVND(selectedClass.feePerMonth)}/tháng</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Sĩ số lớp:</span>
                  <span className="text-sm font-bold text-slate-800">{selectedClass.enrolledCount} / {selectedClass.capacity} bé</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedClass(null)}
                  className="w-1/2 py-3 rounded-xl border border-slate-200 font-semibold text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    const cName = selectedClass.name;
                    setSelectedClass(null);
                    onOpenEnrollModal(cName);
                  }}
                  className="w-1/2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
                >
                  Đăng ký cho bé ngay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
