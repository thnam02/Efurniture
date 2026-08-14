import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AdminShell } from "../../components/admin/AdminShell";
import {
  clearAdminToken,
  createProduct,
  deleteProduct,
  getAdminCategories,
  getAdminProducts,
  getAdminToken,
  updateProduct,
  uploadProductImage,
  type AdminCategory,
  type AdminProduct,
  type ProductInput,
} from "../../lib/adminApi";
import { mediaUrl } from "../../lib/api";

const emptyForm: ProductInput = {
  name: "",
  slug: "",
  description: "",
  priceFrom: 0,
  imageUrl: "",
  popular: false,
  categoryId: "",
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

export function AdminProductsPage() {
  const navigate = useNavigate();
  const token = getAdminToken();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductInput>(emptyForm);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [cats, list] = await Promise.all([
          getAdminCategories(),
          getAdminProducts(
            categoryFilter === "all" ? undefined : { category: categoryFilter },
          ),
        ]);
        if (cancelled) return;
        setCategories(cats);
        setProducts(list);
        setSelectedId((current) => {
          if (current && list.some((p) => p.id === current)) return current;
          return null;
        });
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : "Không tải được dữ liệu";
        setError(msg);
        if (msg === "Unauthorized") {
          clearAdminToken();
          navigate("/admin", { replace: true });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [categoryFilter, navigate, token]);

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  function startCreate() {
    setMode("create");
    setSelectedId(null);
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id ?? "",
    });
    setMessage(null);
    setError(null);
  }

  function startEdit(product: AdminProduct) {
    setMode("edit");
    setSelectedId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description ?? "",
      priceFrom: product.priceFrom,
      imageUrl: product.imageUrl,
      popular: product.popular,
      categoryId: product.categoryId,
    });
    setMessage(null);
    setError(null);
  }

  async function handleImageFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadProductImage(file);
      setForm((f) => ({ ...f, imageUrl: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload ảnh thất bại");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    const payload: ProductInput = {
      name: form.name.trim(),
      slug: form.slug?.trim() || undefined,
      description: form.description?.trim() || null,
      priceFrom: Number(form.priceFrom),
      imageUrl: form.imageUrl.trim(),
      popular: form.popular,
      categoryId: form.categoryId,
    };

    try {
      if (mode === "create") {
        const created = await createProduct(payload);
        setProducts((prev) => [created, ...prev]);
        setMessage("Đã tạo sản phẩm");
        startEdit(created);
      } else if (selectedId) {
        const updated = await updateProduct(selectedId, payload);
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setMessage("Đã cập nhật sản phẩm");
        startEdit(updated);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedId) return;
    if (!window.confirm("Xóa sản phẩm này?")) return;

    setSaving(true);
    setError(null);
    try {
      await deleteProduct(selectedId);
      setProducts((prev) => prev.filter((p) => p.id !== selectedId));
      startCreate();
      setMessage("Đã xóa sản phẩm");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa thất bại");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Sản phẩm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategoryFilter("all")}
            className={`px-4 py-2 rounded-full text-sm ${
              categoryFilter === "all"
                ? "bg-amber-700 text-white"
                : "bg-white text-stone-700 border border-stone-200"
            }`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm ${
                categoryFilter === cat.slug
                  ? "bg-amber-700 text-white"
                  : "bg-white text-stone-700 border border-stone-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="px-4 py-2 rounded-full text-sm bg-stone-900 text-white hover:bg-stone-800"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      {message && (
        <p className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
          {message}
        </p>
      )}

      {loading && <p className="text-stone-500">Đang tải...</p>}

      {!loading && (
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
            {products.length === 0 ? (
              <p className="p-6 text-stone-500">Chưa có sản phẩm.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-stone-50 text-left text-stone-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Sản phẩm</th>
                      <th className="px-4 py-3 font-medium">Danh mục</th>
                      <th className="px-4 py-3 font-medium">Giá từ</th>
                      <th className="px-4 py-3 font-medium">Nổi bật</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        onClick={() => startEdit(product)}
                        className={`border-t border-stone-100 cursor-pointer hover:bg-amber-50/50 ${
                          selectedId === product.id ? "bg-amber-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={mediaUrl(product.imageUrl)}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover bg-stone-100"
                            />
                            <div>
                              <div className="text-stone-900">{product.name}</div>
                              <div className="text-xs text-stone-500">{product.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-stone-700">
                          {product.category.name}
                        </td>
                        <td className="px-4 py-3 text-stone-700 whitespace-nowrap">
                          {formatPrice(product.priceFrom)}
                        </td>
                        <td className="px-4 py-3">
                          {product.popular ? (
                            <span className="text-amber-700">Có</span>
                          ) : (
                            <span className="text-stone-400">Không</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <aside className="bg-white border border-stone-200 rounded-2xl p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-stone-900">
                {mode === "create" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
              </h2>
              {selectedId && (
                <Link
                  to={`/products/${form.slug || selectedId}`}
                  className="text-sm text-amber-700 hover:underline"
                  target="_blank"
                >
                  Xem trang
                </Link>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-stone-700 mb-1" htmlFor="name">
                  Tên *
                </label>
                <input
                  id="name"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm text-stone-700 mb-1" htmlFor="slug">
                  Slug (để trống = tự tạo)
                </label>
                <input
                  id="slug"
                  value={form.slug ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2"
                />
              </div>

              <div>
                <label
                  className="block text-sm text-stone-700 mb-1"
                  htmlFor="categoryId"
                >
                  Danh mục *
                </label>
                <select
                  id="categoryId"
                  required
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, categoryId: e.target.value }))
                  }
                  className="w-full rounded-lg border border-stone-300 px-3 py-2"
                >
                  <option value="" disabled>
                    Chọn danh mục
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm text-stone-700 mb-1"
                  htmlFor="priceFrom"
                >
                  Giá từ (VNĐ) *
                </label>
                <input
                  id="priceFrom"
                  type="number"
                  required
                  min={1}
                  value={form.priceFrom || ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      priceFrom: Number(e.target.value) || 0,
                    }))
                  }
                  className="w-full rounded-lg border border-stone-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm text-stone-700 mb-1" htmlFor="imageFile">
                  Ảnh sản phẩm *
                </label>
                {form.imageUrl && (
                  <img
                    src={mediaUrl(form.imageUrl)}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg bg-stone-100 mb-3"
                  />
                )}
                <input
                  id="imageFile"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={uploading || saving}
                  onChange={(e) => void handleImageFile(e.target.files?.[0])}
                  className="w-full text-sm"
                />
                <p className="text-xs text-stone-500 mt-2 mb-2">
                  {uploading ? "Đang tải ảnh..." : "Chọn file ảnh, hoặc dán URL bên dưới."}
                </p>
                <input
                  id="imageUrl"
                  type="text"
                  required
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  className="w-full rounded-lg border border-stone-300 px-3 py-2"
                  placeholder="https://... hoặc /uploads/..."
                />
              </div>

              <div>
                <label
                  className="block text-sm text-stone-700 mb-1"
                  htmlFor="description"
                >
                  Mô tả
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={form.description ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="w-full rounded-lg border border-stone-300 px-3 py-2"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-stone-700">
                <input
                  type="checkbox"
                  checked={form.popular}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, popular: e.target.checked }))
                  }
                />
                Sản phẩm nổi bật
              </label>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="px-5 py-2.5 rounded-full bg-amber-700 text-white hover:bg-amber-800 disabled:opacity-60"
                >
                  {saving
                    ? "Đang lưu..."
                    : mode === "create"
                      ? "Tạo sản phẩm"
                      : "Lưu thay đổi"}
                </button>
                {mode === "edit" && (
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => void handleDelete()}
                    className="px-5 py-2.5 rounded-full border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-60"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </form>
          </aside>
        </div>
      )}
    </AdminShell>
  );
}
