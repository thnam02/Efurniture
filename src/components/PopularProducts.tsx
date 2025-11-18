import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Sofa Scandinavian 3 Chỗ",
    price: "15.500",
    image:
      "https://images.unsplash.com/photo-1578500396437-400b7d3d1831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwc29mYSUyMGJlaWdlfGVufDF8fHx8MTc2MzQ2OTM1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Bộ Bàn Ăn Gỗ Sồi",
    price: "22.800",
    image:
      "https://images.unsplash.com/photo-1611633332753-d1e2f695aa3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjB0YWJsZSUyMGNoYWlyc3xlbnwxfHx8fDE3NjM0MDk0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Tủ Kệ Trang Trí Hiện Đại",
    price: "12.900",
    image:
      "https://images.unsplash.com/photo-1762280237740-5a9292e527ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjYWJpbmV0JTIwc3RvcmFnZXxlbnwxfHx8fDE3NjM0NjkzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    name: "Giường Ngủ Cao Cấp",
    price: "18.500",
    image:
      "https://images.unsplash.com/photo-1668089677938-b52086753f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNDEzMDU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    name: "Bàn Làm Việc Minimal",
    price: "8.900",
    image:
      "https://images.unsplash.com/photo-1621743018966-29194999d736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZXNrJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MzQ1MTg0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    name: "Kệ Trang Trí Đa Năng",
    price: "6.500",
    image:
      "https://images.unsplash.com/photo-1627229483132-ecb9184f9d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NjM0NjY4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 7,
    name: "Bộ Sofa Phòng Khách",
    price: "28.900",
    image:
      "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2MzM4MTU0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 8,
    name: "Tủ Đầu Giường Cao Cấp",
    price: "5.200",
    image:
      "https://images.unsplash.com/photo-1653204095671-3ed81a4bc561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc2MzM4ODkxMHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function PopularProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Sản Phẩm Phổ Biến</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những sản phẩm nội thất được khách hàng yêu thích và lựa chọn nhiều
            nhất
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 group-hover:text-amber-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-900 mb-4">
                  Giá từ:{" "}
                  <span className="text-amber-700">{product.price}.000 VNĐ</span>
                </p>
                <button className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-full hover:bg-amber-700 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group/btn">
                  Xem chi tiết
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl">
            Xem tất cả sản phẩm
          </button>
        </div>
      </div>
    </section>
  );
}
