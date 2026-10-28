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
} from '../types';
import { INITIAL_KINDERGARTEN_DATA } from './initialData';

const STORAGE_KEY = 'bibi_thien_nga_preschool_db_v1';

/**
 * Safe localStorage reader with initial data fallback
 */
export function getStoredData(): KindergartenState {
  if (typeof window === 'undefined' || !window.localStorage) {
    return structuredClone(INITIAL_KINDERGARTEN_DATA);
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_KINDERGARTEN_DATA));
      return structuredClone(INITIAL_KINDERGARTEN_DATA);
    }
    const parsed = JSON.parse(raw) as Partial<KindergartenState>;
    // Merge defensively in case new keys were added
    return {
      schoolInfo: parsed.schoolInfo || INITIAL_KINDERGARTEN_DATA.schoolInfo,
      classes: parsed.classes || INITIAL_KINDERGARTEN_DATA.classes,
      menu: parsed.menu || INITIAL_KINDERGARTEN_DATA.menu,
      teachers: parsed.teachers || INITIAL_KINDERGARTEN_DATA.teachers,
      news: parsed.news || INITIAL_KINDERGARTEN_DATA.news,
      gallery: parsed.gallery || INITIAL_KINDERGARTEN_DATA.gallery,
      inquiries: parsed.inquiries || INITIAL_KINDERGARTEN_DATA.inquiries,
      facilities: parsed.facilities || INITIAL_KINDERGARTEN_DATA.facilities,
      testimonials: parsed.testimonials || INITIAL_KINDERGARTEN_DATA.testimonials,
    };
  } catch (error) {
    console.error('Failed to parse stored kindergarten data', error);
    return structuredClone(INITIAL_KINDERGARTEN_DATA);
  }
}

/**
 * Save entire state to storage
 */
export function saveStoredData(state: KindergartenState): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // Dispatch custom event for real-time reactive sync across components
      window.dispatchEvent(new CustomEvent('kindergarten_data_updated', { detail: state }));
    } catch (e) {
      console.error('Failed to write to localStorage', e);
    }
  }
}

/**
 * Reset data back to initial defaults
 */
export function resetToFactoryDefaults(): KindergartenState {
  const fresh = structuredClone(INITIAL_KINDERGARTEN_DATA);
  saveStoredData(fresh);
  return fresh;
}

/**
 * Pure Validation Utilities
 */
export function validatePhoneNumber(phone: string): boolean {
  if (!phone) return false;
  // Vietnamese phone numbers: starts with 0 and has 10 digits
  const cleaned = phone.trim().replace(/[\s.-]/g, '');
  return /^0[1-9][0-9]{8}$/.test(cleaned);
}

export function validateEmail(email: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

export function formatDateVN(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/* ============================================================
   CRUD OPERATIONS (Pure state transformers)
   ============================================================ */

// 1. School Info
export function updateSchoolInfo(
  current: KindergartenState,
  info: Partial<SchoolInfo>
): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    schoolInfo: {
      ...current.schoolInfo,
      ...info,
    },
  };
  saveStoredData(updated);
  return updated;
}

// 2. Classes
export function addClass(
  current: KindergartenState,
  newClass: Omit<KindergartenClass, 'id'>
): KindergartenState {
  const id = `class-${Date.now()}`;
  const created: KindergartenClass = { ...newClass, id };
  const updated: KindergartenState = {
    ...current,
    classes: [...current.classes, created],
  };
  saveStoredData(updated);
  return updated;
}

export function updateClass(
  current: KindergartenState,
  id: string,
  updates: Partial<KindergartenClass>
): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    classes: current.classes.map((cls) => (cls.id === id ? { ...cls, ...updates } : cls)),
  };
  saveStoredData(updated);
  return updated;
}

export function deleteClass(current: KindergartenState, id: string): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    classes: current.classes.filter((cls) => cls.id !== id),
  };
  saveStoredData(updated);
  return updated;
}

// 3. Menu
export function updateMenuItem(
  current: KindergartenState,
  id: string,
  updates: Partial<MenuItem>
): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    menu: current.menu.map((item) => (item.id === id ? { ...item, ...updates } : item)),
  };
  saveStoredData(updated);
  return updated;
}

export function addMenuItem(
  current: KindergartenState,
  newItem: Omit<MenuItem, 'id'>
): KindergartenState {
  const id = `menu-${Date.now()}`;
  const updated: KindergartenState = {
    ...current,
    menu: [...current.menu, { ...newItem, id }],
  };
  saveStoredData(updated);
  return updated;
}

export function deleteMenuItem(current: KindergartenState, id: string): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    menu: current.menu.filter((m) => m.id !== id),
  };
  saveStoredData(updated);
  return updated;
}

// 4. Teachers
export function addTeacher(
  current: KindergartenState,
  teacher: Omit<Teacher, 'id'>
): KindergartenState {
  const id = `teacher-${Date.now()}`;
  const updated: KindergartenState = {
    ...current,
    teachers: [...current.teachers, { ...teacher, id }],
  };
  saveStoredData(updated);
  return updated;
}

export function updateTeacher(
  current: KindergartenState,
  id: string,
  updates: Partial<Teacher>
): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    teachers: current.teachers.map((t) => (t.id === id ? { ...t, ...updates } : t)),
  };
  saveStoredData(updated);
  return updated;
}

export function deleteTeacher(current: KindergartenState, id: string): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    teachers: current.teachers.filter((t) => t.id !== id),
  };
  saveStoredData(updated);
  return updated;
}

// 5. News & Activities
export function addNews(
  current: KindergartenState,
  article: Omit<NewsArticle, 'id'>
): KindergartenState {
  const id = `news-${Date.now()}`;
  const updated: KindergartenState = {
    ...current,
    news: [{ ...article, id }, ...current.news],
  };
  saveStoredData(updated);
  return updated;
}

export function updateNews(
  current: KindergartenState,
  id: string,
  updates: Partial<NewsArticle>
): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    news: current.news.map((n) => (n.id === id ? { ...n, ...updates } : n)),
  };
  saveStoredData(updated);
  return updated;
}

export function deleteNews(current: KindergartenState, id: string): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    news: current.news.filter((n) => n.id !== id),
  };
  saveStoredData(updated);
  return updated;
}

// 6. Gallery
export function addGalleryItem(
  current: KindergartenState,
  item: Omit<GalleryItem, 'id'>
): KindergartenState {
  const id = `gal-${Date.now()}`;
  const updated: KindergartenState = {
    ...current,
    gallery: [{ ...item, id }, ...current.gallery],
  };
  saveStoredData(updated);
  return updated;
}

export function updateGalleryItem(
  current: KindergartenState,
  id: string,
  updates: Partial<GalleryItem>
): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    gallery: current.gallery.map((g) => (g.id === id ? { ...g, ...updates } : g)),
  };
  saveStoredData(updated);
  return updated;
}

export function deleteGalleryItem(current: KindergartenState, id: string): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    gallery: current.gallery.filter((g) => g.id !== id),
  };
  saveStoredData(updated);
  return updated;
}

// 7. Admissions & Inquiries
export function addInquiry(
  current: KindergartenState,
  inquiry: Omit<AdmissionInquiry, 'id' | 'status' | 'createdAt'>
): { newState: KindergartenState; newInquiry: AdmissionInquiry } {
  const newInquiry: AdmissionInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  const newState: KindergartenState = {
    ...current,
    inquiries: [newInquiry, ...current.inquiries],
  };
  saveStoredData(newState);
  return { newState, newInquiry };
}

export function updateInquiryStatus(
  current: KindergartenState,
  id: string,
  status: InquiryStatus,
  staffNotes?: string
): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    inquiries: current.inquiries.map((inq) => {
      if (inq.id === id) {
        return {
          ...inq,
          status,
          ...(staffNotes !== undefined ? { staffNotes } : {}),
        };
      }
      return inq;
    }),
  };
  saveStoredData(updated);
  return updated;
}

export function deleteInquiry(current: KindergartenState, id: string): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    inquiries: current.inquiries.filter((inq) => inq.id !== id),
  };
  saveStoredData(updated);
  return updated;
}

// 8. Facilities
export function addFacility(
  current: KindergartenState,
  item: Omit<Facility, 'id'>
): KindergartenState {
  const id = `fac-${Date.now()}`;
  const updated: KindergartenState = {
    ...current,
    facilities: [...current.facilities, { ...item, id }],
  };
  saveStoredData(updated);
  return updated;
}

export function updateFacility(
  current: KindergartenState,
  id: string,
  updates: Partial<Facility>
): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    facilities: current.facilities.map((f) => (f.id === id ? { ...f, ...updates } : f)),
  };
  saveStoredData(updated);
  return updated;
}

export function deleteFacility(current: KindergartenState, id: string): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    facilities: current.facilities.filter((f) => f.id !== id),
  };
  saveStoredData(updated);
  return updated;
}

// 9. Testimonials
export function addTestimonial(
  current: KindergartenState,
  item: Omit<Testimonial, 'id'>
): KindergartenState {
  const id = `test-${Date.now()}`;
  const updated: KindergartenState = {
    ...current,
    testimonials: [{ ...item, id }, ...current.testimonials],
  };
  saveStoredData(updated);
  return updated;
}

export function updateTestimonial(
  current: KindergartenState,
  id: string,
  updates: Partial<Testimonial>
): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    testimonials: current.testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t)),
  };
  saveStoredData(updated);
  return updated;
}

export function deleteTestimonial(current: KindergartenState, id: string): KindergartenState {
  const updated: KindergartenState = {
    ...current,
    testimonials: current.testimonials.filter((t) => t.id !== id),
  };
  saveStoredData(updated);
  return updated;
}

/* ============================================================
   Pure Filter & Search Utilities
   ============================================================ */

export function filterInquiries(
  inquiries: AdmissionInquiry[],
  query: string,
  status: InquiryStatus | 'all'
): AdmissionInquiry[] {
  const q = query.trim().toLowerCase();
  return inquiries.filter((item) => {
    const matchesStatus = status === 'all' || item.status === status;
    if (!matchesStatus) return false;
    if (!q) return true;
    return (
      item.parentName.toLowerCase().includes(q) ||
      item.phone.includes(q) ||
      item.childName.toLowerCase().includes(q) ||
      item.targetClass.toLowerCase().includes(q)
    );
  });
}

export function filterNewsByCategory(
  news: NewsArticle[],
  category: NewsCategory | 'Tất cả'
): NewsArticle[] {
  if (category === 'Tất cả') return news;
  return news.filter((item) => item.category === category);
}

export function filterGalleryByCategory(
  gallery: GalleryItem[],
  category: GalleryCategory | 'Tất cả'
): GalleryItem[] {
  if (category === 'Tất cả') return gallery;
  return gallery.filter((item) => item.category === category);
}

/* ============================================================
   Backup & Restore (JSON)
   ============================================================ */

export function exportBackupJSON(state: KindergartenState): string {
  return JSON.stringify(state, null, 2);
}

export function validateAndImportBackupJSON(jsonStr: string): KindergartenState {
  const parsed = JSON.parse(jsonStr);
  if (!parsed.schoolInfo || !Array.isArray(parsed.classes) || !Array.isArray(parsed.menu)) {
    throw new Error('Dữ liệu sao lưu không đúng định dạng chuẩn của BiBi Thiên Nga.');
  }
  saveStoredData(parsed);
  return parsed;
}
