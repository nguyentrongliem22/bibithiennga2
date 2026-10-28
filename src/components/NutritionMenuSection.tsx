import React, { useState } from 'react';
import { MenuItem } from '../types';
import {
  Utensils,
  Coffee,
  Apple,
  Soup,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Flame,
  Calendar,
  Sparkles
} from 'lucide-react';

interface NutritionMenuSectionProps {
  menu: MenuItem[];
}

export const NutritionMenuSection: React.FC<NutritionMenuSectionProps> = ({ menu }) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const activeMenu = menu[activeDayIndex] || menu[0];

  return (
    <section id="thuc-don" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 mb-3">
            <Utensils className="w-3.5 h-3.5 text-emerald-700" />
            <span>Chế độ dinh dưỡng học đường</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Thực Đơn Dinh Dưỡng Khoa Học 5 Bữa/Ngày
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Nguồn thực phẩm hữu cơ VietGAP tươi mới mỗi ngày. Chế độ ăn cân đối 4 nhóm dưỡng chất thiết yếu giúp bé khỏe mạnh, thông minh và tràn đầy năng lượng.
          </p>
        </div>

        {/* Days of week tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {menu.map((item, index) => {
            const isActive = index === activeDayIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveDayIndex(index)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
                    : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{item.dayOfWeek}</span>
              </button>
            );
          })}
        </div>

        {/* Current Day Menu Display Card */}
        {activeMenu && (
          <div className="bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xl mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-emerald-100 gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                  Thực đơn chi tiết
                </span>
                <h3 className="text-2xl font-black text-slate-900">{activeMenu.dayOfWeek}</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Năng lượng: {activeMenu.calories}</span>
                </div>
              </div>
            </div>

            {/* 5 Meals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. Bữa Sáng */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Bữa Sáng (7:30 - 8:15)</span>
                    <h4 className="text-sm font-bold text-slate-900">Điểm tâm nạp năng lượng</h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-amber-50/40 p-3 rounded-xl">
                  {activeMenu.breakfast}
                </p>
              </div>

              {/* 2. Phụ Sáng */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Apple className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Phụ Sáng (9:15 - 9:30)</span>
                    <h4 className="text-sm font-bold text-slate-900">Vitamin & Sữa hạt</h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-emerald-50/40 p-3 rounded-xl">
                  {activeMenu.morningSnack}
                </p>
              </div>

              {/* 3. Bữa Trưa */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:border-emerald-200 transition-colors lg:col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Bữa Trưa Chính (11:00 - 11:45)</span>
                    <h4 className="text-sm font-bold text-slate-900">Cơm nóng & Canh thanh mát</h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-teal-50/40 p-3 rounded-xl">
                  {activeMenu.lunch}
                </p>
              </div>

              {/* 4. Bữa Xế Chiều */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
                    <Soup className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">Bữa Xế (14:30 - 15:00)</span>
                    <h4 className="text-sm font-bold text-slate-900">Sau giấc ngủ trưa</h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-orange-50/40 p-3 rounded-xl">
                  {activeMenu.afternoonSnack}
                </p>
              </div>

              {/* 5. Chiều Muộn */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:border-emerald-200 transition-colors md:col-span-2 lg:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Chiều Muộn (16:30 - 17:00)</span>
                    <h4 className="text-sm font-bold text-slate-900">Sữa men sống & Nạp dưỡng chất trước giờ về</h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-indigo-50/40 p-3 rounded-xl">
                  {activeMenu.eveningMeal}
                </p>
              </div>
            </div>

            {/* Note & Allergy Warning */}
            {activeMenu.allergensNote && (
              <div className="mt-6 flex items-start gap-2.5 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <span>
                  <strong>Lưu ý dị ứng:</strong> {activeMenu.allergensNote}. Đối với trẻ có chế độ ăn kiêng hoặc cơ địa dị ứng đặc thù, nhà trường có thực đơn thay thế riêng.
                </span>
              </div>
            )}
          </div>
        )}

        {/* 3 Commitments of School Kitchen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Thực phẩm VietGAP có kiểm định</h4>
              <p className="text-xs text-slate-600 mt-1">100% nguyên liệu nhập tươi hàng sáng từ các nhà cung cấp uy tín tại Đà Nẵng, có lưu mẫu thức ăn 24 giờ.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Quy tắc 3 KHÔNG an toàn</h4>
              <p className="text-xs text-slate-600 mt-1">Không bột ngọt, Không chất bảo quản nhân tạo, Không phẩm màu công nghiệp. Vị ngọt thanh thuần khiết từ rau củ quả.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Bếp ăn một chiều khép kín</h4>
              <p className="text-xs text-slate-600 mt-1">Đạt chứng nhận Vệ sinh An toàn Thực phẩm theo chuẩn Bộ Y Tế, dụng cụ ăn uống được sấy khử khuẩn bằng tia UV.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
