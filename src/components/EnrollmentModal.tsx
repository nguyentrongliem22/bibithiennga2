import React, { useState, useEffect } from 'react';
import { KindergartenClass, AdmissionInquiry } from '../types';
import { validatePhoneNumber, validateEmail } from '../utils/kindergartenStore';
import {
  X,
  CalendarCheck,
  CheckCircle2,
  Phone,
  User,
  Baby,
  Mail,
  Calendar,
  MessageSquare,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: KindergartenClass[];
  preferredClass?: string;
  onAddInquiry: (inquiry: Omit<AdmissionInquiry, 'id' | 'status' | 'createdAt'>) => void;
  hotline: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  classes,
  preferredClass,
  onAddInquiry,
  hotline,
}) => {
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [childAgeOrDob, setChildAgeOrDob] = useState('');
  const [targetClass, setTargetClass] = useState('');
  const [preferredVisitDate, setPreferredVisitDate] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (preferredClass) {
      setTargetClass(preferredClass);
    } else if (classes.length > 0 && !targetClass) {
      setTargetClass(classes[0].name);
    }
  }, [preferredClass, classes]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!parentName.trim()) {
      errs.parentName = 'Vui lòng nhập họ tên phụ huynh';
    }

    if (!phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại liên hệ';
    } else if (!validatePhoneNumber(phone)) {
      errs.phone = 'Số điện thoại không hợp lệ (gồm 10 số, bắt đầu bằng 0)';
    }

    if (email.trim() && !validateEmail(email)) {
      errs.email = 'Địa chỉ email không đúng định dạng';
    }

    if (!childName.trim()) {
      errs.childName = 'Vui lòng nhập họ tên hoặc tên gọi ở nhà của bé';
    }

    if (!childAgeOrDob.trim()) {
      errs.childAgeOrDob = 'Vui lòng nhập độ tuổi hoặc tháng tuổi của bé';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onAddInquiry({
      parentName: parentName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      childName: childName.trim(),
      childAgeOrDob: childAgeOrDob.trim(),
      targetClass: targetClass || classes[0]?.name || 'Lớp Nhà Trẻ',
      preferredVisitDate: preferredVisitDate || new Date().toISOString().split('T')[0],
      notes: notes.trim(),
    });

    setIsSuccess(true);
  };

  const resetForm = () => {
    setParentName('');
    setPhone('');
    setEmail('');
    setChildName('');
    setChildAgeOrDob('');
    setNotes('');
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-emerald-100 p-6 sm:p-8 relative">
        <button
          onClick={resetForm}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Đóng biểu mẫu"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Đăng Ký Tham Quan Thành Công!
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Cảm ơn Quý phụ huynh <strong>{parentName}</strong> đã tin tưởng BiBi Thiên Nga Steam Preschool. Bộ phận tuyển sinh sẽ liên hệ theo số điện thoại <strong>{phone}</strong> trong vòng 2-4 giờ làm việc.
            </p>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-xs text-emerald-800 space-y-1 text-left">
              <p>📍 <strong>Địa chỉ trường:</strong> 37 Phan Văn Trị, Phường Khuê Trung, Quận Cẩm Lệ, TP. Đà Nẵng</p>
              <p>📞 <strong>Hotline hỗ trợ nhanh:</strong> {hotline}</p>
              <p>👶 <strong>Bé đăng ký:</strong> {childName} ({childAgeOrDob})</p>
              <p>🏫 <strong>Khối lớp dự kiến:</strong> {targetClass}</p>
            </div>

            <button
              onClick={resetForm}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Hoàn tất & Đóng
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Tuyển sinh năm học mới</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Đăng Ký Nhập Học & Tham Quan
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Ba mẹ vui lòng để lại thông tin để cô giáo tư vấn lộ trình học phù hợp nhất cho bé.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Parent Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên Phụ huynh <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => {
                      setParentName(e.target.value);
                      if (errors.parentName) setErrors({ ...errors, parentName: '' });
                    }}
                    placeholder="VD: Nguyễn Thị Lan"
                    className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border ${
                      errors.parentName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    } focus:outline-hidden focus:border-emerald-500`}
                  />
                </div>
                {errors.parentName && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.parentName}
                  </p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số điện thoại liên hệ <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="VD: 0707609131"
                      className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border ${
                        errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                      } focus:outline-hidden focus:border-emerald-500`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email (nếu có)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="email@example.com"
                      className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border ${
                        errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                      } focus:outline-hidden focus:border-emerald-500`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Child name & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Họ tên hoặc tên gọi của bé <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Baby className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => {
                        setChildName(e.target.value);
                        if (errors.childName) setErrors({ ...errors, childName: '' });
                      }}
                      placeholder="VD: Bé Min / Trần Hoàng Nam"
                      className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border ${
                        errors.childName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                      } focus:outline-hidden focus:border-emerald-500`}
                    />
                  </div>
                  {errors.childName && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.childName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Độ tuổi / Tháng tuổi của bé <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={childAgeOrDob}
                    onChange={(e) => {
                      setChildAgeOrDob(e.target.value);
                      if (errors.childAgeOrDob) setErrors({ ...errors, childAgeOrDob: '' });
                    }}
                    placeholder="VD: 10 tháng / 3 tuổi"
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                      errors.childAgeOrDob ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    } focus:outline-hidden focus:border-emerald-500`}
                  />
                  {errors.childAgeOrDob && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.childAgeOrDob}
                    </p>
                  )}
                </div>
              </div>

              {/* Target Class & Preferred Visit Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Khối lớp quan tâm</label>
                  <select
                    value={targetClass}
                    onChange={(e) => setTargetClass(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 bg-white"
                  >
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.name}>
                        {cls.name} ({cls.ageGroup})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ngày mong muốn đến tham quan</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={preferredVisitDate}
                      onChange={(e) => setPreferredVisitDate(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ghi chú cho nhà trường (thói quen ăn uống, dị ứng, giờ đón...)
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Bé thích vận động ngoài trời, chưa quen xa mẹ..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Gửi thông tin đăng ký</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                * Nhà trường cam kết bảo mật 100% thông tin cá nhân của phụ huynh và bé.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
