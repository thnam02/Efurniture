import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { formatPriceVnd, mediaUrl, type Product } from "../lib/api";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={mediaUrl(product.imageUrl)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-6">
        <p className="text-sm text-amber-700 mb-1">{product.category.name}</p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="mb-3 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-900 mb-4">
          Giá từ:{" "}
          <span className="text-amber-700">
            {formatPriceVnd(product.priceFrom)} VNĐ
          </span>
        </p>
        <Link
          to={`/products/${product.slug}`}
          className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-full hover:bg-amber-700 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group/btn"
        >
          Xem chi tiết
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
