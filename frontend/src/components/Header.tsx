import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

interface DropdownItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { label: "Trang chủ", href: "#" },
    {
      label: "Đồ nội thất",
      href: "#products",
      dropdown: [
        { label: "Sofa", href: "#sofa" },
        { label: "Bàn ghế", href: "#table-chairs" },
        { label: "Giường", href: "#bed" },
        { label: "Tủ – Kệ", href: "#cabinet" },
        { label: "Bàn làm việc", href: "#desk" },
        { label: "Phòng khách", href: "#living-room" },
        { label: "Phòng ngủ", href: "#bedroom" },
      ],
    },
    {
      label: "Đồ trang trí",
      href: "#decor",
      dropdown: [
        { label: "Đèn", href: "#lights" },
        { label: "Tranh treo tường", href: "#wall-art" },
        { label: "Thảm", href: "#rugs" },
        { label: "Gương", href: "#mirrors" },
        { label: "Decor gốm – sứ", href: "#ceramics" },
        { label: "Chậu cây – trang trí", href: "#plants" },
      ],
    },
    {
      label: "Hàng mới",
      href: "#new",
      dropdown: [
        { label: "Bộ sưu tập mới", href: "#new-collection" },
        { label: "Xu hướng 2025", href: "#trends-2025" },
        { label: "Sản phẩm nổi bật", href: "#featured" },
      ],
    },
    { label: "Liên lạc", href: "#contact" },
  ];

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                <span className="text-white">NT</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-gray-900">Nội Thất</div>
                <div className="text-xs text-gray-500">Workshop</div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  className="relative text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2 flex items-center gap-1"
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full"></span>
                </a>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-3 min-w-[220px]">
                      {item.dropdown.map((dropdownItem, index) => (
                        <div key={dropdownItem.label}>
                          <a
                            href={dropdownItem.href}
                            className="block px-5 py-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-colors duration-150"
                          >
                            {dropdownItem.label}
                          </a>
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

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <button className="px-6 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all duration-200 shadow-md hover:shadow-lg">
              Nhận báo giá
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  // Menu item with dropdown (accordion style)
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

                    {/* Mobile Dropdown Content */}
                    {mobileDropdownOpen === item.label && (
                      <div className="bg-gray-50 rounded-lg mt-1 py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="block px-6 py-2.5 text-gray-600 hover:text-amber-700 hover:bg-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular menu item without dropdown
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <button className="w-full px-6 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all duration-200 shadow-md mt-4">
              Nhận báo giá
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
