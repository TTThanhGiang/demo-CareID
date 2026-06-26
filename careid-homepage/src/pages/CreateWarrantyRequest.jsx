import React, { useState } from 'react';
import { FileText, User, Phone, Mail, MapPin, QrCode, Wrench, Building, AlertTriangle, Upload, Calendar, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function CreateWarrantyRequest() {
  // Master data danh mục lỗi phổ biến
  const errorCategories = [
    "Thiết bị không lên nguồn / Mất nguồn",
    "Lỗi hệ thống sấy / Không nóng / Không đổi nhiệt",
    "Lỗi đèn phát tia UVC / Hỏng bóng led",
    "Màn hình hiển thị bị lỗi / Liệt cảm ứng",
    "Thiết bị phát tiếng kêu lạ / Kẹt động cơ",
    "Lỗi khác (Mô tả chi tiết bên dưới)"
  ];

  // Khởi tạo State cho form nhập liệu
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', fullAddress: '',
    deviceId: '', deviceName: '', brand: '',
    errorCategory: '', errorDescription: '',
    repairDate: '', repairTimeSlot: '',
    serviceLocation: '', receiveMethod: ''
  });

  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [successTicket, setSuccessTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Xử lý khi chọn file ảnh minh họa lỗi
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Logic kiểm tra dữ liệu và gửi Form
  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = {};

    // Validate Thông tin khách hàng
    if (!formData.fullName.trim()) errs.fullName = 'Vui lòng nhập họ và tên';
    if (!formData.phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại';
    if (!formData.fullAddress.trim()) errs.fullAddress = 'Vui lòng nhập địa chỉ cụ thể';

    // Validate Thông tin thiết bị
    if (!formData.deviceId.trim()) errs.deviceId = 'Vui lòng nhập mã định danh CareID';
    if (!formData.deviceName.trim()) errs.deviceName = 'Vui lòng nhập tên thiết bị';
    if (!formData.brand.trim()) errs.brand = 'Vui lòng nhập tên hãng sản xuất';

    // Validate Nội dung lỗi
    if (!formData.errorCategory) errs.errorCategory = 'Vui lòng chọn danh mục loại lỗi';
    if (!formData.errorDescription.trim()) errs.errorDescription = 'Vui lòng mô tả chi tiết tình trạng lỗi';

    // Validate Đặt lịch sửa chữa (4.3)
    if (!formData.repairDate) errs.repairDate = 'Vui lòng chọn ngày mong muốn';
    if (!formData.repairTimeSlot) errs.repairTimeSlot = 'Vui lòng chọn khung giờ hẹn';
    if (!formData.serviceLocation) errs.serviceLocation = 'Vui lòng chọn trung tâm tiếp nhận';
    if (!formData.receiveMethod) errs.receiveMethod = 'Vui lòng chọn hình thức gửi thiết bị';

    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);
      
      // Giả lập gửi dữ liệu lên Server (800ms)
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Tạo mã yêu cầu tự động theo định dạng REQ-YYYYMMDD-MÃ_SỐ
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const randomTicketId = `REQ-${yyyy}${mm}${dd}-${Math.floor(1000 + Math.random() * 9000)}`;
        
        setSuccessTicket(randomTicketId);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* TIÊU ĐỀ CHÍNH */}
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-xl font-black text-[#0f2c59] tracking-tight uppercase flex items-center justify-center md:justify-start gap-2">
            <FileText size={22} className="text-[#0f2c59]" /> Đăng ký yêu cầu bảo hành & sửa chữa
          </h1>
          <p className="text-xs text-gray-400 mt-1">Quý khách vui lòng cung cấp đầy đủ thông tin thiết bị và thiết lập lịch hẹn để được hỗ trợ kỹ thuật nhanh nhất.</p>
        </div>

        {/* TRẠNG THÁI GỬI THÀNH CÔNG */}
        {successTicket ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={38} />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-black text-[#0f2c59]">GỬI YÊU CẦU THÀNH CÔNG!</h2>
              <p className="text-xs text-gray-400">Yêu cầu sửa chữa của bạn đã được tiếp nhận vào luồng xử lý kỹ thuật.</p>
            </div>

            {/* MÃ PHIẾU YÊU CẦU */}
            <div className="max-w-md mx-auto bg-slate-50 border border-dashed border-gray-300 rounded-xl p-4 space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider">Mã số phiếu tiếp nhận của bạn</span>
              <span className="font-mono text-lg font-black text-orange-600 tracking-widest bg-white border px-4 py-1.5 rounded-lg inline-block shadow-sm">
                {successTicket}
              </span>
              <p className="text-[11px] text-gray-500 leading-relaxed pt-1">
                Vui lòng lưu lại mã số này để tra cứu tiến độ xử lý. Kỹ thuật viên sẽ liên hệ lại qua số điện thoại <span className="font-bold text-gray-700">{formData.phone}</span> trong vòng 2 giờ làm việc.
              </p>
            </div>

            <button 
              onClick={() => { setSuccessTicket(null); setSelectedImage(null); setFormData({ fullName: '', phone: '', email: '', fullAddress: '', deviceId: '', deviceName: '', brand: '', errorCategory: '', errorDescription: '', repairDate: '', repairTimeSlot: '', serviceLocation: '', receiveMethod: '' }); }}
              className="bg-[#0f2c59] text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:opacity-95 transition tracking-wider uppercase"
            >
              Tạo yêu cầu mới khác
            </button>
          </div>
        ) : (
          
          /* FORM ĐĂNG KÝ */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* KHỐI 1: THÔNG TIN KHÁCH HÀNG */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 space-y-4">
              <h3 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2">
                <User size={14} /> 1. Thông tin cá nhân khách hàng
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Họ và tên khách hàng <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Ví dụ: Nguyễn Văn A" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0f2c59]" />
                  {errors.fullName && <p className="text-[10px] text-red-500">{errors.fullName}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Số điện thoại liên hệ <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Ví dụ: 0912345678" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0f2c59]" />
                  {errors.phone && <p className="text-[10px] text-red-500">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Địa chỉ Email <span className="text-gray-400">(Không bắt buộc)</span></label>
                  <input type="email" placeholder="example@gmail.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0f2c59]" />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Địa chỉ cụ thể nơi cư trú <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Số nhà, ngõ ngách, phường/xã, quận/huyện, tỉnh thành..." value={formData.fullAddress} onChange={(e) => setFormData({...formData, fullAddress: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0f2c59]" />
                  {errors.fullAddress && <p className="text-[10px] text-red-500">{errors.fullAddress}</p>}
                </div>
              </div>
            </div>

            {/* KHỐI 2: THÔNG TIN THIẾT BỊ LỖI */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 space-y-4">
              <h3 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2">
                <Wrench size={14} /> 2. Chi tiết thông tin thiết bị
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Mã định danh CareID <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Mã CID dán dưới đáy máy" value={formData.deviceId} onChange={(e) => setFormData({...formData, deviceId: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0f2c59] font-mono uppercase" />
                  {errors.deviceId && <p className="text-[10px] text-red-500">{errors.deviceId}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Tên sản phẩm thiết bị <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Ví dụ: Máy tiệt trùng UVC FB4706" value={formData.deviceName} onChange={(e) => setFormData({...formData, deviceName: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0f2c59]" />
                  {errors.deviceName && <p className="text-[10px] text-red-500">{errors.deviceName}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Hãng sản xuất sản phẩm <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Ví dụ: Fatzbaby / Benbi" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0f2c59]" />
                  {errors.brand && <p className="text-[10px] text-red-500">{errors.brand}</p>}
                </div>
              </div>
            </div>

            {/* KHỐI 3: NỘI DUNG MÔ TẢ LỖI SẢN PHẨM */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 space-y-4">
              <h3 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2">
                <AlertTriangle size={14} /> 3. Hiện trạng lỗi kỹ thuật của máy
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Phân loại danh mục lỗi chính <span className="text-red-500">*</span></label>
                  <select value={formData.errorCategory} onChange={(e) => setFormData({...formData, errorCategory: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none">
                    <option value="">-- Click để chọn danh mục lỗi phù hợp nhất --</option>
                    {errorCategories.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
                  </select>
                  {errors.errorCategory && <p className="text-[10px] text-red-500">{errors.errorCategory}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Mô tả tình trạng chi tiết <span className="text-red-500">*</span></label>
                  <textarea rows="3" placeholder="Quý khách vui lòng điền rõ: Máy lỗi từ lúc nào? Biểu hiện bên ngoài ra sao? Đèn báo tín hiệu như thế nào khi cắm điện..." value={formData.errorDescription} onChange={(e) => setFormData({...formData, errorDescription: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0f2c59] resize-none leading-relaxed" />
                  {errors.errorDescription && <p className="text-[10px] text-red-500">{errors.errorDescription}</p>}
                </div>

                {/* Phần upload hình ảnh đính kèm bổ sung */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Hình ảnh chụp hiện trạng máy <span className="text-gray-400">(Nếu có)</span></label>
                  <div className="flex items-center gap-4">
                    <label className="border border-dashed border-gray-300 bg-slate-50 rounded-xl px-4 py-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100/50 transition shrink-0 w-36 h-24">
                      <Upload size={16} className="text-gray-400 mb-1" />
                      <span className="text-[10px] font-bold text-gray-500">TẢI ẢNH LÊN</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {selectedImage && (
                      <div className="relative w-36 h-24 border rounded-xl overflow-hidden bg-black/5">
                        <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setSelectedImage(null)} className="absolute top-1 right-1 bg-black/60 text-white font-bold rounded-full w-4 h-4 flex items-center justify-center text-[9px]">×</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* KHỐI 4: ĐĂNG KÝ LỊCH VÀ HÌNH THỨC SỬA CHỮA (4.3) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 space-y-4">
              <h3 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2">
                <Calendar size={14} /> 4. Đặt lịch hẹn và Hình thức sửa chữa
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Ngày sửa chữa mong muốn <span className="text-red-500">*</span></label>
                  <input type="date" value={formData.repairDate} onChange={(e) => setFormData({...formData, repairDate: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none" />
                  {errors.repairDate && <p className="text-[10px] text-red-500">{errors.repairDate}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Khung giờ hẹn làm việc <span className="text-red-500">*</span></label>
                  <select value={formData.repairTimeSlot} onChange={(e) => setFormData({...formData, repairTimeSlot: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none">
                    <option value="">-- Chọn khung giờ --</option>
                    <option value="Sáng (08:00 - 10:00)">Sáng (08:00 - 10:00)</option>
                    <option value="Sáng (10:00 - 12:00)">Sáng (10:00 - 12:00)</option>
                    <option value="Chiều (13:30 - 15:30)">Chiều (13:30 - 15:30)</option>
                    <option value="Chiều (15:30 - 17:30)">Chiều (15:30 - 17:30)</option>
                  </select>
                  {errors.repairTimeSlot && <p className="text-[10px] text-red-500">{errors.repairTimeSlot}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Địa điểm trung tâm tiếp nhận <span className="text-red-500">*</span></label>
                  <select value={formData.serviceLocation} onChange={(e) => setFormData({...formData, serviceLocation: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none">
                    <option value="">-- Chọn Trụ sở kỹ thuật --</option>
                    <option value="Trung tâm Kỹ thuật Benbi - Chi nhánh Hà Nội">Trung tâm Kỹ thuật Benbi - Chi nhánh Hà Nội</option>
                    <option value="Trung tâm Kỹ thuật Benbi - Chi nhánh Đà Nẵng">Trung tâm Kỹ thuật Benbi - Chi nhánh Đà Nẵng</option>
                    <option value="Trung tâm Kỹ thuật Benbi - Chi nhánh TP. Hồ Chí Minh">Trung tâm Kỹ thuật Benbi - Chi nhánh TP. Hồ Chí Minh</option>
                  </select>
                  {errors.serviceLocation && <p className="text-[10px] text-red-500">{errors.serviceLocation}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600">Hình thức tiếp nhận thiết bị <span className="text-red-500">*</span></label>
                  <select value={formData.receiveMethod} onChange={(e) => setFormData({...formData, receiveMethod: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none">
                    <option value="">-- Chọn cách gửi máy --</option>
                    <option value="Khách mang thiết bị trực tiếp tới trung tâm">Khách mang thiết bị trực tiếp tới trung tâm</option>
                    <option value="Gửi thiết bị (Chuyển phát nhanh bưu điện) về trung tâm">Gửi thiết bị (Chuyển phát nhanh bưu điện) về trung tâm</option>
                  </select>
                  {errors.receiveMethod && <p className="text-[10px] text-red-500">{errors.receiveMethod}</p>}
                </div>

              </div>
            </div>

            {/* THANH ĐIỀU HƯỚNG GỬI ĐƠN */}
            <div className="flex justify-end pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#0f2c59] text-white text-sm font-bold py-3.5 rounded-lg shadow-md hover:bg-opacity-95 transition tracking-wider uppercase"
              >
                {isSubmitting ? 'Đang tạo hồ sơ...' : 'Gửi yêu cầu & Đặt lịch'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}