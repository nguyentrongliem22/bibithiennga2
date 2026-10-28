import React from 'react';
import { Facility } from '../types';
import {
  Building2,
  Atom,
  Trees,
  Utensils,
  Camera,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface FacilitiesSectionProps {
  facilities: Facility[];
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ facilities }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return <Atom className="w-6 h-6 text-emerald-600" />;
      case 'Trees':
        return <Trees className="w-6 h-6 text-emerald-600" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-emerald-600" />;
      case 'Camera':
        return <Camera className="w-6 h-6 text-emerald-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section id="co-so-vat-chat" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 mb-3">
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Không gian học tập</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cơ Sở Vật Chất Hiện Đại & An Toàn Thân Thiện
          </h2>
          <p className="mt-3 text-base text-slate-600">
            BiBi Thiên Nga được thiết kế tỉ mỉ từng chi tiết với mục tiêu mang lại sự an toàn cao nhất, kích thích trí tò mò sáng tạo và không gian mở xanh mát.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-emerald-50/40 rounded-3xl overflow-hidden border border-emerald-100 shadow-md hover:shadow-xl hover:border-emerald-300 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 group"
            >
              <div className="sm:col-span-5 h-56 sm:h-auto relative overflow-hidden bg-slate-100">
                <img
                  src={fac.imageUrl}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-800 shadow-xs">
                  {fac.highlight}
                </div>
              </div>

              <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-emerald-100 flex items-center justify-center mb-4">
                    {getIcon(fac.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-emerald-100/80 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Đạt chuẩn an toàn trường mầm non</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
