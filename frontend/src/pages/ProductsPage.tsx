import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import {
  getCategories,
  getProducts,
  type Category,
  type Product,
} from "../lib/api";

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const popular = searchParams.get("popular") === "true";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch(() => {
        /* categories optional for filters */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getProducts({ category, popular: popular || undefined })
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
  }, [category, popular]);

  const activeCategory = categories.find((c) => c.slug === category);
  const title = popular
    ? "Sản phẩm nổi bật"
    : activeCategory
      ? activeCategory.name
      : "Tất cả sản phẩm";

  function selectCategory(slug?: string) {
    const next = new URLSearchParams();
    if (slug) next.set("category", slug);
    setSearchParams(next);
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <nav className="text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-amber-700">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Sản phẩm</span>
          </nav>
          <h1 className="mb-3">{title}</h1>
          <p className="text-gray-600 max-w-2xl">
            Khám phá bộ sưu tập nội thất thiết kế và sản xuất tại xưởng.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          <button
            type="button"
            onClick={() => selectCategory(undefined)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              !category && !popular
                ? "bg-amber-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => selectCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                category === cat.slug
                  ? "bg-amber-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-center text-gray-500 py-16">Đang tải sản phẩm...</p>
        )}

        {error && (
          <p className="text-center text-red-600 py-16">
            Không tải được sản phẩm. Hãy chạy backend tại cổng 4000.
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500 py-16">
            Chưa có sản phẩm trong danh mục này.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
