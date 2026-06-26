import React from 'react';
import { ShieldCheck, Wrench, Gift, ShoppingBag, ChevronRight } from 'lucide-react';

export default function Features() {
  const items = [
    {
      icon: <ShieldCheck size={24} />,
      title: "Bảo hành chính hãng",
      desc: "Tiếp nhận và xử lý bảo hành cho các sản phẩm chính hãng từ đối tác.",
      actionText: "Xem chi tiết"
    },
    {
      icon: <Wrench size={24} />,
      title: "Sửa chữa chuyên nghiệp",
      desc: "Sửa chữa nhanh chóng, linh kiện chính hãng, bảo hành sau sửa chữa.",
      actionText: "Xem chi tiết"
    },
    {
      icon: <Gift size={24} />,
      title: "Gia hạn bảo hành",
      desc: "Mua gói bảo hành mở rộng để an tâm sử dụng lâu dài hơn.",
      actionText: "Xem chi tiết"
    },
    {
      icon: <ShoppingBag size={24} />,
      title: "Phụ kiện & sản phẩm",
      desc: "Cung cấp phụ kiện chính hãng và các sản phẩm chất lượng.",
      actionText: "Mua ngay"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 pt-16 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-50 text-[#0f2c59] rounded-full flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h4 className="font-bold text-sm text-[#0f2c59]">{item.title}</h4>
            <p className="text-xs text-gray-500 mt-2 mb-4 flex-1">{item.desc}</p>
            <a href="#" className="text-xs font-bold text-blue-600 flex items-center space-x-1 group-hover:text-blue-700">
              <span>{item.actionText}</span> <ChevronRight size={14} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}