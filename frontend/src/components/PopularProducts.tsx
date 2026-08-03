import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { getProducts, type Product } from "../lib/api";

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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
}
