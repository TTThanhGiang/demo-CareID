import React from 'react';
import { CheckCircle, Clock, MessageSquare, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom'; // Thêm Import
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e3edf7] to-[#f4f7fc] pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-[#0f2c59] leading-tight">
              Care<span className="text-[#f16522]">ID</span>
            </h1>
            <p className="text-2xl lg:text-3xl font-bold text-[#0f2c59] mt-1">
              Hộ chiếu điện tử của thiết bị
            </p>
            <p className="text-lg font-semibold text-gray-600 mt-2">
              Một mã định danh - Trọn đời thiết bị
            </p>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed max-w-md">
            Kích hoạt bảo hành điện tử, theo dõi lịch sử sửa chữa, nhận hỗ trợ nhanh và nhiều ưu đãi dành riêng cho bạn.
          </p>

          {/* Quick Benefits */}
          <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-3">
                <CheckCircle 
                className="text-[#0f2c59]" 
                size={30} 
                />

                <p className="text-sm text-gray-700 font-medium">
                <span className="font-bold block">
                    Kích hoạt
                </span>
                bảo hành dễ dàng
                </p>
            </div>


            <div className="flex items-center gap-3">

                <Clock 
                className="text-[#0f2c59]" 
                size={30} 
                />

                <p className="text-sm text-gray-700 font-medium">
                <span className="font-bold block">
                    Theo dõi lịch sử
                </span>
                sửa chữa
                </p>

            </div>


            <div className="flex items-center gap-3">

                <MessageSquare 
                className="text-[#0f2c59]" 
                size={30} 
                />

                <p className="text-sm text-gray-700 font-medium">
                <span className="font-bold block">
                    Hỗ trợ nhanh chóng
                </span>
                qua Zalo, Messenger
                </p>

            </div>


            </div>

          {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">

            <Link to="/kich-hoat-bao-hanh"
                className="
                w-56
                bg-[#0f2c59]
                text-white
                text-xs
                font-bold
                px-6
                py-3.5
                rounded-lg
                flex
                items-center
                justify-between
                shadow-md
                hover:bg-[#0f2c59]/90 
                transition
                "
            >
                <span>KÍCH HOẠT BẢO HÀNH</span>
                <ChevronRight size={16} />
            </Link>

            <Link to="/tra-cuu-bao-hanh"
                className="
                w-56
                bg-white
                border
                border-gray-200
                text-[#0f2c59]
                text-xs
                font-bold
                px-6
                py-3.5
                rounded-lg
                flex
                items-center
                justify-between
                shadow-sm
                hover:bg-white/10 
                transition
                "
            >
                <span>TRA CỨU CAREID</span>
                <ChevronRight size={16} />
            </Link>

            </div>
        </div>

        {/* Right Graphics Mockup */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="relative bg-white/40 backdrop-blur-md rounded-full p-8 shadow-2xl max-w-md w-full aspect-square flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center space-x-4">
              <div className="w-20 h-32 bg-gray-200 rounded-xl opacity-80 flex items-center justify-center text-[10px] text-gray-400">Máy hút sữa</div>
              <div className="w-24 h-40 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-between p-3 relative z-10">
                <div className="text-[10px] font-bold text-gray-400">CareID</div>
                <div className="w-full bg-slate-100 rounded-md p-1.5 text-center text-[9px] font-mono text-[#0f2c59]">CID123456789</div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600"><ShieldCheck size={16} /></div>
                <div className="text-[8px] text-center text-gray-500">Thiết bị được bảo vệ</div>
              </div>
              <div className="w-16 h-36 bg-gray-100 rounded-full opacity-90 flex items-center justify-center text-[10px] text-gray-400 [writing-mode:vertical-lr]">Bàn chải điện</div>
              <div className="w-14 h-24 bg-zinc-800 rounded-lg opacity-80 flex items-center justify-center text-[8px] text-white">Súng massage</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}