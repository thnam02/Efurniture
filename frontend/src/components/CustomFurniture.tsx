import { Upload, Zap, MessageCircle } from "lucide-react";

export function CustomFurniture() {
  const features = [
    {
      icon: Upload,
      title: "Tải lên hình mẫu",
      description: "Gửi ảnh hoặc bản vẽ của bạn",
    },
    {
      icon: Zap,
      title: "Báo giá nhanh 5 phút",
      description: "Nhận báo giá chi tiết ngay lập tức",
    },
    {
      icon: MessageCircle,
      title: "Tư vấn miễn phí",
      description: "Đội ngũ chuyên gia hỗ trợ 24/7",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Nhận Thiết Kế – Đóng Nội Thất Theo Yêu Cầu</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Gửi kích thước, hình mẫu hoặc bản vẽ — chúng tôi sẽ báo giá nhanh
            trong 5 phút.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-10 py-5 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl">
            Gửi yêu cầu báo giá
          </button>
          <p className="text-gray-600 mt-4">
            Hoặc gọi hotline:{" "}
            <span className="text-amber-700">1900 xxxx</span>
          </p>
        </div>
      </div>
    </section>
  );
}
