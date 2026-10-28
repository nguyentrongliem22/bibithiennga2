import React from 'react';
import { SchoolInfo } from '../types';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ShieldCheck,
  Facebook,
  ExternalLink,
  ChevronRight,
  Heart
} from 'lucide-react';

interface FooterProps {
  schoolInfo: SchoolInfo;
  onOpenEnrollModal: () => void;
  onNavigateToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  schoolInfo,
  onOpenEnrollModal,
  onNavigateToAdmin,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md">
                <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.15)"/>
                  <path d="M35,38 Q50,18 65,38 Q75,58 50,78 Q25,58 35,38 Z" fill="white"/>
                  <circle cx="44" cy="45" r="4" fill="#047857"/>
                  <path d="M50,78 Q50,88 40,88" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-black text-white leading-tight">
                  BiBi Thiên Nga
                </h3>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Steam Preschool (Đà Nẵng)
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {schoolInfo.shortIntro}
            </p>

            <div className="pt-2 flex items-center gap-3">
              {schoolInfo.facebookUrl && (
                <a
                  href={schoolInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook nhà trường"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {schoolInfo.zaloUrl && (
                <a
                  href={schoolInfo.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                  aria-label="Zalo tư vấn"
                >
                  Zalo
                </a>
              )}
              <button
                onClick={onNavigateToAdmin}
                className="flex items-center gap-1.5 px-3 h-9 rounded-xl bg-slate-800 hover:bg-emerald-700/80 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Trang Quản Trị</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Khám Phá Trường
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#gioi-thieu" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" /> Về BiBi Thiên Nga
                </a>
              </li>
              <li>
                <a href="#khoi-lop" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" /> Các khối lớp STEAM (6m - 5t)
                </a>
              </li>
              <li>
                <a href="#thuc-don" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" /> Chế độ dinh dưỡng 5 bữa/ngày
                </a>
              </li>
              <li>
                <a href="#co-so-vat-chat" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" /> Cơ sở vật chất & Camera
                </a>
              </li>
              <li>
                <a href="#giao-vien" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" /> Đội ngũ giáo viên sư phạm
                </a>
              </li>
              <li>
                <a href="#tin-tuc" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" /> Tin tức & Tuyển sinh
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Thông Tin Liên Hệ
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {schoolInfo.address}, {schoolInfo.ward}, {schoolInfo.district}, {schoolInfo.city}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline: </span>
                <a
                  href={`tel:${schoolInfo.hotline.replace(/[^0-9]/g, '')}`}
                  className="font-bold text-amber-300 hover:underline"
                >
                  {schoolInfo.hotline}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{schoolInfo.email}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p>Giờ đón trả trẻ: <strong>{schoolInfo.scheduleHours}</strong></p>
                  <p className="text-slate-400 text-xs">({schoolInfo.scheduleDays} · {schoolInfo.closedDays})</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenEnrollModal}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Đăng ký nhận tư vấn tuyển sinh
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {schoolInfo.name}. Mọi quyền được bảo lưu.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Nuôi dưỡng mầm xanh bằng</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>tại Cẩm Lệ, Đà Nẵng</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
