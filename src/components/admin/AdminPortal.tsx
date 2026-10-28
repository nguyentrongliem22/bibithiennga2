import React, { useState } from 'react';
import {
  KindergartenState,
  SchoolInfo,
  KindergartenClass,
  MenuItem,
  Teacher,
  NewsArticle,
  GalleryItem,
  AdmissionInquiry,
  Facility,
  Testimonial,
  InquiryStatus,
  GalleryCategory,
  NewsCategory
} from '../../types';
import {
  formatVND,
  formatDateVN,
  updateSchoolInfo,
  addClass,
  updateClass,
  deleteClass,
  updateMenuItem,
  addMenuItem,
  deleteMenuItem,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  addNews,
  updateNews,
  deleteNews,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  updateInquiryStatus,
  deleteInquiry,
  addFacility,
  updateFacility,
  deleteFacility,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  exportBackupJSON,
  validateAndImportBackupJSON,
  resetToFactoryDefaults
} from '../../utils/kindergartenStore';
import {
  LayoutDashboard,
  Building,
  GraduationCap,
  Utensils,
  Users,
  Newspaper,
  Image,
  Inbox,
  Sparkles,
  Sliders,
  Database,
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  Save,
  Check,
  AlertCircle,
  ExternalLink,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Award,
  Layers,
  Heart,
  Cloud
} from 'lucide-react';
import { ImageUploadWidget } from '../common/ImageUploadWidget';
import { AdminR2Storage } from './AdminR2Storage';

interface AdminPortalProps {
  data: KindergartenState;
  onUpdateState: (newState: KindergartenState) => void;
  onBackToWebsite: () => void;
}

type AdminTab =
  | 'overview'
  | 'r2storage'
  | 'school'
  | 'classes'
  | 'menu'
  | 'teachers'
  | 'news'
  | 'gallery'
  | 'inquiries'
  | 'facilities'
  | 'testimonials'
  | 'backup';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  data,
  onUpdateState,
  onBackToWebsite,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  /* ============================================================
     TAB 1: SCHOOL INFO STATE & HANDLERS
     ============================================================ */
  const [schoolForm, setSchoolForm] = useState<SchoolInfo>({ ...data.schoolInfo });

  const handleSaveSchoolInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateSchoolInfo(data, schoolForm);
    onUpdateState(updated);
    showToast('Đã lưu thông tin trường học thành công!');
  };

  /* ============================================================
     TAB 2: CLASSES STATE & MODALS
     ============================================================ */
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<KindergartenClass | null>(null);
  const [classForm, setClassForm] = useState<Omit<KindergartenClass, 'id'>>({
    name: '',
    ageGroup: '',
    capacity: 15,
    enrolledCount: 0,
    feePerMonth: 3500000,
    steamFocus: '',
    description: '',
    features: [''],
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    teacherLead: '',
  });

  const openAddClass = () => {
    setEditingClass(null);
    setClassForm({
      name: '',
      ageGroup: '3 - 4 tuổi',
      capacity: 18,
      enrolledCount: 0,
      feePerMonth: 3500000,
      steamFocus: 'Khám phá STEAM & Trải nghiệm thực hành',
      description: 'Lớp học thân thiện, kích thích tư duy sáng tạo',
      features: ['Học cụ chuẩn STEAM', 'Tỷ lệ cô/trẻ chuẩn', 'Báo cáo hàng ngày'],
      imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
      teacherLead: 'Cô giáo phụ trách',
    });
    setClassModalOpen(true);
  };

  const openEditClass = (cls: KindergartenClass) => {
    setEditingClass(cls);
    setClassForm({
      name: cls.name,
      ageGroup: cls.ageGroup,
      capacity: cls.capacity,
      enrolledCount: cls.enrolledCount,
      feePerMonth: cls.feePerMonth,
      steamFocus: cls.steamFocus,
      description: cls.description,
      features: [...cls.features],
      imageUrl: cls.imageUrl,
      teacherLead: cls.teacherLead,
    });
    setClassModalOpen(true);
  };

  const handleSaveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classForm.name.trim()) return;

    if (editingClass) {
      const updated = updateClass(data, editingClass.id, classForm);
      onUpdateState(updated);
      showToast(`Đã cập nhật lớp "${classForm.name}" thành công!`);
    } else {
      const updated = addClass(data, classForm);
      onUpdateState(updated);
      showToast(`Đã thêm mới lớp "${classForm.name}" thành công!`);
    }
    setClassModalOpen(false);
  };

  const handleDeleteClass = (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa lớp "${name}" không?`)) {
      const updated = deleteClass(data, id);
      onUpdateState(updated);
      showToast(`Đã xóa lớp "${name}"!`);
    }
  };

  /* ============================================================
     TAB 3: MENU STATE & MODALS
     ============================================================ */
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [menuForm, setMenuForm] = useState<Omit<MenuItem, 'id'>>({
    dayOfWeek: 'Thứ Hai',
    breakfast: '',
    morningSnack: '',
    lunch: '',
    afternoonSnack: '',
    eveningMeal: '',
    calories: '1200 kcal',
    allergensNote: '',
  });

  const openEditMenu = (item: MenuItem) => {
    setEditingMenuItem(item);
    setMenuForm({
      dayOfWeek: item.dayOfWeek,
      breakfast: item.breakfast,
      morningSnack: item.morningSnack,
      lunch: item.lunch,
      afternoonSnack: item.afternoonSnack,
      eveningMeal: item.eveningMeal,
      calories: item.calories,
      allergensNote: item.allergensNote || '',
    });
    setMenuModalOpen(true);
  };

  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMenuItem) {
      const updated = updateMenuItem(data, editingMenuItem.id, menuForm);
      onUpdateState(updated);
      showToast(`Đã cập nhật thực đơn cho ${menuForm.dayOfWeek}!`);
    } else {
      const updated = addMenuItem(data, menuForm);
      onUpdateState(updated);
      showToast(`Đã thêm ngày thực đơn mới!`);
    }
    setMenuModalOpen(false);
  };

  /* ============================================================
     TAB 4: TEACHERS STATE & MODALS
     ============================================================ */
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [teacherForm, setTeacherForm] = useState<Omit<Teacher, 'id'>>({
    name: '',
    role: '',
    qualification: '',
    experienceYears: 5,
    bio: '',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    steamCert: 'Chứng chỉ STEAM Mầm non Quốc tế',
    assignedClass: '',
  });

  const openAddTeacher = () => {
    setEditingTeacher(null);
    setTeacherForm({
      name: '',
      role: 'Giáo viên Chủ nhiệm',
      qualification: 'Cử nhân Sư phạm Mầm non',
      experienceYears: 5,
      bio: 'Yêu thương trẻ nhỏ, tận tâm, trách nhiệm.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      steamCert: 'Chứng chỉ STEAM Quốc tế',
      assignedClass: 'Lớp Mầm STEAM',
    });
    setTeacherModalOpen(true);
  };

  const openEditTeacher = (t: Teacher) => {
    setEditingTeacher(t);
    setTeacherForm({
      name: t.name,
      role: t.role,
      qualification: t.qualification,
      experienceYears: t.experienceYears,
      bio: t.bio,
      avatarUrl: t.avatarUrl,
      steamCert: t.steamCert,
      assignedClass: t.assignedClass,
    });
    setTeacherModalOpen(true);
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherForm.name.trim()) return;

    if (editingTeacher) {
      const updated = updateTeacher(data, editingTeacher.id, teacherForm);
      onUpdateState(updated);
      showToast(`Đã cập nhật thông tin giáo viên ${teacherForm.name}!`);
    } else {
      const updated = addTeacher(data, teacherForm);
      onUpdateState(updated);
      showToast(`Đã thêm mới giáo viên ${teacherForm.name}!`);
    }
    setTeacherModalOpen(false);
  };

  const handleDeleteTeacher = (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa giáo viên "${name}"?`)) {
      const updated = deleteTeacher(data, id);
      onUpdateState(updated);
      showToast(`Đã xóa giáo viên "${name}"!`);
    }
  };

  /* ============================================================
     TAB 5: NEWS STATE & MODALS
     ============================================================ */
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [newsForm, setNewsForm] = useState<Omit<NewsArticle, 'id'>>({
    title: '',
    category: 'STEAM & Trải nghiệm',
    summary: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    date: new Date().toISOString().split('T')[0],
    author: 'Ban Truyền Thông BiBi',
    isPublished: true,
  });

  const openAddNews = () => {
    setEditingNews(null);
    setNewsForm({
      title: '',
      category: 'STEAM & Trải nghiệm',
      summary: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      date: new Date().toISOString().split('T')[0],
      author: 'Ban Truyền Thông BiBi',
      isPublished: true,
    });
    setNewsModalOpen(true);
  };

  const openEditNews = (art: NewsArticle) => {
    setEditingNews(art);
    setNewsForm({
      title: art.title,
      category: art.category,
      summary: art.summary,
      content: art.content,
      coverImage: art.coverImage,
      date: art.date,
      author: art.author,
      isPublished: art.isPublished,
    });
    setNewsModalOpen(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim()) return;

    if (editingNews) {
      const updated = updateNews(data, editingNews.id, newsForm);
      onUpdateState(updated);
      showToast(`Đã cập nhật bài viết "${newsForm.title}"!`);
    } else {
      const updated = addNews(data, newsForm);
      onUpdateState(updated);
      showToast(`Đã đăng bài viết mới thành công!`);
    }
    setNewsModalOpen(false);
  };

  const handleDeleteNews = (id: string, title: string) => {
    if (confirm(`Bạn có chắc muốn xóa bài viết "${title}"?`)) {
      const updated = deleteNews(data, id);
      onUpdateState(updated);
      showToast(`Đã xóa bài viết!`);
    }
  };

  /* ============================================================
     TAB 6: GALLERY STATE & MODALS
     ============================================================ */
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [galleryForm, setGalleryForm] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'Hoạt động STEAM',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const openAddGallery = () => {
    setEditingGallery(null);
    setGalleryForm({
      title: '',
      category: 'Hoạt động STEAM',
      imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
    setGalleryModalOpen(true);
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title.trim() || !galleryForm.imageUrl.trim()) return;

    if (editingGallery) {
      const updated = updateGalleryItem(data, editingGallery.id, galleryForm);
      onUpdateState(updated);
      showToast(`Đã cập nhật ảnh thành công!`);
    } else {
      const updated = addGalleryItem(data, galleryForm);
      onUpdateState(updated);
      showToast(`Đã thêm ảnh mới vào thư viện!`);
    }
    setGalleryModalOpen(false);
  };

  const handleDeleteGallery = (id: string, title: string) => {
    if (confirm(`Bạn có chắc muốn xóa ảnh "${title}"?`)) {
      const updated = deleteGalleryItem(data, id);
      onUpdateState(updated);
      showToast(`Đã xóa ảnh!`);
    }
  };

  /* ============================================================
     TAB 7: ADMISSION INQUIRIES MANAGEMENT
     ============================================================ */
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryFilterStatus, setInquiryFilterStatus] = useState<InquiryStatus | 'all'>('all');
  const [selectedInquiryForNotes, setSelectedInquiryForNotes] = useState<AdmissionInquiry | null>(null);
  const [staffNoteInput, setStaffNoteInput] = useState('');

  const filteredInquiries = data.inquiries.filter((inq) => {
    const matchesStatus = inquiryFilterStatus === 'all' || inq.status === inquiryFilterStatus;
    if (!matchesStatus) return false;
    if (!inquirySearch.trim()) return true;
    const q = inquirySearch.toLowerCase();
    return (
      inq.parentName.toLowerCase().includes(q) ||
      inq.phone.includes(q) ||
      inq.childName.toLowerCase().includes(q) ||
      inq.targetClass.toLowerCase().includes(q)
    );
  });

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    const updated = updateInquiryStatus(data, id, newStatus);
    onUpdateState(updated);
    showToast(`Đã cập nhật trạng thái hồ sơ!`);
  };

  const handleSaveStaffNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiryForNotes) return;
    const updated = updateInquiryStatus(
      data,
      selectedInquiryForNotes.id,
      selectedInquiryForNotes.status,
      staffNoteInput
    );
    onUpdateState(updated);
    setSelectedInquiryForNotes(null);
    showToast(`Đã lưu ghi chú xử lý!`);
  };

  const handleDeleteInquiry = (id: string, parentName: string) => {
    if (confirm(`Xóa hồ sơ đăng ký của phụ huynh "${parentName}"?`)) {
      const updated = deleteInquiry(data, id);
      onUpdateState(updated);
      showToast(`Đã xóa hồ sơ!`);
    }
  };

  /* ============================================================
     TAB 8: FACILITIES & TESTIMONIALS
     ============================================================ */
  const handleToggleTestimonialApproved = (t: Testimonial) => {
    const updated = updateTestimonial(data, t.id, { isApproved: !t.isApproved });
    onUpdateState(updated);
    showToast(`Đã ${!t.isApproved ? 'duyệt hiển thị' : 'ẩn'} đánh giá của ${t.parentName}!`);
  };

  const handleDeleteTestimonial = (id: string, parentName: string) => {
    if (confirm(`Xóa đánh giá của "${parentName}"?`)) {
      const updated = deleteTestimonial(data, id);
      onUpdateState(updated);
      showToast(`Đã xóa đánh giá!`);
    }
  };

  /* ============================================================
     TAB 9: BACKUP & RESTORE
     ============================================================ */
  const [restoreJsonText, setRestoreJsonText] = useState('');
  const [restoreError, setRestoreError] = useState('');

  const handleDownloadBackup = () => {
    const json = exportBackupJSON(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_bibi_thien_nga_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống file sao lưu JSON an toàn!');
  };

  const handleImportBackup = () => {
    try {
      setRestoreError('');
      const imported = validateAndImportBackupJSON(restoreJsonText);
      onUpdateState(imported);
      setRestoreJsonText('');
      showToast('Khôi phục dữ liệu thành công!');
    } catch (err: any) {
      setRestoreError(err?.message || 'Lỗi khi nhập file dữ liệu!');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Khôi phục toàn bộ dữ liệu ban đầu của trường mầm non BiBi Thiên Nga? Mọi chỉnh sửa thử nghiệm sẽ được đưa về dữ liệu chuẩn.')) {
      const fresh = resetToFactoryDefaults();
      onUpdateState(fresh);
      showToast('Đã đặt lại dữ liệu mẫu thành công!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                  Cổng Quản Trị Hệ Thống
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                    Admin BiBi
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                  Trường Mầm non BiBi Thiên Nga Steam Preschool (37 Phan Văn Trị, Cẩm Lệ, Đà Nẵng)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onBackToWebsite}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Xem Website Ngoài</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-sm sticky top-22">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
                Danh mục quản lý
              </p>
              <nav className="space-y-1">
                {[
                  { id: 'overview', label: 'Tổng quan & Thống kê', icon: LayoutDashboard },
                  { id: 'r2storage', label: 'Lưu trữ R2 Cloudflare', icon: Cloud },
                  { id: 'inquiries', label: 'Hồ sơ tuyển sinh', icon: Inbox, badge: data.inquiries.filter(i => i.status === 'new').length },
                  { id: 'school', label: 'Thông tin trường', icon: Building },
                  { id: 'classes', label: 'Khối lớp & Học phí', icon: Layers, badge: data.classes.length },
                  { id: 'menu', label: 'Thực đơn dinh dưỡng', icon: Utensils },
                  { id: 'teachers', label: 'Đội ngũ giáo viên', icon: Users, badge: data.teachers.length },
                  { id: 'news', label: 'Tin tức & Hoạt động', icon: Newspaper, badge: data.news.length },
                  { id: 'gallery', label: 'Thư viện ảnh', icon: Image, badge: data.gallery.length },
                  { id: 'facilities', label: 'Cơ sở vật chất', icon: Sparkles },
                  { id: 'testimonials', label: 'Đánh giá phụ huynh', icon: Heart, badge: data.testimonials.length },
                  { id: 'backup', label: 'Sao lưu & Dữ liệu', icon: Database },
                ].map((item) => {
                  const IconC = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as AdminTab)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-xs font-bold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconC className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                            isActive
                              ? 'bg-white text-emerald-700'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Tab Content View */}
          <div className="lg:col-span-9">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                    <p className="text-xs text-slate-500 font-medium">Hồ sơ chờ tư vấn</p>
                    <p className="text-2xl font-black text-amber-600 mt-1">
                      {data.inquiries.filter((i) => i.status === 'new').length}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">Tổng: {data.inquiries.length} hồ sơ</p>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                    <p className="text-xs text-slate-500 font-medium">Khối lớp mầm non</p>
                    <p className="text-2xl font-black text-emerald-600 mt-1">{data.classes.length}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Nhận trẻ: 6m - 5t</p>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                    <p className="text-xs text-slate-500 font-medium">Giáo viên sư phạm</p>
                    <p className="text-2xl font-black text-teal-600 mt-1">{data.teachers.length}</p>
                    <p className="text-[11px] text-slate-400 mt-1">100% đạt chuẩn STEAM</p>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                    <p className="text-xs text-slate-500 font-medium">Bài viết & Hoạt động</p>
                    <p className="text-2xl font-black text-indigo-600 mt-1">{data.news.length}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Thư viện ảnh: {data.gallery.length} ảnh</p>
                  </div>
                </div>

                {/* Recent Inquiries Quick Table */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Hồ Sơ Đăng Ký Tham Quan Mới Nhất</h3>
                      <p className="text-xs text-slate-500">Các bậc phụ huynh đăng ký qua form trực tuyến trên website</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs text-emerald-700 font-bold hover:underline"
                    >
                      Xem tất cả ({data.inquiries.length}) →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                        <tr>
                          <th className="py-2.5 px-3 font-semibold">Phụ huynh</th>
                          <th className="py-2.5 px-3 font-semibold">Bé & Lớp</th>
                          <th className="py-2.5 px-3 font-semibold">Số điện thoại</th>
                          <th className="py-2.5 px-3 font-semibold">Ngày đăng ký</th>
                          <th className="py-2.5 px-3 font-semibold">Trạng thái</th>
                          <th className="py-2.5 px-3 font-semibold text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {data.inquiries.slice(0, 5).map((inq) => (
                          <tr key={inq.id} className="hover:bg-slate-50">
                            <td className="py-3 px-3 font-bold text-slate-900">{inq.parentName}</td>
                            <td className="py-3 px-3 text-slate-600">
                              {inq.childName} ({inq.childAgeOrDob}) · <span className="text-emerald-700 font-medium">{inq.targetClass}</span>
                            </td>
                            <td className="py-3 px-3">
                              <a href={`tel:${inq.phone}`} className="font-semibold text-emerald-700 hover:underline">
                                {inq.phone}
                              </a>
                            </td>
                            <td className="py-3 px-3 text-slate-500">{formatDateVN(inq.createdAt)}</td>
                            <td className="py-3 px-3">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  inq.status === 'new'
                                    ? 'bg-amber-100 text-amber-800'
                                    : inq.status === 'contacted'
                                    ? 'bg-blue-100 text-blue-800'
                                    : inq.status === 'visited'
                                    ? 'bg-purple-100 text-purple-800'
                                    : inq.status === 'enrolled'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {inq.status === 'new' && 'Chờ liên hệ'}
                                {inq.status === 'contacted' && 'Đã tư vấn'}
                                {inq.status === 'visited' && 'Đã tham quan'}
                                {inq.status === 'enrolled' && 'Đã nhập học'}
                                {inq.status === 'cancelled' && 'Đã hủy'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedInquiryForNotes(inq);
                                  setStaffNoteInput(inq.staffNotes || '');
                                }}
                                className="text-xs text-emerald-600 font-bold hover:underline"
                              >
                                Ghi chú
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Info reminder */}
                <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      {data.schoolInfo.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {data.schoolInfo.address}, {data.schoolInfo.ward}, {data.schoolInfo.district}, {data.schoolInfo.city} · Hotline: {data.schoolInfo.hotline}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('school')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Chỉnh sửa thông tin trường
                  </button>
                </div>
              </div>
            )}

            {/* R2 CLOUDFLARE STORAGE TAB */}
            {activeTab === 'r2storage' && (
              <AdminR2Storage
                onShowToast={showToast}
                onAddGalleryItem={(item) => {
                  const updated = addGalleryItem(data, item);
                  onUpdateState(updated);
                }}
              />
            )}

            {/* 2. SCHOOL INFO TAB */}
            {activeTab === 'school' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Thông Tin Chung Nhà Trường</h3>
                  <p className="text-xs text-slate-500">Cập nhật thông tin cơ bản, địa chỉ, hotline, giờ hoạt động và thông báo ưu đãi</p>
                </div>

                <form onSubmit={handleSaveSchoolInfo} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tên trường mầm non</label>
                      <input
                        type="text"
                        value={schoolForm.name}
                        onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Hotline liên hệ</label>
                      <input
                        type="text"
                        value={schoolForm.hotline}
                        onChange={(e) => setSchoolForm({ ...schoolForm, hotline: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Khẩu hiệu / Slogan</label>
                    <input
                      type="text"
                      value={schoolForm.slogan}
                      onChange={(e) => setSchoolForm({ ...schoolForm, slogan: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Địa chỉ số nhà & đường</label>
                      <input
                        type="text"
                        value={schoolForm.address}
                        onChange={(e) => setSchoolForm({ ...schoolForm, address: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phường</label>
                      <input
                        type="text"
                        value={schoolForm.ward}
                        onChange={(e) => setSchoolForm({ ...schoolForm, ward: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Quận / Huyện</label>
                      <input
                        type="text"
                        value={schoolForm.district}
                        onChange={(e) => setSchoolForm({ ...schoolForm, district: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Độ tuổi nhận trẻ</label>
                      <input
                        type="text"
                        value={schoolForm.ageRange}
                        onChange={(e) => setSchoolForm({ ...schoolForm, ageRange: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Giờ mở cửa đón trẻ</label>
                      <input
                        type="text"
                        value={schoolForm.scheduleHours}
                        onChange={(e) => setSchoolForm({ ...schoolForm, scheduleHours: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ngày hoạt động trong tuần</label>
                      <input
                        type="text"
                        value={schoolForm.scheduleDays}
                        onChange={(e) => setSchoolForm({ ...schoolForm, scheduleDays: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Giới thiệu ngắn (Xuất hiện ở Header/Footer)</label>
                    <textarea
                      rows={2}
                      value={schoolForm.shortIntro}
                      onChange={(e) => setSchoolForm({ ...schoolForm, shortIntro: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Giới thiệu chi tiết triết lý giáo dục STEAM</label>
                    <textarea
                      rows={4}
                      value={schoolForm.fullIntro}
                      onChange={(e) => setSchoolForm({ ...schoolForm, fullIntro: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  {/* Emergency notice banner toggle */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Thanh thông báo khẩn cấp / Ưu đãi đầu trang</span>
                        <span className="text-[11px] text-slate-500">Hiển thị dải banner màu xanh nổi bật trên đầu trang website</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={schoolForm.isEmergencyNoticeActive}
                          onChange={(e) => setSchoolForm({ ...schoolForm, isEmergencyNoticeActive: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <input
                      type="text"
                      value={schoolForm.emergencyNotice}
                      onChange={(e) => setSchoolForm({ ...schoolForm, emergencyNotice: e.target.value })}
                      placeholder="Nội dung thông báo (VD: Khai giảng lớp STEAM mới...)"
                      className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 bg-white"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Lưu thay đổi thông tin trường</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 3. CLASSES TAB */}
            {activeTab === 'classes' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Quản Lý Khối Lớp & Học Phí</h3>
                    <p className="text-xs text-slate-500">Thêm, chỉnh sửa hoặc xóa các lớp học mầm non và chương trình STEAM</p>
                  </div>
                  <button
                    onClick={openAddClass}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm khối lớp mới</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.classes.map((cls) => (
                    <div key={cls.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                              {cls.ageGroup}
                            </span>
                            <h4 className="text-base font-bold text-slate-900 mt-1">{cls.name}</h4>
                          </div>
                          <span className="text-sm font-extrabold text-emerald-700">{formatVND(cls.feePerMonth)}/th</span>
                        </div>

                        <p className="text-xs text-slate-600 mb-3">{cls.description}</p>
                        <p className="text-xs text-emerald-800 font-semibold mb-3">
                          🔬 Trọng tâm: {cls.steamFocus}
                        </p>

                        <div className="text-xs text-slate-500 space-y-1 mb-4">
                          <p>Cô phụ trách: <strong>{cls.teacherLead}</strong></p>
                          <p>Sĩ số: <strong>{cls.enrolledCount} / {cls.capacity}</strong> bé</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => openEditClass(cls)}
                          className="flex items-center gap-1 text-slate-600 hover:text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-50"
                        >
                          <Edit className="w-3.5 h-3.5" /> Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteClass(cls.id, cls.name)}
                          className="flex items-center gap-1 text-rose-600 hover:text-rose-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. MENU TAB */}
            {activeTab === 'menu' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Quản Lý Thực Đơn Dinh Dưỡng Tuần</h3>
                    <p className="text-xs text-slate-500">Cập nhật món ăn từng bữa trong ngày (Sáng, trưa, xế, chiều, calo)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {data.menu.map((item) => (
                    <div key={item.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-slate-900">{item.dayOfWeek}</span>
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                            {item.calories}
                          </span>
                        </div>
                        <button
                          onClick={() => openEditMenu(item)}
                          className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100"
                        >
                          <Edit className="w-3.5 h-3.5" /> Chỉnh sửa món
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <span className="font-bold text-slate-500 block mb-0.5">Bữa Sáng:</span>
                          <span className="text-slate-800">{item.breakfast}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <span className="font-bold text-slate-500 block mb-0.5">Phụ Sáng:</span>
                          <span className="text-slate-800">{item.morningSnack}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <span className="font-bold text-slate-500 block mb-0.5">Bữa Trưa:</span>
                          <span className="text-slate-800">{item.lunch}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <span className="font-bold text-slate-500 block mb-0.5">Bữa Xế:</span>
                          <span className="text-slate-800">{item.afternoonSnack}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl sm:col-span-2">
                          <span className="font-bold text-slate-500 block mb-0.5">Bữa Chiều / Sữa:</span>
                          <span className="text-slate-800">{item.eveningMeal}</span>
                        </div>
                      </div>

                      {item.allergensNote && (
                        <p className="text-[11px] text-amber-700 mt-2 bg-amber-50/50 p-2 rounded-lg">
                          Lưu ý: {item.allergensNote}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. TEACHERS TAB */}
            {activeTab === 'teachers' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Quản Lý Đội Ngũ Giáo Viên</h3>
                    <p className="text-xs text-slate-500">Thêm, sửa hoặc xóa hồ sơ các cô giáo, bằng cấp sư phạm và chứng chỉ STEAM</p>
                  </div>
                  <button
                    onClick={openAddTeacher}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm giáo viên</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.teachers.map((t) => (
                    <div key={t.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                      <img src={t.avatarUrl} alt={t.name} className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 truncate">{t.name}</h4>
                            <p className="text-xs font-semibold text-emerald-700">{t.role}</p>
                          </div>
                          <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                            {t.experienceYears} năm KN
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 mt-1 truncate">{t.qualification}</p>
                        <p className="text-xs text-amber-700 font-medium truncate mt-0.5">{t.steamCert}</p>

                        <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => openEditTeacher(t)}
                            className="text-xs text-slate-600 hover:text-emerald-700 font-semibold px-2 py-1"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteTeacher(t.id, t.name)}
                            className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. NEWS TAB */}
            {activeTab === 'news' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Quản Lý Tin Tức & Hoạt Động</h3>
                    <p className="text-xs text-slate-500">Đăng thông báo tuyển sinh, ngày hội STEAM, bài viết dinh dưỡng</p>
                  </div>
                  <button
                    onClick={openAddNews}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Viết bài mới</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.news.map((item) => (
                    <div key={item.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                      <img src={item.coverImage} alt={item.title} className="w-full sm:w-36 h-28 rounded-2xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                          <span className="text-[11px] text-slate-400">{formatDateVN(item.date)}</span>
                          <span className="text-[11px] text-slate-400">· {item.author}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1">{item.summary}</p>

                        <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => openEditNews(item)}
                            className="text-xs text-slate-600 hover:text-emerald-700 font-semibold px-2 py-1"
                          >
                            Sửa bài
                          </button>
                          <button
                            onClick={() => handleDeleteNews(item.id, item.title)}
                            className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1"
                          >
                            Xóa bài
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Quản Lý Thư Viện Hình Ảnh</h3>
                    <p className="text-xs text-slate-500">Cập nhật hình ảnh hoạt động học tập, dã ngoại và khuôn viên trường</p>
                  </div>
                  <button
                    onClick={openAddGallery}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm ảnh mới</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {data.gallery.map((g) => (
                    <div key={g.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div className="relative h-36 bg-slate-100">
                        <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-white/90 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {g.category}
                        </span>
                      </div>
                      <div className="p-3">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{g.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{formatDateVN(g.date)}</p>
                        <div className="flex justify-end gap-1 mt-2 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => handleDeleteGallery(g.id, g.title)}
                            className="text-[11px] text-rose-600 font-semibold hover:underline"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. INQUIRIES TAB (Admissions) */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Hồ Sơ Đăng Ký Tuyển Sinh & Tham Quan</h3>
                    <p className="text-xs text-slate-500">Quản lý tiếp nhận thông tin phụ huynh và cập nhật tiến độ tư vấn</p>
                  </div>

                  {/* Filter by status */}
                  <div className="flex items-center gap-2">
                    <select
                      value={inquiryFilterStatus}
                      onChange={(e) => setInquiryFilterStatus(e.target.value as any)}
                      className="text-xs px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="all">Tất cả trạng thái</option>
                      <option value="new">Chờ liên hệ</option>
                      <option value="contacted">Đã tư vấn</option>
                      <option value="visited">Đã tham quan</option>
                      <option value="enrolled">Đã nhập học</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Tìm theo tên phụ huynh, số điện thoại, tên bé hoặc lớp..."
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-3">
                  {filteredInquiries.map((inq) => (
                    <div key={inq.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{inq.parentName}</h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                inq.status === 'new'
                                  ? 'bg-amber-100 text-amber-800'
                                  : inq.status === 'contacted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : inq.status === 'visited'
                                  ? 'bg-purple-100 text-purple-800'
                                  : inq.status === 'enrolled'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {inq.status === 'new' && 'Chờ liên hệ'}
                              {inq.status === 'contacted' && 'Đã tư vấn'}
                              {inq.status === 'visited' && 'Đã tham quan'}
                              {inq.status === 'enrolled' && 'Đã nhập học'}
                              {inq.status === 'cancelled' && 'Đã hủy'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Bé: <strong>{inq.childName}</strong> ({inq.childAgeOrDob}) · Lớp quan tâm:{' '}
                            <strong className="text-emerald-700">{inq.targetClass}</strong>
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50"
                          >
                            <option value="new">Chờ liên hệ</option>
                            <option value="contacted">Đã tư vấn</option>
                            <option value="visited">Đã tham quan</option>
                            <option value="enrolled">Đã nhập học</option>
                            <option value="cancelled">Đã hủy</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 mb-3">
                        <div>
                          <span className="text-slate-400 block text-[11px]">Điện thoại:</span>
                          <a href={`tel:${inq.phone}`} className="font-bold text-emerald-700 hover:underline">
                            {inq.phone}
                          </a>
                        </div>
                        {inq.email && (
                          <div>
                            <span className="text-slate-400 block text-[11px]">Email:</span>
                            <span>{inq.email}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-slate-400 block text-[11px]">Ngày hẹn dự kiến:</span>
                          <span className="font-medium text-slate-800">{formatDateVN(inq.preferredVisitDate)}</span>
                        </div>
                      </div>

                      {inq.notes && (
                        <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-700 mb-3">
                          <strong className="text-slate-500">Ghi chú phụ huynh:</strong> {inq.notes}
                        </div>
                      )}

                      {inq.staffNotes && (
                        <div className="bg-emerald-50/70 p-2.5 rounded-xl text-xs text-emerald-900 mb-3 border border-emerald-100">
                          <strong className="text-emerald-700">Nhân viên ghi chú:</strong> {inq.staffNotes}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span className="text-slate-400 text-[11px]">Ngày gửi: {formatDateVN(inq.createdAt)}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedInquiryForNotes(inq);
                              setStaffNoteInput(inq.staffNotes || '');
                            }}
                            className="text-emerald-700 font-bold hover:underline"
                          >
                            Cập nhật ghi chú
                          </button>
                          <span className="text-slate-300">|</span>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id, inq.parentName)}
                            className="text-rose-600 font-semibold hover:underline"
                          >
                            Xóa hồ sơ
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. FACILITIES TAB */}
            {activeTab === 'facilities' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Quản Lý Cơ Sở Vật Chất</h3>
                  <p className="text-xs text-slate-500">Không gian lớp học STEAM, sân chơi tự nhiên, bếp một chiều và camera 24/7</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.facilities.map((fac) => (
                    <div key={fac.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
                      <img src={fac.imageUrl} alt={fac.title} className="w-full h-36 rounded-2xl object-cover mb-3" />
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {fac.highlight}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1 mb-1">{fac.title}</h4>
                      <p className="text-xs text-slate-600">{fac.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Quản Lý Đánh Giá & Cảm Nhận Phụ Huynh</h3>
                  <p className="text-xs text-slate-500">Duyệt hiển thị hoặc ẩn các phản hồi từ phụ huynh trên website</p>
                </div>

                <div className="space-y-3">
                  {data.testimonials.map((t) => (
                    <div key={t.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-slate-900">{t.parentName}</h4>
                          <span className="text-xs text-slate-500">({t.childName} · {t.childClass})</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              t.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {t.isApproved ? 'Đã duyệt hiển thị' : 'Chờ duyệt'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 italic">"{t.quote}"</p>
                        <p className="text-[11px] text-slate-400 mt-1">Đánh giá {t.rating} sao · {formatDateVN(t.date)}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleTestimonialApproved(t)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                            t.isApproved
                              ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {t.isApproved ? 'Ẩn khỏi web' : 'Duyệt lên web'}
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id, t.parentName)}
                          className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1.5"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. BACKUP & RESTORE TAB */}
            {activeTab === 'backup' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Sao Lưu & Khôi Phục Dữ Liệu</h3>
                  <p className="text-xs text-slate-500">Đảm bảo an toàn dữ liệu trường, tải về file JSON hoặc khôi phục dữ liệu mẫu ban đầu</p>
                </div>

                {/* 1. Download Backup */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Tải File Sao Lưu Dự Phòng (.JSON)</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Xuất toàn bộ thông tin trường, khối lớp, thực đơn, giáo viên và danh sách đăng ký.</p>
                  </div>
                  <button
                    onClick={handleDownloadBackup}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shrink-0 cursor-pointer"
                  >
                    Tải file JSON ngay
                  </button>
                </div>

                {/* 2. Restore from JSON */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">Nhập Dữ Liệu Từ File JSON</h4>
                  <p className="text-xs text-slate-600">Dán nội dung JSON đã sao lưu vào ô bên dưới:</p>
                  <textarea
                    rows={4}
                    value={restoreJsonText}
                    onChange={(e) => setRestoreJsonText(e.target.value)}
                    placeholder='Dán đoạn mã JSON sao lưu vào đây...'
                    className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-emerald-500"
                  />
                  {restoreError && (
                    <p className="text-xs text-rose-500 font-semibold">{restoreError}</p>
                  )}
                  <button
                    onClick={handleImportBackup}
                    disabled={!restoreJsonText.trim()}
                    className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Khôi phục từ JSON
                  </button>
                </div>

                {/* 3. Reset to Factory Defaults */}
                <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-rose-900">Đặt Lại Dữ Liệu Mẫu Chuẩn Ban Đầu</h4>
                    <p className="text-xs text-rose-700 mt-0.5">Khôi phục đầy đủ dữ liệu chuẩn của Trường Mầm non BiBi Thiên Nga Steam Preschool (Cẩm Lệ, Đà Nẵng).</p>
                  </div>
                  <button
                    onClick={handleResetDefaults}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shrink-0 cursor-pointer"
                  >
                    Đặt lại dữ liệu gốc
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL 1: ADD/EDIT CLASS */}
      {classModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-emerald-100 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {editingClass ? 'Chỉnh Sửa Khối Lớp' : 'Thêm Khối Lớp Mới'}
            </h3>

            <form onSubmit={handleSaveClass} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên khối lớp *</label>
                <input
                  type="text"
                  required
                  value={classForm.name}
                  onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                  placeholder="VD: Lớp Mầm STEAM (Creative Makers)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Độ tuổi</label>
                  <input
                    type="text"
                    value={classForm.ageGroup}
                    onChange={(e) => setClassForm({ ...classForm, ageGroup: e.target.value })}
                    placeholder="VD: 3 - 4 tuổi"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Học phí (VNĐ/tháng)</label>
                  <input
                    type="number"
                    value={classForm.feePerMonth}
                    onChange={(e) => setClassForm({ ...classForm, feePerMonth: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sĩ số tối đa</label>
                  <input
                    type="number"
                    value={classForm.capacity}
                    onChange={(e) => setClassForm({ ...classForm, capacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số bé đã nhận</label>
                  <input
                    type="number"
                    value={classForm.enrolledCount}
                    onChange={(e) => setClassForm({ ...classForm, enrolledCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Trọng tâm giáo dục STEAM</label>
                <input
                  type="text"
                  value={classForm.steamFocus}
                  onChange={(e) => setClassForm({ ...classForm, steamFocus: e.target.value })}
                  placeholder="VD: Khoa học vui & Nghệ thuật tạo hình"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Giáo viên phụ trách</label>
                <input
                  type="text"
                  value={classForm.teacherLead}
                  onChange={(e) => setClassForm({ ...classForm, teacherLead: e.target.value })}
                  placeholder="VD: Cô Nguyễn Thị Mai Trang"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <ImageUploadWidget
                  label="Hình ảnh đại diện khối lớp"
                  value={classForm.imageUrl}
                  onChange={(url) => setClassForm({ ...classForm, imageUrl: url })}
                  folder="classes"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mô tả chi tiết</label>
                <textarea
                  rows={2}
                  value={classForm.description}
                  onChange={(e) => setClassForm({ ...classForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setClassModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                >
                  Lưu khối lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT MENU */}
      {menuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-emerald-100 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Chỉnh Sửa Thực Đơn {menuForm.dayOfWeek}
            </h3>

            <form onSubmit={handleSaveMenu} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Bữa Sáng</label>
                <input
                  type="text"
                  value={menuForm.breakfast}
                  onChange={(e) => setMenuForm({ ...menuForm, breakfast: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phụ Sáng (Nước ép / Sữa hạt)</label>
                <input
                  type="text"
                  value={menuForm.morningSnack}
                  onChange={(e) => setMenuForm({ ...menuForm, morningSnack: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bữa Trưa Chính</label>
                <textarea
                  rows={2}
                  value={menuForm.lunch}
                  onChange={(e) => setMenuForm({ ...menuForm, lunch: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bữa Xế Chiều</label>
                <input
                  type="text"
                  value={menuForm.afternoonSnack}
                  onChange={(e) => setMenuForm({ ...menuForm, afternoonSnack: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Chiều Muộn / Sữa</label>
                <input
                  type="text"
                  value={menuForm.eveningMeal}
                  onChange={(e) => setMenuForm({ ...menuForm, eveningMeal: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mức Năng Lượng (Calo)</label>
                  <input
                    type="text"
                    value={menuForm.calories}
                    onChange={(e) => setMenuForm({ ...menuForm, calories: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lưu ý Dị Ứng</label>
                  <input
                    type="text"
                    value={menuForm.allergensNote}
                    onChange={(e) => setMenuForm({ ...menuForm, allergensNote: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setMenuModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                >
                  Lưu thực đơn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD/EDIT TEACHER */}
      {teacherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-emerald-100 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {editingTeacher ? 'Chỉnh Sửa Giáo Viên' : 'Thêm Giáo Viên Mới'}
            </h3>

            <form onSubmit={handleSaveTeacher} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Họ tên giáo viên *</label>
                <input
                  type="text"
                  required
                  value={teacherForm.name}
                  onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chức vụ / Vị trí</label>
                  <input
                    type="text"
                    value={teacherForm.role}
                    onChange={(e) => setTeacherForm({ ...teacherForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số năm kinh nghiệm</label>
                  <input
                    type="number"
                    value={teacherForm.experienceYears}
                    onChange={(e) => setTeacherForm({ ...teacherForm, experienceYears: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bằng cấp sư phạm</label>
                <input
                  type="text"
                  value={teacherForm.qualification}
                  onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Chứng chỉ STEAM / Chuyên môn</label>
                <input
                  type="text"
                  value={teacherForm.steamCert}
                  onChange={(e) => setTeacherForm({ ...teacherForm, steamCert: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lớp phụ trách</label>
                <input
                  type="text"
                  value={teacherForm.assignedClass}
                  onChange={(e) => setTeacherForm({ ...teacherForm, assignedClass: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <ImageUploadWidget
                  label="Ảnh chân dung giáo viên"
                  value={teacherForm.avatarUrl}
                  onChange={(url) => setTeacherForm({ ...teacherForm, avatarUrl: url })}
                  folder="teachers"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Châm ngôn / Lời giới thiệu</label>
                <textarea
                  rows={2}
                  value={teacherForm.bio}
                  onChange={(e) => setTeacherForm({ ...teacherForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setTeacherModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                >
                  Lưu giáo viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD/EDIT NEWS */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-emerald-100 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {editingNews ? 'Chỉnh Sửa Bài Viết' : 'Viết Bài Viết Mới'}
            </h3>

            <form onSubmit={handleSaveNews} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tiêu đề bài viết *</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chuyên mục</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as NewsCategory })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="STEAM & Trải nghiệm">STEAM & Trải nghiệm</option>
                    <option value="Sự kiện">Sự kiện</option>
                    <option value="Thông báo">Thông báo</option>
                    <option value="Dinh dưỡng & Sức khỏe">Dinh dưỡng & Sức khỏe</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tác giả</label>
                  <input
                    type="text"
                    value={newsForm.author}
                    onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <ImageUploadWidget
                  label="Ảnh bìa bài viết"
                  value={newsForm.coverImage}
                  onChange={(url) => setNewsForm({ ...newsForm, coverImage: url })}
                  folder="news"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tóm tắt bài viết (1-2 câu)</label>
                <textarea
                  rows={2}
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nội dung chi tiết</label>
                <textarea
                  rows={5}
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                >
                  Lưu bài viết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD/EDIT GALLERY */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-100 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Thêm Ảnh Mới Vào Thư Viện
            </h3>

            <form onSubmit={handleSaveGallery} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tiêu đề ảnh *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="VD: Giờ học thí nghiệm STEAM"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Chủ đề album</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as GalleryCategory })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="Hoạt động STEAM">Hoạt động STEAM</option>
                  <option value="Lớp học vui vẻ">Lớp học vui vẻ</option>
                  <option value="Dã ngoại khám phá">Dã ngoại khám phá</option>
                  <option value="Lễ hội & Sự kiện">Lễ hội & Sự kiện</option>
                  <option value="Cơ sở vật chất">Cơ sở vật chất</option>
                </select>
              </div>

              <div>
                <ImageUploadWidget
                  label="Tải ảnh lên R2 / Liên kết ảnh"
                  value={galleryForm.imageUrl}
                  onChange={(url) => setGalleryForm({ ...galleryForm, imageUrl: url })}
                  folder="gallery"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mô tả ngắn</label>
                <input
                  type="text"
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  placeholder="Các bé hào hứng lắp ráp..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                >
                  Lưu ảnh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: STAFF NOTES FOR INQUIRY */}
      {selectedInquiryForNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-100 relative">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Ghi Chú Ban Tuyển Sinh
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Phụ huynh: <strong>{selectedInquiryForNotes.parentName}</strong> ({selectedInquiryForNotes.phone})
            </p>

            <form onSubmit={handleSaveStaffNotes} className="space-y-4">
              <textarea
                rows={4}
                value={staffNoteInput}
                onChange={(e) => setStaffNoteInput(e.target.value)}
                placeholder="Nhập tiến độ gọi điện tư vấn, hẹn ngày phụ huynh dắt bé đến trường..."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiryForNotes(null)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 font-semibold text-xs text-slate-600 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
                >
                  Lưu ghi chú
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
