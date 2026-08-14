import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProductCard } from "../components/ProductCard";
import {
  formatPriceVnd,
  getProduct,
  getProducts,
  mediaUrl,
  type Product,
} from "../lib/api";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getProduct(slug)
      .then(async (data) => {
        if (cancelled) return;
        setProduct(data);
        const siblings = await getProducts({ category: data.category.slug });
        if (!cancelled) {
          setRelated(siblings.filter((p) => p.id !== data.id).slice(0, 4));
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setProduct(null);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-gray-500">
        Đang tải sản phẩm...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-red-600 mb-6">Không tìm thấy sản phẩm.</p>
        <Link to="/products" className="text-amber-700 hover:underline">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-amber-700">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-amber-700">
            Sản phẩm
          </Link>
          <span className="mx-2">/</span>
          <Link
            to={`/products?category=${product.category.slug}`}
            className="hover:text-amber-700"
          >
            {product.category.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-md">
            <ImageWithFallback
              src={mediaUrl(product.imageUrl)}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-amber-700 mb-2">{product.category.name}</p>
            <h1 className="mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-900 mb-6">
              Giá từ:{" "}
              <span className="text-amber-700">
                {formatPriceVnd(product.priceFrom)} VNĐ
              </span>
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description ||
                "Sản phẩm nội thất cao cấp được thiết kế và sản xuất tại xưởng. Liên hệ để nhận báo giá theo kích thước và yêu cầu của bạn."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/#bao-gia"
                className="px-8 py-4 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all duration-200 text-center shadow-md"
              >
                Nhận báo giá
              </Link>
              <Link
                to={`/products?category=${product.category.slug}`}
                className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200 transition-all duration-200 text-center inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Xem cùng danh mục
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-8">
              <h2>Sản phẩm liên quan</h2>
              <Link
                to={`/products?category=${product.category.slug}`}
                className="text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 text-sm"
              >
                Xem thêm
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
