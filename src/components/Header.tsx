import React, { useState } from 'react';
import { SchoolInfo, AdmissionInquiry } from '../types';
import {
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Menu as MenuIcon,
  X,
  GraduationCap,
  CalendarCheck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  schoolInfo: SchoolInfo;
  inquiries: AdmissionInquiry[];
  onOpenEnrollModal: (preferredClass?: string) => void;
  onNavigateToAdmin: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  schoolInfo,
  inquiries,
  onOpenEnrollModal,
  onNavigateToAdmin,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  const navItems = [
    { label: 'Trang chủ', href: '#trang-chu' },
    { label: 'Giới thiệu', href: '#gioi-thieu' },
    { label: 'Khối lớp STEAM', href: '#khoi-lop' },
    { label: 'Dinh dưỡng & Thực đơn', href: '#thuc-don' },
    { label: 'Đội ngũ giáo viên', href: '#giao-vien' },
    { label: 'Cơ sở vật chất', href: '#co-so-vat-chat' },
    { label: 'Thư viện ảnh', href: '#hinh-anh' },
    { label: 'Tin tức & Sự kiện', href: '#tin-tuc' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* 1. Emergency or Promotional Top Banner */}
      {schoolInfo.isEmergencyNoticeActive && schoolInfo.emergencyNotice && (
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white text-xs sm:text-sm py-2 px-4 shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-medium truncate">
              <span className="flex h-2 w-2 rounded-full bg-amber-300 animate-pulse shrink-0" />
              <span className="truncate">{schoolInfo.emergencyNotice}</span>
            </div>
            <button
              onClick={() => onOpenEnrollModal()}
              className="hidden md:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Nhận ưu đãi ngay <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Top Info Utility Bar */}
      <div className="hidden lg:block bg-slate-50 border-b border-slate-100 text-xs text-slate-600 py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{schoolInfo.address}, {schoolInfo.ward}, {schoolInfo.district}, {schoolInfo.city}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{schoolInfo.scheduleHours} ({schoolInfo.scheduleDays})</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${schoolInfo.hotline.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hotline: {schoolInfo.hotline}</span>
            </a>
            <span className="text-slate-300">|</span>
            <button
              onClick={onNavigateToAdmin}
              className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-700 font-medium transition-colors cursor-pointer group"
              title="Truy cập khu vực quản trị trang web"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600" />
              <span>Quản trị viên</span>
              {pendingInquiriesCount > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {pendingInquiriesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <a href="#trang-chu" className="flex items-center gap-3 group focus:outline-hidden">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform duration-300">
              <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.15)"/>
                <path d="M35,38 Q50,18 65,38 Q75,58 50,78 Q25,58 35,38 Z" fill="white"/>
                <circle cx="44" cy="45" r="4" fill="#047857"/>
                <path d="M50,78 Q50,88 40,88" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                BiBi Thiên Nga
              </span>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> STEAM Preschool
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => onOpenEnrollModal()}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Đăng ký tham quan</span>
            </button>
            <button
              onClick={onNavigateToAdmin}
              className="flex lg:hidden items-center gap-1.5 p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              title="Quản trị"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => onOpenEnrollModal()}
              className="sm:hidden bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shadow-xs"
            >
              Đăng ký
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-emerald-100 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2 mb-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div className="text-xs text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {schoolInfo.address}, {schoolInfo.ward}, {schoolInfo.district}
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Hotline: {schoolInfo.hotline}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnrollModal();
                }}
                className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 text-white py-2.5 rounded-xl font-semibold text-sm shadow-xs"
              >
                <CalendarCheck className="w-4 h-4" /> Đăng ký
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToAdmin();
                }}
                className="w-full flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" /> Quản trị
                {pendingInquiriesCount > 0 && (
                  <span className="bg-amber-500 text-white text-xs px-1.5 py-0.2 rounded-full">
                    {pendingInquiriesCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
