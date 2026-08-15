import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AdminShell } from "../../components/admin/AdminShell";
import {
  clearAdminToken,
  createCategory,
  deleteCategory,
  getAdminCategories,
  getAdminToken,
  updateCategory,
  uploadProductImage,
  type AdminCategory,
  type CategoryInput,
} from "../../lib/adminApi";
import { mediaUrl } from "../../lib/api";

const emptyForm: CategoryInput = {
  name: "",
  slug: "",
  imageUrl: "",
};

export function AdminCategoriesPage() {
  const navigate = useNavigate();
  const token = getAdminToken();
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryInput>(emptyForm);
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
        const list = await getAdminCategories();
        if (cancelled) return;
        setCategories(list);
        setSelectedId((current) => {
          if (current && list.some((c) => c.id === current)) return current;
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
  }, [navigate, token]);

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  function startCreate() {
    setMode("create");
    setSelectedId(null);
    setForm(emptyForm);
    setMessage(null);
    setError(null);
  }

  function startEdit(category: AdminCategory) {
    setMode("edit");
    setSelectedId(category.id);
    setForm({
      name: category.name,
      slug: category.slug,
      imageUrl: category.imageUrl ?? "",
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

    const payload: CategoryInput = {
      name: form.name.trim(),
      slug: form.slug?.trim() || undefined,
      imageUrl: form.imageUrl?.trim() || null,
    };

    try {
      if (mode === "create") {
        const created = await createCategory(payload);
        setCategories((prev) =>
          [...prev, created].sort((a, b) => a.name.localeCompare(b.name, "vi")),
        );
        setMessage("Đã tạo danh mục");
        startEdit(created);
      } else if (selectedId) {
        const updated = await updateCategory(selectedId, payload);
        setCategories((prev) =>
          prev
            .map((c) => (c.id === updated.id ? updated : c))
            .sort((a, b) => a.name.localeCompare(b.name, "vi")),
        );
        setMessage("Đã cập nhật danh mục");
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
    if (!window.confirm("Xóa danh mục này?")) return;

    setSaving(true);
    setError(null);
    try {
      await deleteCategory(selectedId);
      setCategories((prev) => prev.filter((c) => c.id !== selectedId));
      startCreate();
      setMessage("Đã xóa danh mục");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa thất bại");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Danh mục">
      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={startCreate}
          className="px-4 py-2 rounded-full text-sm bg-stone-900 text-white hover:bg-stone-800"
        >
          + Thêm danh mục
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
            {categories.length === 0 ? (
              <p className="p-6 text-stone-500">Chưa có danh mục.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-stone-50 text-left text-stone-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Danh mục</th>
                      <th className="px-4 py-3 font-medium">Slug</th>
                      <th className="px-4 py-3 font-medium">Sản phẩm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr
                        key={category.id}
                        onClick={() => startEdit(category)}
                        className={`border-t border-stone-100 cursor-pointer hover:bg-amber-50/50 ${
                          selectedId === category.id ? "bg-amber-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {category.imageUrl ? (
                              <img
                                src={mediaUrl(category.imageUrl)}
                                alt=""
                                className="w-12 h-12 rounded-lg object-cover bg-stone-100"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-stone-100" />
                            )}
                            <div className="text-stone-900">{category.name}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-stone-500">{category.slug}</td>
                        <td className="px-4 py-3 text-stone-700">
                          {category._count?.products ?? 0}
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
                {mode === "create" ? "Thêm danh mục" : "Sửa danh mục"}
              </h2>
              {selectedId && form.slug && (
                <Link
                  to={`/products?category=${form.slug}`}
                  className="text-sm text-amber-700 hover:underline"
                  target="_blank"
                >
                  Xem catalog
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
                <label className="block text-sm text-stone-700 mb-1" htmlFor="imageFile">
                  Ảnh danh mục
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
                  value={form.imageUrl ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  className="w-full rounded-lg border border-stone-300 px-3 py-2"
                  placeholder="https://... hoặc /uploads/..."
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="px-5 py-2.5 rounded-full bg-amber-700 text-white hover:bg-amber-800 disabled:opacity-60"
                >
                  {saving
                    ? "Đang lưu..."
                    : mode === "create"
                      ? "Tạo danh mục"
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
