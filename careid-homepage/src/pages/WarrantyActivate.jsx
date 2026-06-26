import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Phone, QrCode, Calendar, MapPin, Building, ChevronRight, AlertCircle, FileText } from 'lucide-react';

export default function ActivateWarranty() {
  // 1. Dữ liệu Hãng & Thiết bị cố định
  const brandData = {
    "Fatzbaby": ["Máy hâm sữa Fatz", "Máy tiệt trùng sấy khô UVC", "Máy đun nước pha sữa"],
    "Spectra": ["Máy hút sữa Spectra S1+", "Máy hút sữa Spectra Dual Compact", "Máy hút sữa Spectra 9 Plus"],
    "Philips Avent": ["Máy hút sữa Avent Hoa Tuyết", "Máy tiệt trùng Avent 3-in-1"]
  };

  // 2. Các State quản lý dữ liệu địa chính
  const [locationMasterData, setLocationMasterData] = useState([]); // Lưu toàn bộ dữ liệu từ API v2
  const [wards, setWards] = useState([]);                           // Lưu danh sách phường/xã được lọc động
  const [isLoading, setIsLoading] = useState(true);

  // State quản lý toàn bộ Form dữ liệu gửi đi
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    deviceId: '',
    brand: '',
    deviceName: '',
    province: '',        // Lưu tên Tỉnh (Ví dụ: "Thành phố Hà Nội")
    ward: '',            // Lưu tên Phường/Xã (Ví dụ: "Phường Ba Đình")
    specificAddress: '', // Số nhà, tên đường
    purchaseDate: '',
    agreePolicy: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 3. Tải toàn bộ dữ liệu Tỉnh và Phường/Xã (?depth=2) ngay khi trang vừa load
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://provinces.open-api.vn/api/v2/?depth=2');
        const data = await response.json();
        setLocationMasterData(data || []);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu địa chính:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocationData();
  }, []);

  // 4. Xử lý khi người dùng chọn hoặc đổi Tỉnh/Thành phố
  const handleProvinceChange = (e) => {
    const selectedProvinceName = e.target.value;
    
    if (!selectedProvinceName) {
      setWards([]);
      setFormData({ ...formData, province: '', ward: '' });
      return;
    }

    // Tìm Tỉnh được chọn trong Master Data để lấy ra mảng `wards` của riêng tỉnh đó
    const foundProvince = locationMasterData.find(p => p.name === selectedProvinceName);
    const provinceWards = foundProvince ? foundProvince.wards : [];

    setWards(provinceWards);
    setFormData({
      ...formData,
      province: selectedProvinceName,
      ward: '' // Reset ô chọn Phường/Xã về trống khi thay đổi Tỉnh thành
    });

    if (errors.province) setErrors({ ...errors, province: '' });
  };

  // Xử lý thay đổi các ô Input text, select thường và Checkbox
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  // Kiểm tra tính hợp lệ của toàn bộ form trước khi submit
  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^(0[3|5|7|8|9])+([0-8]{8})\b$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không đúng định dạng';
    }
    if (!formData.province) newErrors.province = 'Vui lòng chọn Tỉnh/Thành phố';
    if (!formData.ward) newErrors.ward = 'Vui lòng chọn Phường/Xã';
    if (!formData.specificAddress.trim()) newErrors.specificAddress = 'Vui lòng nhập số nhà, tên đường';
    if (!formData.deviceId.trim()) newErrors.deviceId = 'Vui lòng nhập ID thiết bị';
    if (!formData.brand) newErrors.brand = 'Vui lòng chọn hãng sản xuất';
    if (!formData.deviceName) newErrors.deviceName = 'Vui lòng chọn tên thiết bị';
    if (!formData.purchaseDate) newErrors.purchaseDate = 'Vui lòng chọn ngày mua hàng';
    if (!formData.agreePolicy) newErrors.agreePolicy = 'Bạn phải đồng ý với điều khoản bảo hành';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Ghép chuỗi địa chỉ hoàn chỉnh từ cấu trúc 2 cấp
      const fullAddress = `${formData.specificAddress}, ${formData.ward}, ${formData.province}`;
      
      console.log('Dữ liệu gửi lên API Kích Hoạt:', {
        fullName: formData.fullName,
        phone: formData.phone,
        deviceId: formData.deviceId,
        brand: formData.brand,
        deviceName: formData.deviceName,
        purchaseDate: formData.purchaseDate,
        fullAddress: fullAddress
      });
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-400 mb-6 font-medium">
          <a href="#" className="hover:text-[#0f2c59]">Trang chủ</a>
          <ChevronRight size={12} />
          <span className="text-gray-600">Kích hoạt bảo hành</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header Card */}
          <div className="bg-[#0f2c59] text-white p-6 sm:p-8 flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-orange-400 shrink-0">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Kích hoạt bảo hành điện tử</h1>
              <p className="text-xs text-blue-200 mt-1">Kích hoạt một lần - Chăm sóc trọn đời</p>
            </div>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-4 my-6">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck size={36} />
              </div>
              <h2 className="text-xl font-bold text-[#0f2c59]">Kích Hoạt Thành Công!</h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                Hệ thống đã ghi nhận thông tin bảo hành của thiết bị <span className="font-bold text-gray-700">{formData.deviceName}</span>.
              </p>
              <button onClick={() => setIsSubmitted(false)} className="bg-[#0f2c59] text-white text-xs font-bold px-6 py-3 rounded-lg mt-4 tracking-wider">
                KÍCH HOẠT TIẾP TỤC
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              
              {/* PHẦN 1: THÔNG TIN KHÁCH HÀNG */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0f2c59] flex items-center gap-1"><User size={14} /> Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Nguyễn Văn A" className={`w-full border ${errors.fullName ? 'border-red-400 bg-red-50/10' : 'border-gray-200'} rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0f2c59]`} />
                  {errors.fullName && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.fullName}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0f2c59] flex items-center gap-1"><Phone size={14} /> Số điện thoại <span className="text-red-500">*</span></label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="0912345678" className={`w-full border ${errors.phone ? 'border-red-400 bg-red-50/10' : 'border-gray-200'} rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0f2c59]`} />
                  {errors.phone && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>}
                </div>
              </div>

              {/* PHẦN 2: KHỐI ĐỊA CHỈ ĐÃ ĐỒNG BỘ 2 CẤP */}
              <div className="border-t border-gray-100 pt-4 space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 flex items-center gap-1"><MapPin size={14} /> Địa chỉ nhận trả bảo hành</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Dropdown Tỉnh / Thành phố */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600">
                      Tỉnh / Thành phố {isLoading && <span className="text-[10px] text-blue-500 animate-pulse">(Đang tải dữ liệu...)</span>} <span className="text-red-500">*</span>
                    </label>
                    <select name="province" value={formData.province} onChange={handleProvinceChange} disabled={isLoading} className={`w-full border ${errors.province ? 'border-red-400' : 'border-gray-200'} rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0f2c59] disabled:bg-gray-50`}>
                      <option value="">-- Chọn Tỉnh/TP --</option>
                      {locationMasterData.map((p, index) => (
                        <option key={p.code || index} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                    {errors.province && <p className="text-[11px] text-red-500 mt-1">{errors.province}</p>}
                  </div>

                  {/* Dropdown Phường / Xã (Lấy dữ liệu đồng bộ trực tiếp từ mảng wards của Tỉnh) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600">Phường / Xã <span className="text-red-500">*</span></label>
                    <select name="ward" value={formData.ward} onChange={handleInputChange} disabled={!formData.province || wards.length === 0} className={`w-full border ${errors.ward ? 'border-red-400' : 'border-gray-200'} rounded-lg px-3 py-2 text-sm bg-white disabled:bg-gray-50 focus:outline-none focus:border-[#0f2c59]`}>
                      <option value="">-- Chọn Phường/Xã --</option>
                      {wards.map((w, index) => (
                        <option key={w.code || index} value={w.name}>{w.name}</option>
                      ))}
                    </select>
                    {errors.ward && <p className="text-[11px] text-red-500 mt-1">{errors.ward}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600">Số nhà, ngõ, tên đường cụ thể <span className="text-red-500">*</span></label>
                  <input type="text" name="specificAddress" value={formData.specificAddress} onChange={handleInputChange} placeholder="Ví dụ: Số 23 ngõ 81 Lạc Long Quân" className={`w-full border ${errors.specificAddress ? 'border-red-400' : 'border-gray-200'} rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0f2c59]`} />
                  {errors.specificAddress && <p className="text-[11px] text-red-500 mt-1">{errors.specificAddress}</p>}
                </div>
              </div>

              {/* PHẦN 3: THÔNG TIN SẢN PHẨM */}
              <div className="border-t border-gray-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-[#0f2c59] flex items-center gap-1"><QrCode size={14} /> ID thiết bị (CareID) <span className="text-red-500">*</span></label>
                  <input type="text" name="deviceId" value={formData.deviceId} onChange={handleInputChange} placeholder="Ví dụ: CID123456789" className={`w-full border ${errors.deviceId ? 'border-red-400' : 'border-gray-200'} rounded-lg px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:border-[#0f2c59] uppercase`} />
                  {errors.deviceId && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.deviceId}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0f2c59] flex items-center gap-1"><Building size={14} /> Hãng sản xuất <span className="text-red-500">*</span></label>
                  <select name="brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value, deviceName: '' })} className={`w-full border ${errors.brand ? 'border-red-400' : 'border-gray-200'} rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0f2c59] bg-white`}>
                    <option value="">-- Chọn Hãng --</option>
                    {Object.keys(brandData).map((b, i) => <option key={i} value={b}>{b}</option>)}
                  </select>
                  {errors.brand && <p className="text-[11px] text-red-500 mt-1">{errors.brand}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0f2c59] flex items-center gap-1"><ShieldCheck size={14} /> Tên thiết bị <span className="text-red-500">*</span></label>
                  <select name="deviceName" value={formData.deviceName} onChange={handleInputChange} disabled={!formData.brand} className={`w-full border ${errors.deviceName ? 'border-red-400' : 'border-gray-200'} rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0f2c59] disabled:bg-gray-50 disabled:text-gray-400`}>
                    <option value="">-- Chọn Thiết Bị --</option>
                    {formData.brand && brandData[formData.brand].map((device, i) => <option key={i} value={device}>{device}</option>)}
                  </select>
                  {errors.deviceName && <p className="text-[11px] text-red-500 mt-1">{errors.deviceName}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f2c59] flex items-center gap-1"><Calendar size={14} /> Ngày mua hàng <span className="text-red-500">*</span></label>
                <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleInputChange} className={`w-full border ${errors.purchaseDate ? 'border-red-400' : 'border-gray-200'} rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0f2c59]`} />
                {errors.purchaseDate && <p className="text-[11px] text-red-500 mt-1">{errors.purchaseDate}</p>}
              </div>

              {/* PHẦN 4: CHÍNH SÁCH BẢO HÀNH TRỰC QUAN */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <label className="text-xs font-bold text-[#0f2c59] flex items-center gap-1">
                  <FileText size={14} /> Điều khoản & Chính sách bảo hành
                </label>
                <div className="w-full h-36 overflow-y-auto border border-gray-200 bg-slate-50 rounded-lg p-3 text-xs text-gray-500 space-y-3 leading-relaxed">
                  
                  {/* Điều kiện áp dụng */}
                  <div className="space-y-1">
                    <p className="font-bold text-gray-700">1. Điều kiện áp dụng:</p>
                    <p>• Sản phẩm đã được đăng ký bảo hành điện tử và còn trong thời hạn bảo hành.</p>
                    <p>• Tem bảo hành trùng khớp với ID đăng ký kích hoạt bảo hành. Tem còn nguyên vẹn, không có dấu hiệu rách rời, tẩy xóa.</p>
                    <p className="text-amber-600 bg-amber-50 p-1.5 rounded my-1 text-[11px]">
                      * Lưu ý: Trong một số trường hợp áp dụng bảo hành theo ngày dự sinh, quý khách cần đăng ký kích hoạt bảo hành online cần gửi kèm hình giấy tờ liên quan chứng minh được ngày sinh hoặc ngày dự sinh.
                    </p>
                    <p>• Sản phẩm được sử dụng đúng mục đích, công năng và cách thức sử dụng đúng theo hướng dẫn sử dụng.</p>
                    <p>• Sản phẩm bị lỗi hỏng được trung tâm kỹ thuật đánh giá, kết luận là do lỗi kỹ thuật của Nhà sản xuất.</p>
                    <p>• Sản phẩm được lắp đặt đúng quy định, quy chuẩn kỹ thuật và sử dụng đúng mục đích.</p>
                  </div>

                  {/* Trường hợp từ chối */}
                  <div className="space-y-1 border-t border-gray-200/60 pt-2">
                    <p className="font-bold text-gray-700">2. Trường hợp từ chối:</p>
                    <p>• Sản phẩm đã hết thời hạn bảo hành.</p>
                    <p>• Sản phẩm hư hỏng do lắp đặt, bảo quản, sử dụng sai mục đích hoặc không tuân theo các hướng dẫn sử dụng, chỉ dẫn, cảnh báo kèm theo sản phẩm.</p>
                    <p>• Sản phẩm hư hỏng do thiên tai, hỏa hoạn, lụt lội, sét đánh, hao mòn do môi trường oxy hóa, vật lạ vào máy, bao gồm nhưng không giới hạn sự kiện bất khả kháng gây ra.</p>
                    <p>• Sản phẩm bị hư hỏng do bị côn trùng, sâu bọ, mối mọt, bao gồm nhưng không giới hạn động vật thâm nhập.</p>
                    <p>• Sản phẩm bị cong vênh, rạn nứt, bể vỡ, hỏng do rơi, đổ trong quá trình vận chuyển, sử dụng, do tác động ngoại lực.</p>
                    <p>• Sản phẩm hư hỏng do nguồn điện không ổn định, các mối tiếp điểm điện không tốt, ổ cắm, phích cắm lỏng lẻo, dao động điện áp quá khả năng cho phép: 220V ± 10V, hoặc tự ý thay thế thiết kế dây nguồn không phù hợp.</p>
                    <p>• Sản phẩm hư hỏng do tự ý sửa chữa, thay đổi cấu trúc sản phẩm mà không có sự cho phép hoặc giám sát bởi trung tâm kỹ thuật của Benbi Việt Nam.</p>
                    <p>• Sản phẩm không có tem niêm phong/tem bảo hành hoặc bị tẩy xóa, có dấu hiệu đã mở sản phẩm trong lần bảo hành đầu tiên.</p>
                    <p>• Sản phẩm không còn mang số máy (Serial No) của nhà sản xuất, số máy bị cào rách, mờ hoặc mất ký tự không nhận diện được.</p>
                    <p>• Bất cứ hư hỏng nào liên quan đến việc sử dụng linh phụ kiện không chính hãng Benbi nhưng không có sự cho phép của trung tâm kỹ thuật Benbi.</p>
                  </div>

                </div>
              </div>

              {/* PHẦN 5: CHECKBOX XÁC NHẬN BẮT BUỘC */}
              <div className="space-y-1 pt-1">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input type="checkbox" name="agreePolicy" checked={formData.agreePolicy} onChange={handleInputChange} className="w-4 h-4 rounded mt-0.5 border-gray-300 text-[#0f2c59] focus:ring-[#0f2c59]" />
                  <span className="text-xs text-gray-600">Tôi cam kết thông tin khai báo trên là chính xác và đồng ý với chính sách của hãng. <span className="text-red-500">*</span></span>
                </label>
                {errors.agreePolicy && <p className="text-[11px] text-red-500 flex items-center gap-1 pl-6.5"><AlertCircle size={12} /> {errors.agreePolicy}</p>}
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[#0f2c59] text-white text-sm font-bold py-3.5 rounded-lg shadow-md hover:bg-opacity-95 transition tracking-wider uppercase">Xác nhận kích hoạt</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}