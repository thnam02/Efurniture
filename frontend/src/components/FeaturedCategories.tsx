import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getCategories, type Category } from "../lib/api";

const fallbackCategories: Category[] = [
  {
    id: "sofa",
    name: "Sofa",
    slug: "sofa",
    imageUrl:
      "https://images.unsplash.com/photo-1578500396437-400b7d3d1831?w=1080",
  },
  {
    id: "ban-ghe",
    name: "Bàn ghế",
    slug: "ban-ghe",
    imageUrl:
      "https://images.unsplash.com/photo-1611633332753-d1e2f695aa3c?w=1080",
  },
  {
    id: "tu-ke",
    name: "Tủ – Kệ",
    slug: "tu-ke",
    imageUrl:
      "https://images.unsplash.com/photo-1762280237740-5a9292e527ab?w=1080",
  },
  {
    id: "phong-ngu",
    name: "Phòng ngủ",
    slug: "phong-ngu",
    imageUrl:
      "https://images.unsplash.com/photo-1668089677938-b52086753f77?w=1080",
  },
  {
    id: "do-trang-tri",
    name: "Đồ trang trí",
    slug: "do-trang-tri",
    imageUrl:
      "https://images.unsplash.com/photo-1627229483132-ecb9184f9d07?w=1080",
  },
  {
    id: "ban-lam-viec",
    name: "Bàn làm việc",
    slug: "ban-lam-viec",
    imageUrl:
      "https://images.unsplash.com/photo-1621743018966-29194999d736?w=1080",
  },
];

export function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);

  useEffect(() => {
    let cancelled = false;
    getCategories()
      .then((data) => {
        if (!cancelled && data.length > 0) setCategories(data);
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/5]"
            >
              <ImageWithFallback
                src={
                  category.imageUrl ||
                  "https://images.unsplash.com/photo-1578500396437-400b7d3d1831?w=1080"
                }
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
