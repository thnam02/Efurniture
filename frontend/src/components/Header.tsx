import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, type Category } from "../lib/api";

interface DropdownItem {
  label: string;
  to: string;
}

interface MenuItem {
  label: string;
  to: string;
  dropdown?: DropdownItem[];
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let cancelled = false;
    getCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch(() => {
        /* keep empty; fallback menu still works */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categoryDropdown: DropdownItem[] = [
    { label: "Tất cả sản phẩm", to: "/products" },
    ...(categories.length > 0
      ? categories.map((category) => ({
          label: category.name,
          to: `/products?category=${category.slug}`,
        }))
      : [
          { label: "Sofa", to: "/products?category=sofa" },
          { label: "Bàn ghế", to: "/products?category=ban-ghe" },
          { label: "Tủ – Kệ", to: "/products?category=tu-ke" },
          { label: "Phòng ngủ", to: "/products?category=phong-ngu" },
          { label: "Bàn làm việc", to: "/products?category=ban-lam-viec" },
          { label: "Đồ trang trí", to: "/products?category=do-trang-tri" },
        ]),
  ];

  const menuItems: MenuItem[] = [
    { label: "Trang chủ", to: "/" },
    {
      label: "Sản phẩm",
      to: "/products",
      dropdown: categoryDropdown,
    },
    {
      label: "Hàng mới",
      to: "/products?popular=true",
    },
    { label: "Liên lạc", to: "/#bao-gia" },
  ];

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                <span className="text-white">NT</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-gray-900">Nội Thất</div>
                <div className="text-xs text-gray-500">Workshop</div>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.to}
                  className="relative text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2 flex items-center gap-1"
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {item.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-3 min-w-[220px]">
                      {item.dropdown.map((dropdownItem, index) => (
                        <div key={dropdownItem.label}>
                          <Link
                            to={dropdownItem.to}
                            className="block px-5 py-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-colors duration-150"
                          >
                            {dropdownItem.label}
                          </Link>
                          {index < item.dropdown!.length - 1 && (
                            <div className="mx-3 border-t border-gray-100"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              to="/#bao-gia"
              className="px-6 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Nhận báo giá
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <div className="rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          mobileDropdownOpen === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileDropdownOpen === item.label && (
                      <div className="bg-gray-50 rounded-lg mt-1 py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.to}
                            className="block px-6 py-2.5 text-gray-600 hover:text-amber-700 hover:bg-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/#bao-gia"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-6 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all duration-200 shadow-md mt-4"
            >
              Nhận báo giá
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
