import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Review() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm text-[#0f2c59]">Đánh giá khách hàng</h3>
        <a href="#" className="text-xs text-gray-400 hover:text-gray-600">Xem tất cả</a>
      </div>
      
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-3xl font-black text-[#0f2c59]">4.9<span className="text-xs text-gray-400 font-normal">/5</span></span>
        <div>
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">Dựa trên 536 đánh giá</p>
        </div>
      </div>

      <div className="bg-slate-50 p-3 rounded-lg relative flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px] font-bold text-white">HA</div>
            <div>
              <h5 className="text-xs font-bold text-gray-700">Nguyễn Hoàng Anh</h5>
              <p className="text-[9px] text-gray-400">2 ngày trước</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 italic">"Dịch vụ rất nhanh, nhân viên tư vấn nhiệt tình. Máy sửa xong chạy êm như mới!"</p>
        </div>
        
        {/* Navigation arrows */}
        <div className="flex justify-end space-x-1 mt-2">
          <button className="p-1 bg-white border border-gray-200 rounded text-gray-400 hover:text-gray-600"><ChevronLeft size={12} /></button>
          <button className="p-1 bg-white border border-gray-200 rounded text-gray-400 hover:text-gray-600"><ChevronRight size={12} /></button>
        </div>
      </div>
    </div>
  );
}