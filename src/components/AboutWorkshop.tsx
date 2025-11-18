import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckCircle, ArrowRight } from "lucide-react";

export function AboutWorkshop() {
  const features = [
    "Sản xuất trực tiếp tại xưởng",
    "CNC – Sơn – Lắp đặt đồng bộ",
    "Nhận làm theo thiết kế",
    "Giá gốc không qua trung gian",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1661446521292-f92b6a0b6354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjB3b3Jrc2hvcCUyMGNyYWZ0c21hbnxlbnwxfHx8fDE3NjMzNjUzODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Furniture Workshop"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full mb-6">
              Về chúng tôi
            </div>
            <h2 className="mb-6">
              Xưởng Nội Thất Uy Tín –<br />
              Chúng Tôi Làm Gì?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Với hơn 15 năm kinh nghiệm trong ngành sản xuất nội thất, chúng tôi
              tự hào là đơn vị cung cấp giải pháp nội thất trọn gói từ thiết kế
              đến thi công hoàn thiện.
            </p>

            <div className="space-y-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group">
              Tìm hiểu về xưởng
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
