import React, { useState, useEffect } from 'react';
import { KindergartenState, AdmissionInquiry, Testimonial } from './types';
import {
  getStoredData,
  saveStoredData,
  addInquiry,
  addTestimonial
} from './utils/kindergartenStore';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ClassesSection } from './components/ClassesSection';
import { NutritionMenuSection } from './components/NutritionMenuSection';
import { TeachersSection } from './components/TeachersSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { GallerySection } from './components/GallerySection';
import { NewsSection } from './components/NewsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { EnrollmentModal } from './components/EnrollmentModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { Phone, CalendarCheck, ShieldCheck, ArrowUp } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<KindergartenState>(() => getStoredData());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminView, setShowAdminView] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [preferredClassForEnroll, setPreferredClassForEnroll] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('trang-chu');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync state across tabs or custom storage events
  useEffect(() => {
    const handleDataUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<KindergartenState>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      }
    };
    window.addEventListener('kindergarten_data_updated', handleDataUpdate);
    return () => window.removeEventListener('kindergarten_data_updated', handleDataUpdate);
  }, []);

  // Handle scroll detection for active section & scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['trang-chu', 'gioi-thieu', 'khoi-lop', 'thuc-don', 'giao-vien', 'co-so-vat-chat', 'hinh-anh', 'tin-tuc'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Direct inquiry submission handler
  const handleAddInquiry = (inquiryData: Omit<AdmissionInquiry, 'id' | 'status' | 'createdAt'>) => {
    const { newState } = addInquiry(data, inquiryData);
    setData(newState);
  };

  // Review submission handler
  const handleAddReview = (reviewData: Omit<Testimonial, 'id' | 'isApproved'>) => {
    const updated = addTestimonial(data, {
      ...reviewData,
      isApproved: false, // Sent for admin approval
    });
    setData(updated);
  };

  const handleOpenEnrollModal = (className?: string) => {
    setPreferredClassForEnroll(className);
    setIsEnrollModalOpen(true);
  };

  const handleNavigateToAdmin = () => {
    if (isAdminLoggedIn) {
      setShowAdminView(true);
    } else {
      setShowAdminLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowAdminLoginModal(false);
    setShowAdminView(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Admin Mode, render full Admin Portal
  if (showAdminView) {
    return (
      <AdminPortal
        data={data}
        onUpdateState={(updated) => setData(updated)}
        onBackToWebsite={() => setShowAdminView(false)}
      />
    );
  }

  // Otherwise, render the Public Website Experience
  return (
    <div className="min-h-screen flex flex-col bg-emerald-50/20 text-slate-800">
      {/* 1. Header & Navigation */}
      <Header
        schoolInfo={data.schoolInfo}
        inquiries={data.inquiries}
        onOpenEnrollModal={handleOpenEnrollModal}
        onNavigateToAdmin={handleNavigateToAdmin}
        activeSection={activeSection}
      />

      {/* 2. Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          schoolInfo={data.schoolInfo}
          onOpenEnrollModal={() => handleOpenEnrollModal()}
        />

        {/* About & STEAM Pillars */}
        <AboutSection
          schoolInfo={data.schoolInfo}
          onOpenEnrollModal={() => handleOpenEnrollModal()}
        />

        {/* Classes & Fees */}
        <ClassesSection
          classes={data.classes}
          onOpenEnrollModal={handleOpenEnrollModal}
        />

        {/* Nutrition & Weekly Menu */}
        <NutritionMenuSection
          menu={data.menu}
        />

        {/* Facilities */}
        <FacilitiesSection
          facilities={data.facilities}
        />

        {/* Teachers */}
        <TeachersSection
          teachers={data.teachers}
        />

        {/* Photo Gallery */}
        <GallerySection
          gallery={data.gallery}
        />

        {/* News & Events */}
        <NewsSection
          news={data.news}
        />

        {/* Parent Testimonials */}
        <TestimonialsSection
          testimonials={data.testimonials}
          onAddReview={handleAddReview}
        />
      </main>

      {/* 3. Footer */}
      <Footer
        schoolInfo={data.schoolInfo}
        onOpenEnrollModal={() => handleOpenEnrollModal()}
        onNavigateToAdmin={handleNavigateToAdmin}
      />

      {/* 4. Modals */}
      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        classes={data.classes}
        preferredClass={preferredClassForEnroll}
        onAddInquiry={handleAddInquiry}
        hotline={data.schoolInfo.hotline}
      />

      <AdminLoginModal
        isOpen={showAdminLoginModal}
        onClose={() => setShowAdminLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 5. Floating Quick Action Controls */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        {/* Floating Quick Admin Button */}
        <button
          onClick={handleNavigateToAdmin}
          className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2.5 rounded-full shadow-lg border border-slate-700 backdrop-blur-xs transition-all hover:scale-105 cursor-pointer group"
          title="Truy cập khu vực Quản trị"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Quản Trị</span>
          {data.inquiries.filter((i) => i.status === 'new').length > 0 && (
            <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {data.inquiries.filter((i) => i.status === 'new').length}
            </span>
          )}
        </button>

        {/* Floating Hotline Button */}
        <a
          href={`tel:${data.schoolInfo.hotline.replace(/[^0-9]/g, '')}`}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl shadow-emerald-600/30 transition-all hover:scale-105"
          title="Gọi ngay Hotline trường"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          <span className="font-extrabold">{data.schoolInfo.hotline}</span>
        </a>

        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-md border border-slate-200 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Cuộn lên đầu trang"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
