import React from 'react';
import { ShieldCheck, CheckCircle, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1f3f] text-white text-xs py-4 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4 text-gray-300">
        <div className="flex items-center space-x-2">
          <ShieldCheck size={16} className="text-green-400" />
          <span>100% chính hãng</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle size={16} className="text-blue-400" />
          <span>Bảo hành minh bạch</span>
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquare size={16} className="text-cyan-400" />
          <span>Hỗ trợ nhanh 24/7</span>
        </div>
        <div className="flex items-center space-x-2">
          <ShieldCheck size={16} className="text-indigo-400" />
          <span>Bảo mật thông tin</span>
        </div>
      </div>
    </footer>
  );
}