import React, { useState } from 'react';
import { Headphones, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  // State quản lý trạng thái đóng/mở menu ẩn trên Tablet và Mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex flex-col shrink-0">
          <span className="text-2xl font-bold text-[#0f2c59] tracking-tight">
            Care<span className="text-[#f16522]">ID</span>
          </span>
          <span className="text-[10px] text-gray-500 -mt-1 font-medium">Hộ chiếu điện tử của thiết bị</span>
        </div>

        {/* Menu cho Desktop (Ẩn trên Tablet < 1024px và Mobile) */}
        <nav className="hidden lg:flex space-x-6 text-sm font-medium text-gray-600">
          <Link 
            to="/" 
            className={`pb-1 transition ${location.pathname === '/' ? 'text-[#f16522] border-b-2 border-[#f16522]' : 'hover:text-[#0f2c59]'}`}
          >
            Trang chủ
          </Link>
          <Link 
            to="/kich-hoat-bao-hanh" 
            className={`pb-1 transition ${location.pathname === '/kich-hoat-bao-hanh' ? 'text-[#f16522] border-b-2 border-[#f16522]' : 'hover:text-[#0f2c59]'}`}
          >
            Kích hoạt bảo hành
          </Link>
          <Link 
            to="/tra-cuu-bao-hanh" 
            className={`pb-1 transition ${location.pathname === '/tra-cuu-bao-hanh' ? 'text-[#f16522] border-b-2 border-[#f16522]' : 'hover:text-[#0f2c59]'}`}
          >
            Tra cứu CareID
          </Link>
          <Link 
            to="/yeu-cau-bao-hanh-sua-chua" 
            className={`pb-1 transition ${location.pathname === '/yeu-cau-bao-hanh-sua-chua' ? 'text-[#f16522] border-b-2 border-[#f16522]' : 'hover:text-[#0f2c59]'}`}
          >
            Dịch vụ sửa chữa
          </Link>
          <a href="#" className="hover:text-[#0f2c59] transition">Đối tác</a>
          <a href="#" className="hover:text-[#0f2c59] transition">Đánh giá</a>
          <a href="#" className="hover:text-[#0f2c59] transition">Liên hệ</a>
        </nav>

        {/* Góc phải: Support Hot & Nút Hamburger */}
        <div className="flex items-center space-x-3">
          
          {/* Khối Support Hot */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full text-[#0f2c59] shrink-0">
              <Headphones size={22} />
            </div>
            <div className="hidden sm:block text-left">
              <p className="font-bold text-[#0f2c59] text-sm leading-tight">Hỗ trợ nhanh</p>
              <p className="text-gray-400 text-xs">Chat Zalo / Messenger</p>
            </div>
          </div>

          {/* NÚT TOGGLE MENU (Chỉ hiện trên Tablet & Mobile) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden rounded-xl bg-gray-50 text-[#0f2c59] hover:bg-gray-100 transition focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* ================= INLINE DI ĐỘNG: MENU ẨN THẢ XUỐNG ================= */}
      {/* Hiện khi click Hamburger trên Tablet & Mobile, tự ẩn trên Desktop (lg) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-inner px-4 py-4 space-y-1 text-sm font-semibold text-gray-600 animate-slideDown">
          <Link 
            to="/" 
            onClick={() => setIsMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl transition ${location.pathname === '/' ? 'bg-orange-50 text-[#f16522]' : 'hover:bg-slate-50 text-gray-700'}`}
          >
            Trang chủ
          </Link>
          <Link 
            to="/kich-hoat-bao-hanh" 
            onClick={() => setIsMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl transition ${location.pathname === '/kich-hoat-bao-hanh' ? 'bg-orange-50 text-[#f16522]' : 'hover:bg-slate-50 text-gray-700'}`}
          >
            Kích hoạt bảo hành
          </Link>
          <Link 
            to="/tra-cuu-bao-hanh" 
            onClick={() => setIsMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl transition ${location.pathname === '/tra-cuu-bao-hanh' ? 'bg-orange-50 text-[#f16522]' : 'hover:bg-slate-50 text-gray-700'}`}
          >
            Tra cứu CareID
          </Link>
          <Link 
            to="/yeu-cau-bao-hanh-sua-chua" 
            onClick={() => setIsMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl transition ${location.pathname === '/yeu-cau-bao-hanh-sua-chua' ? 'bg-orange-50 text-[#f16522]' : 'hover:bg-slate-50 text-gray-700'}`}
          >
            Dịch vụ sửa chữa
          </Link>
          
          {/* Các mục liên kết neo */}
          <div className="border-t border-gray-100 my-2 pt-2 space-y-1">
            <a href="#" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-gray-500 hover:bg-slate-50 font-medium">Đối tác</a>
            <a href="#" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-gray-500 hover:bg-slate-50 font-medium">Đánh giá</a>
            <a href="#" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-gray-500 hover:bg-slate-50 font-medium">Liên hệ</a>
          </div>
        </div>
      )}
    </header>
  );
}