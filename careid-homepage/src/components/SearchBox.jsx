import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBox() {
  return (
    <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
      <div className="bg-[#0f2c59] text-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Search input */}
        <div className="p-6 lg:p-8 lg:col-span-8 border-b lg:border-b-0 lg:border-r border-blue-900/50">
          <h3 className="font-bold text-lg">Tra cứu nhanh CareID</h3>
          <p className="text-xs text-blue-200 mt-1 mb-4">Nhập mã CareID để xem thông tin thiết bị của bạn</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Nhập mã CareID (Ví dụ: CID123456789)" 
                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>
            <button className="bg-[#f16522] hover:bg-opacity-90 px-6 py-3 rounded-lg font-bold text-sm flex items-center justify-center space-x-2 transition shrink-0">
              <Search size={16} />
              <span>TRA CỨU NGAY</span>
            </button>
          </div>
          <p className="text-[11px] text-blue-300 mt-2">Bạn có thể tìm thấy mã CareID trên tem, phiếu bảo hành hoặc hộp sản phẩm.</p>
        </div>

        {/* Right: Prompt */}
        <div className="p-6 lg:p-8 lg:col-span-4 flex flex-col justify-center bg-blue-950/40">
          <h4 className="font-bold text-sm">Chưa có mã CareID?</h4>
          <p className="text-xs text-blue-200 mt-1 mb-4 leading-relaxed">Kích hoạt bảo hành ngay để được bảo vệ toàn diện cho thiết bị của bạn.</p>
          <button className="w-full border border-white/30 hover:bg-white/10 text-white text-xs font-bold py-3 rounded-lg transition tracking-wider">
            KÍCH HOẠT NGAY
          </button>
        </div>

      </div>
    </section>
  );
}