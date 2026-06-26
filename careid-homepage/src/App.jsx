import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Import các trang chính
import Hero from './components/Hero';
import SearchBox from './components/SearchBox';
import Features from './components/Features';
import Brands from './components/Brands';
import Review from './components/Review';
import ActivateWarranty from './pages/WarrantyActivate';
import CheckWarranty from './pages/CheckWarranty';
import CreateWarrantyRequest from './pages/CreateWarrantyRequest';

// Tạo component Trang chủ tổng hợp để quản lý gọn hơn
function HomePage() {
  return (
    <>
      <Hero />
      <SearchBox />
      <Features />
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <Brands />
        </div>
        <div className="lg:col-span-4">
          <Review />
        </div>
      </section>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans text-gray-800 bg-[#f4f7fc] flex flex-col justify-between">
        
        {/* Header cố định ở trên cùng ở tất cả các trang */}
        <Header />

        {/* Khu vực nội dung thay đổi linh hoạt theo URL đường dẫn */}
        <main className="flex-grow">
          <Routes>
            {/* Đường dẫn trang chủ */}
            <Route path="/" element={<HomePage />} />
            
            {/* Đường dẫn trang kích hoạt bảo hành */}
            <Route path="/kich-hoat-bao-hanh" element={<ActivateWarranty />} />

            {/* Đường dẫn check bảo hành */}
            <Route path="/tra-cuu-bao-hanh" element={<CheckWarranty />} />

            {/* Đường dẫn check bảo hành */}
            <Route path="/yeu-cau-bao-hanh-sua-chua" element={<CreateWarrantyRequest />} />
          </Routes>
        </main>

        {/* Footer cố định ở cuối cùng ở tất cả các trang */}
        <Footer />
        
      </div>
    </Router>
  );
}