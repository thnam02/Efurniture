import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Anh Minh Tuấn",
      role: "Chủ căn hộ Vinhomes",
      content:
        "Chất lượng sản phẩm tuyệt vời, đội ngũ thi công chuyên nghiệp. Giá cả hợp lý so với chất lượng nhận được. Tôi rất hài lòng với bộ nội thất phòng khách.",
      rating: 5,
    },
    {
      id: 2,
      name: "Chị Lan Anh",
      role: "Kiến trúc sư",
      content:
        "Làm việc với xưởng rất dễ dàng, linh hoạt trong thiết kế và thi công. Sản phẩm được hoàn thiện đúng với bản vẽ thiết kế. Chắc chắn sẽ giới thiệu cho bạn bè.",
      rating: 5,
    },
    {
      id: 3,
      name: "Anh Đức Trọng",
      role: "Chủ nhà phố",
      content:
        "Từ khâu tư vấn đến hoàn thiện đều rất chu đáo. Thợ thi công tay nghề cao, sản phẩm đẹp và bền. Giá tại xưởng thật sự tiết kiệm được nhiều chi phí.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Khách Hàng Nói Gì Về Chúng Tôi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hàng trăm đánh giá 5 sao từ khách hàng đã sử dụng dịch vụ của chúng
            tôi
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
