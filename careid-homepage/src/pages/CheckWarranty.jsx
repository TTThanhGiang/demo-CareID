import React, { useState } from 'react';
import { Search, ShieldCheck, MapPin, Clock, Wrench, AlertCircle, CheckCircle2, HelpCircle, QrCode, ChevronRight } from 'lucide-react';

export default function CheckWarrantyOnly() {
  const [searchKey, setSearchKey] = useState('');
  const [searchError, setSearchError] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Mẫu dữ liệu giả lập (Mock Data) hệ thống trả về
  const mockWarrantyData = {
    fullName: "Nguyễn Văn A",
    phone: "0912345678",
    fullAddress: "Số 23 ngõ 81 Lạc Long Quân, Phường Ba Đình, Thành phố Hà Nội",
    deviceId: "CID123456789",
    brand: "Fatzbaby",
    deviceName: "Máy tiệt trùng sấy khô UVC",
    purchaseDate: "15/05/2025",
    warrantyExpired: "15/05/2026",
    status: "Active", // Active: Còn hạn, Expired: Hết hạn
    history: [
      {
        id: "BH-9982",
        date: "12/11/2025",
        reason: "Máy không lên nguồn UVC",
        solution: "Thay thế bo mạch nguồn chính hãng và vệ sinh buồng sấy",
        status: "Đã hoàn thành",
        center: "Trung tâm Kỹ thuật Benbi Hà Nội"
      },
      {
        id: "BH-1045",
        date: "04/02/2026",
        reason: "Kiểm tra định kỳ và đo lại cường độ tia UV",
        solution: "Hỗ trợ đo test miễn phí, thiết bị hoạt động bình thường",
        status: "Đã hoàn thành",
        center: "Trung tâm Kỹ thuật Benbi Hà Nội"
      }
    ]
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchKey.trim()) {
      setSearchError('Vui lòng nhập ID thiết bị hoặc Số điện thoại để tra cứu');
      return;
    }
    setSearchError('');
    setIsSearching(true);
    setHasSearched(false);

    // Giả lập thời gian gọi API từ Server (700ms)
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      const cleanKey = searchKey.trim().toUpperCase();
      
      // Kiểm tra nếu từ khóa khớp với dữ liệu mẫu (Thử với CID123456789 hoặc 0912345678)
      if (cleanKey === 'CID123456789' || cleanKey === '0912345678') {
        setSearchResult(mockWarrantyData);
      } else {
        setSearchResult(null); // Không tìm thấy
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-2 text-xs text-gray-400 mb-6 font-medium">
          <a href="#" className="hover:text-[#0f2c59]">Trang chủ</a>
          <ChevronRight size={12} />
          <span className="text-gray-600">Tra cứu CareID</span>
        </div>
        
        {/* TIÊU ĐỀ TRANG CHÍNH */}
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-xl font-black text-[#0f2c59] tracking-tight uppercase">Tra cứu hệ thống bảo hành điện tử</h1>
          <p className="text-xs text-gray-400 mt-1">Nhập Số điện thoại mua hàng hoặc mã định danh CareID của thiết bị để kiểm tra.</p>
        </div>

        {/* LAYOUT CHIA THÀNH 2 CỘT HÀNG NGANG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* CỘT TRÁI (LG: 7 CỘT): KHUNG TRA CỨU & HIỂN THỊ KẾT QUẢ ĐÃ TRA CỨU */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 1. THANH TÌM KIẾM */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
              <form onSubmit={handleSearchSubmit} className="flex flex-col space-y-3">
                <div className="relative w-full">
                    <input 
                    type="text" 
                    placeholder="Nhập Số Điện Thoại hoặc mã CareID (Ví dụ: CID123456789)..." 
                    value={searchKey} 
                    onChange={(e) => setSearchKey(e.target.value)} 
                    className={`w-full border ${searchError ? 'border-red-400 bg-red-50/10' : 'border-gray-200'} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0f2c59] font-medium`} 
                    />
                </div>

                {/* Dòng 2: Nút bấm tra cứu */}
                <button 
                    type="submit" 
                    disabled={isSearching} 
                    className="w-full bg-[#0f2c59] text-white text-xs font-bold py-3.5 rounded-xl hover:opacity-95 transition uppercase tracking-wider disabled:bg-gray-400 shadow-sm"
                >
                    {isSearching ? 'Đang tìm kiếm...' : 'Tra cứu thông tin'}
                </button>
              </form>
              {searchError && (
                <p className="text-[10px] text-red-500 mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} /> {searchError}
                </p>
              )}
            </div>

            {/* LOADING STATE */}
            {isSearching && (
              <div className="py-12 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-6 h-6 border-3 border-[#0f2c59] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-[11px] text-gray-400 font-medium">Đang truy xuất thông tin từ máy chủ...</p>
              </div>
            )}

            {/* 2. KHỐI THÔNG TIN ĐÃ ĐƯỢC TRA CỨU TRẢ VỀ */}
            {hasSearched && !isSearching && (
              searchResult ? (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* Card 1: Thông tin chung sản phẩm & Thời hạn */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#0f2c59] text-white px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck size={16} className="text-orange-400" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider">Thông tin thiết bị</span>
                      </div>
                      <span className={` whitespace-nowrap text-[8px] font-bold px-2.5 py-0.5 rounded-full border ${searchResult.status === 'Active' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'}`}>
                        {searchResult.status === 'Active' ? 'CÒN BẢO HÀNH' : 'HẾT BẢO HÀNH'}
                      </span>
                    </div>
                    
                    <div className="p-4 grid grid-cols-2 gap-3.5 text-xs">
                      <div className="space-y-0.5">
                        <span className="text-gray-400 block text-[10px] font-semibold uppercase">Tên thiết bị</span>
                        <span className="font-bold text-gray-800 flex items-center gap-1"> {searchResult.deviceName}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-gray-400 block text-[10px] font-semibold uppercase">Mã CareID định danh</span>
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded font-black text-[#0f2c59] text-[11px]">{searchResult.deviceId}</span>
                      </div>
                      <div className="space-y-0.5 border-t border-gray-50 pt-2">
                        <span className="text-gray-400 block text-[10px] font-semibold uppercase">Hãng sản xuất</span>
                        <span className="font-medium text-gray-700">{searchResult.brand}</span>
                      </div>
                      <div className="space-y-0.5 border-t border-gray-50 pt-2">
                        <span className="text-gray-400 block text-[10px] font-semibold uppercase">Khách hàng đăng ký</span>
                        <span className="font-medium text-gray-700">{searchResult.fullName}</span>
                      </div>
                      <div className="space-y-0.5 border-t border-gray-50 pt-2">
                        <span className="text-gray-400 block text-[10px] font-semibold uppercase">Số điện thoại</span>
                        <span className="font-medium text-gray-700">{searchResult.phone}</span>
                      </div>
                      <div className="space-y-0.5 border-t border-gray-50 pt-2">
                        <span className="text-gray-400 block text-[10px] font-semibold uppercase">Ngày kích hoạt</span>
                        <span className="font-medium text-gray-700">{searchResult.purchaseDate}</span>
                      </div>
                      <div className="col-span-2 border-t border-gray-100 pt-2.5">
                        <span className="text-gray-400 block text-[10px] font-semibold uppercase">Hạn bảo hành đến ngày</span>
                        <span className="font-black text-orange-600 text-base flex items-center gap-1"><Clock size={15} /> {searchResult.warrantyExpired}</span>
                      </div>
                      <div className="col-span-2 border-t border-gray-100 pt-2">
                        <span className="text-gray-400 block text-[10px] font-semibold uppercase">Địa chỉ nhận trả bảo hành</span>
                        <span className="text-gray-600 flex items-start gap-1 leading-relaxed"><MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" /> {searchResult.fullAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Lịch sử sửa chữa kỹ thuật */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h3 className="text-[11px] font-extrabold uppercase text-gray-400 tracking-wider mb-3.5 flex items-center gap-1.5 pb-2 border-b border-gray-50">
                      <Clock size={14} /> Nhật ký lịch sử sửa chữa kỹ thuật
                    </h3>
                    <div className="border-l-2 border-gray-100 pl-3.5 ml-1 space-y-4">
                      {searchResult.history.map((h, i) => (
                        <div key={i} className="text-xs space-y-1.5 bg-slate-50/60 p-3 rounded-xl border border-gray-100/70 relative">
                          {/* Dấu chấm tròn xanh bên lề đường mốc */}
                          <div className="absolute -left-[22px] top-4 w-2 h-2 rounded-full bg-[#0f2c59]" />
                          
                          <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                            <span className="font-bold bg-white px-1.5 py-0.5 border rounded">{h.id}</span>
                            <span>{h.date}</span>
                          </div>
                          <p className="text-gray-700"><span className="font-bold text-gray-600">Lý do nhận máy:</span> {h.reason}</p>
                          <p className="text-gray-700"><span className="font-bold text-gray-600">Biện pháp xử lý:</span> {h.solution}</p>
                          <div className="flex justify-between items-center text-[10px] pt-1 text-gray-400 italic">
                            <span>{h.center}</span>
                            <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 border border-green-200 rounded-md flex items-center gap-0.5">
                              <CheckCircle2 size={10} /> {h.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                /* THÔNG BÁO KHÔNG TÌM THẤY */
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-2">
                  <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle size={22} />
                  </div>
                  <h3 className="text-xs font-bold text-[#0f2c59] uppercase">Không tìm thấy thông tin</h3>
                  <p className="text-[11px] text-gray-400 max-w-sm mx-auto leading-relaxed">
                    Dữ liệu không khớp với bất kỳ số điện thoại hoặc mã CareID nào trên hệ thống. Vui lòng kiểm tra lại tem dán trên máy.
                  </p>
                </div>
              )
            )}
          </div>

          {/* CỘT PHẢI (LG: 5 CỘT): HƯỚNG DẪN TÌM MÃ CAREID CỐ ĐỊNH */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4 sticky top-6">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center">
                  <HelpCircle size={16} />
                </div>
                <h3 className="text-xs font-extrabold uppercase text-gray-700 tracking-wider">Hướng dẫn tìm mã CareID</h3>
              </div>

              {/* Mô phỏng mô hình tem nhãn sản phẩm bằng CSS */}
              <div className="bg-slate-50 border border-dashed border-gray-300 rounded-xl p-4 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-orange-500 text-white font-bold text-[8px] px-2 py-0.5 rounded-bl uppercase tracking-widest">Tem chính hãng</div>
                
                <div className="text-center border-b border-gray-200/60 pb-2">
                  <p className="text-[10px] font-black text-[#0f2c59] tracking-wider uppercase">BENBI VIỆT NAM — TECH CENTER</p>
                  <p className="text-[8px] text-gray-400">TRUNG TÂM BẢO HÀNH ĐIỆN TỬ TOÀN QUỐC</p>
                </div>

                <div className="flex items-center justify-between gap-3 bg-white p-2 rounded-lg border border-gray-100">
                  <div className="space-y-1 flex-1">
                    <p className="text-[9px] text-gray-400 font-medium">Model: <span className="font-bold text-gray-700">BB-UVC01</span></p>
                    <p className="text-[9px] text-gray-400 font-medium">S/N: <span className="font-mono text-gray-700">20260625XXXX</span></p>
                    <div className="border border-orange-400 bg-orange-50/60 p-1 rounded mt-1">
                      <p className="text-[9px] font-bold text-orange-700">MÃ ĐỂ TRA CỨU (CareID):</p>
                      <p className="text-xs font-mono font-black text-[#0f2c59] tracking-wider">CID123456789</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-slate-100 border border-gray-200 rounded flex flex-col items-center justify-center text-[6px] text-gray-400 font-bold gap-0.5 shrink-0">
                    <QrCode size={20} className="text-gray-700" />
                    <span>SCAN</span>
                  </div>
                </div>
              </div>

              {/* Các vị trí dán tem nhãn thông dụng */}
              <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
                <p className="font-bold text-gray-700 text-[11px]">Bạn có thể tìm thấy mã bạc này ở đâu?</p>
                <ul className="space-y-1.5 pl-1">
                  <li className="flex items-start gap-1.5">
                    <span className="text-orange-500 font-bold">•</span>
                    <span><span className="font-bold text-gray-700">Dưới đáy máy:</span> Lật ngược thiết bị, tem CareID thường được dán cạnh chân đế cao su hoặc khay pin.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-orange-500 font-bold">•</span>
                    <span><span className="font-bold text-gray-700">Phía sau thân máy:</span> Gần jack cắm nguồn hoặc tem phụ thông số kỹ thuật điện áp.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-orange-500 font-bold">•</span>
                    <span><span className="font-bold text-gray-700">Vỏ hộp hoặc Sách HDSD:</span> Tem phụ dán ngoài vỏ hộp carton lúc nhận hàng.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}