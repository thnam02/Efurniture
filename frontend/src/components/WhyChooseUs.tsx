import { Factory, Users, Shield, Zap } from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Factory,
      title: "Giá tại xưởng",
      description: "Không qua trung gian, tiết kiệm đến 30% chi phí",
    },
    {
      icon: Users,
      title: "Đội ngũ thợ chuyên nghiệp",
      description: "Hơn 15 năm kinh nghiệm trong ngành",
    },
    {
      icon: Shield,
      title: "Bảo hành uy tín",
      description: "Bảo hành 5 năm, hỗ trợ suốt đời",
    },
    {
      icon: Zap,
      title: "Thi công nhanh chóng",
      description: "Hoàn thành dự án đúng tiến độ cam kết",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white">Tại Sao Chọn Chúng Tôi?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Những giá trị cốt lõi tạo nên sự khác biệt của xưởng nội thất chúng
            tôi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="text-center p-8 bg-gray-800 rounded-2xl hover:bg-gray-750 transition-colors group"
            >
              <div className="w-20 h-20 bg-amber-700/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-700/30 transition-colors">
                <reason.icon className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="mb-3 text-white">{reason.title}</h3>
              <p className="text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
