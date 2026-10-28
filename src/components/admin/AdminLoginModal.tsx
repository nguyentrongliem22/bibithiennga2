import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, Sparkles, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin.trim() === '1234' || pin.trim().toLowerCase() === 'admin' || pin.trim() === 'admin123') {
      onLoginSuccess();
      setError('');
    } else {
      setError('Mã PIN không chính xác. Hãy nhập "1234" hoặc bấm nút Đăng nhập nhanh.');
    }
  };

  const handleQuickLogin = () => {
    onLoginSuccess();
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-emerald-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Khu Vực Quản Trị Viên</h3>
          <p className="text-xs text-slate-500 mt-1">
            Hệ thống quản lý toàn diện Trường Mầm non BiBi Thiên Nga
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mã PIN hoặc Mật khẩu Quản trị
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                placeholder="Nhập mã PIN (Mặc định: 1234)"
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 font-mono"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-[11px] text-rose-500 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
              </p>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Đăng nhập Quản trị
            </button>

            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-emerald-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Đăng nhập nhanh 1 chạm (Xem demo)</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center pt-2">
            * Mật khẩu quản trị mặc định: <span className="font-mono font-bold text-slate-600">1234</span>
          </p>
        </form>
      </div>
    </div>
  );
};
