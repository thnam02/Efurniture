import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "10 Mẹo Trang Trí Phòng Khách Nhỏ Đẹp Và Rộng Rãi",
    excerpt:
      "Khám phá những bí quyết trang trí giúp không gian nhỏ trở nên thoáng đãng và hiện đại hơn.",
    date: "15 Tháng 11, 2025",
    image:
      "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2MzM4MTU0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Hướng Dẫn Phối Màu Nội Thất Theo Phong Cách Scandinavian",
    excerpt:
      "Cách lựa chọn và kết hợp màu sắc để tạo nên không gian Bắc Âu đầy ấm áp.",
    date: "12 Tháng 11, 2025",
    image:
      "https://images.unsplash.com/photo-1724582586413-6b69e1c94a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjM0NTU0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Cách Chọn Sofa Phù Hợp Với Diện Tích Phòng Của Bạn",
    excerpt:
      "Hướng dẫn chi tiết về kích thước và kiểu dáng sofa phù hợp với từng không gian.",
    date: "08 Tháng 11, 2025",
    image:
      "https://images.unsplash.com/photo-1578500396437-400b7d3d1831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwc29mYSUyMGJlaWdlfGVufDF8fHx8MTc2MzQ2OTM1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Blog() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Tin Tức & Kiến Thức Nội Thất</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cập nhật xu hướng và mẹo hay về trang trí nội thất
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="mb-3 group-hover:text-amber-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <button className="text-amber-700 hover:text-amber-800 flex items-center gap-2 group/btn">
                  Đọc thêm
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200 transition-all duration-200">
            Xem tất cả bài viết
          </button>
        </div>
      </div>
    </section>
  );
}
