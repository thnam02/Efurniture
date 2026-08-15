import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearAdminToken } from "../../lib/adminApi";

type AdminShellProps = {
  title: string;
  children: ReactNode;
};

export function AdminShell({ title, children }: AdminShellProps) {
  const navigate = useNavigate();

  function logout() {
    clearAdminToken();
    navigate("/admin", { replace: true });
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-500">Admin</p>
            <h1 className="text-lg text-stone-900">{title}</h1>
          </div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/admin/quotes"
              className="text-sm px-3 py-1.5 rounded-full text-stone-700 hover:bg-stone-100"
            >
              Báo giá
            </Link>
            <Link
              to="/admin/products"
              className="text-sm px-3 py-1.5 rounded-full text-stone-700 hover:bg-stone-100"
            >
              Sản phẩm
            </Link>
            <Link
              to="/admin/categories"
              className="text-sm px-3 py-1.5 rounded-full text-stone-700 hover:bg-stone-100"
            >
              Danh mục
            </Link>
            <Link to="/" className="text-sm text-stone-600 hover:text-amber-700 hidden sm:inline">
              Trang chủ
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-sm px-4 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-800"
            >
              Đăng xuất
            </button>
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
    </div>
  );
}
