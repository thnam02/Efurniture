import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const aboutLinks = [
    { label: "Về chúng tôi", href: "#" },
    { label: "Xưởng sản xuất", href: "#" },
    { label: "Quy trình làm việc", href: "#" },
    { label: "Tuyển dụng", href: "#" },
  ];

  const categoryLinks = [
    { label: "Sofa", href: "#" },
    { label: "Bàn ghế", href: "#" },
    { label: "Tủ - Kệ", href: "#" },
    { label: "Phòng ngủ", href: "#" },
    { label: "Đồ trang trí", href: "#" },
  ];

  const projectLinks = [
    { label: "Căn hộ", href: "#" },
    { label: "Nhà phố", href: "#" },
    { label: "Văn phòng", href: "#" },
    { label: "Khách sạn", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                <span className="text-white">NT</span>
              </div>
              <div>
                <div className="text-white">Nội Thất</div>
                <div className="text-xs text-gray-400">Workshop</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Xưởng sản xuất nội thất cao cấp với hơn 15 năm kinh nghiệm. Chất
              lượng - Uy tín - Giá tại xưởng.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Danh mục */}
          <div>
            <h3 className="text-white mb-6">Danh Mục</h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Dự án */}
          <div>
            <h3 className="text-white mb-6">Dự Án</h3>
            <ul className="space-y-3">
              {projectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h3 className="text-white mb-4">Về Chúng Tôi</h3>
              <ul className="space-y-3">
                {aboutLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-white mb-6">Thông Tin Liên Hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-400">Hotline</div>
                  <a
                    href="tel:1900xxxx"
                    className="text-white hover:text-amber-500 transition-colors"
                  >
                    1900 xxxx
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-400">Email</div>
                  <a
                    href="mailto:info@noithat.vn"
                    className="text-white hover:text-amber-500 transition-colors"
                  >
                    info@noithat.vn
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-400">Địa chỉ xưởng</div>
                  <div className="text-white">
                    KCN Vsip 2, Bình Dương
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Nội Thất Workshop. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
              >
                Chính sách bảo mật
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
              >
                Điều khoản dịch vụ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
