import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";
import { formatPriceVnd, getProducts, type Product } from "../lib/api";

export function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getProducts({ popular: true })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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

        {loading && (
          <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
        )}

        {error && (
          <p className="text-center text-red-600">
            Không tải được sản phẩm. Hãy chạy backend tại cổng 4000.
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={product.imageUrl}
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
                    <span className="text-amber-700">
                      {formatPriceVnd(product.priceFrom)} VNĐ
                    </span>
                  </p>
                  <button className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-full hover:bg-amber-700 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group/btn">
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl">
            Xem tất cả sản phẩm
          </button>
        </div>
      </div>
    </section>
  );
}
