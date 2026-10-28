export interface SchoolInfo {
  name: string;
  slogan: string;
  shortIntro: string;
  fullIntro: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  hotline: string;
  email: string;
  ageRange: string;
  scheduleHours: string;
  scheduleDays: string;
  closedDays: string;
  emergencyNotice: string;
  isEmergencyNoticeActive: boolean;
  facebookUrl: string;
  zaloUrl: string;
  youtubeUrl: string;
}

export interface KindergartenClass {
  id: string;
  name: string;
  ageGroup: string;
  capacity: number;
  enrolledCount: number;
  feePerMonth: number;
  steamFocus: string;
  description: string;
  features: string[];
  imageUrl: string;
  teacherLead: string;
}

export interface MenuItem {
  id: string;
  dayOfWeek: string; // 'Thứ Hai' | 'Thứ Ba' | 'Thứ Tư' | 'Thứ Năm' | 'Thứ Sáu' | 'Thứ Bảy'
  breakfast: string;
  morningSnack: string;
  lunch: string;
  afternoonSnack: string;
  eveningMeal: string;
  calories: string;
  allergensNote?: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experienceYears: number;
  bio: string;
  avatarUrl: string;
  steamCert: string;
  assignedClass: string;
}

export type NewsCategory = 'Sự kiện' | 'STEAM & Trải nghiệm' | 'Thông báo' | 'Dinh dưỡng & Sức khỏe';

export interface NewsArticle {
  id: string;
  title: string;
  category: NewsCategory;
  summary: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  isPublished: boolean;
  featured?: boolean;
}

export type GalleryCategory = 'Hoạt động STEAM' | 'Lớp học vui vẻ' | 'Dã ngoại khám phá' | 'Lễ hội & Sự kiện' | 'Cơ sở vật chất';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  date: string;
  description?: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'visited' | 'enrolled' | 'cancelled';

export interface AdmissionInquiry {
  id: string;
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  childAgeOrDob: string;
  targetClass: string;
  preferredVisitDate: string;
  notes: string;
  status: InquiryStatus;
  createdAt: string;
  staffNotes?: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
  highlight: string;
}

export interface Testimonial {
  id: string;
  parentName: string;
  childName: string;
  childClass: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  date: string;
  isApproved: boolean;
}

export interface KindergartenState {
  schoolInfo: SchoolInfo;
  classes: KindergartenClass[];
  menu: MenuItem[];
  teachers: Teacher[];
  news: NewsArticle[];
  gallery: GalleryItem[];
  inquiries: AdmissionInquiry[];
  facilities: Facility[];
  testimonials: Testimonial[];
}
