import React from 'react';
import { Teacher } from '../types';
import {
  GraduationCap,
  Award,
  Sparkles,
  Heart,
  BookOpen,
  Calendar
} from 'lucide-react';

interface TeachersSectionProps {
  teachers: Teacher[];
}

export const TeachersSection: React.FC<TeachersSectionProps> = ({ teachers }) => {
  return (
    <section id="giao-vien" className="py-16 lg:py-24 bg-emerald-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
            <span>Đội ngũ chuyên môn</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Đội Ngũ Giáo Viên Tận Tâm, Trách Nhiệm & Giàu Yêu Thương
          </h2>
          <p className="mt-3 text-base text-slate-600">
            100% giáo viên tại BiBi Thiên Nga được đào tạo bài bản chuyên ngành Sư phạm Mầm non, sở hữu chứng chỉ STEAM quốc tế và chứng nhận Sơ cấp cứu sơ sinh.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-md hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={teacher.avatarUrl}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-800 px-3 py-1 rounded-full text-xs font-bold shadow-xs flex items-center gap-1 border border-emerald-100">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{teacher.experienceYears} năm kinh nghiệm</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-xs text-amber-300 font-semibold block">{teacher.assignedClass}</span>
                    <h3 className="text-lg font-extrabold">{teacher.name}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide block mb-1">
                      {teacher.role}
                    </span>
                    <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {teacher.qualification}
                    </p>
                  </div>

                  {/* STEAM Certification Badge */}
                  <div className="bg-emerald-50/80 border border-emerald-200/70 rounded-xl p-2.5 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-xs font-semibold text-emerald-900">{teacher.steamCert}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic border-l-2 border-emerald-400 pl-3">
                    "{teacher.bio}"
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" /> Luôn đồng hành cùng bé
                  </span>
                  <span>BiBi Thiên Nga</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
