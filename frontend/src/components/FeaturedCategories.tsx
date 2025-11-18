import { ImageWithFallback } from "./figma/ImageWithFallback";

const categories = [
  {
    name: "Sofa",
    image:
      "https://images.unsplash.com/photo-1578500396437-400b7d3d1831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwc29mYSUyMGJlaWdlfGVufDF8fHx8MTc2MzQ2OTM1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Bàn ghế",
    image:
      "https://images.unsplash.com/photo-1611633332753-d1e2f695aa3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjB0YWJsZSUyMGNoYWlyc3xlbnwxfHx8fDE3NjM0MDk0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Tủ – Kệ",
    image:
      "https://images.unsplash.com/photo-1762280237740-5a9292e527ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjYWJpbmV0JTIwc3RvcmFnZXxlbnwxfHx8fDE3NjM0NjkzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Phòng ngủ",
    image:
      "https://images.unsplash.com/photo-1668089677938-b52086753f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNDEzMDU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Đồ trang trí",
    image:
      "https://images.unsplash.com/photo-1627229483132-ecb9184f9d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NjM0NjY4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Bàn làm việc",
    image:
      "https://images.unsplash.com/photo-1621743018966-29194999d736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZXNrJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MzQ1MTg0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Danh Mục Sản Phẩm</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập nội thất được thiết kế và sản xuất tại xưởng của
            chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/5]"
            >
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
