import { FormEvent, useState } from "react";
import { Upload, Zap, MessageCircle, X } from "lucide-react";
import { submitQuote } from "../lib/api";

export function CustomFurniture() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const features = [
    {
      icon: Upload,
      title: "Tải lên hình mẫu",
      description: "Gửi ảnh hoặc bản vẽ của bạn",
    },
    {
      icon: Zap,
      title: "Báo giá nhanh 5 phút",
      description: "Nhận báo giá chi tiết ngay lập tức",
    },
    {
      icon: MessageCircle,
      title: "Tư vấn miễn phí",
      description: "Đội ngũ chuyên gia hỗ trợ 24/7",
    },
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitQuote(formData);
      setSuccess(result.message || "Đã gửi yêu cầu báo giá");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gửi yêu cầu thất bại");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="bao-gia" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Nhận Thiết Kế – Đóng Nội Thất Theo Yêu Cầu</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Gửi kích thước, hình mẫu hoặc bản vẽ — chúng tôi sẽ báo giá nhanh
            trong 5 phút.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="px-10 py-5 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Gửi yêu cầu báo giá
          </button>
          <p className="text-gray-600 mt-4">
            Hoặc gọi hotline:{" "}
            <span className="text-amber-700">1900 xxxx</span>
          </p>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="mb-2 text-xl">Yêu cầu báo giá</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Điền thông tin và đính kèm ảnh/bản vẽ nếu có.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1" htmlFor="name">
                  Họ tên *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1" htmlFor="phone">
                  Số điện thoại *
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label
                  className="block text-sm text-gray-700 mb-1"
                  htmlFor="dimensions"
                >
                  Kích thước (nếu có)
                </label>
                <input
                  id="dimensions"
                  name="dimensions"
                  placeholder="VD: 2.4m x 1.2m x 0.8m"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label
                  className="block text-sm text-gray-700 mb-1"
                  htmlFor="description"
                >
                  Mô tả nhu cầu *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  minLength={10}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1" htmlFor="file">
                  Hình mẫu / bản vẽ
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.gif,.pdf"
                  className="w-full text-sm"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-700">{success}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 disabled:opacity-60"
              >
                {submitting ? "Đang gửi..." : "Gửi yêu cầu"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
