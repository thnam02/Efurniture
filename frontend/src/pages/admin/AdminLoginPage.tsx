import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAdminToken, setAdminToken, verifyAdminToken } from "../../lib/adminApi";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const existing = getAdminToken();
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (existing) {
    return <Navigate to="/admin/quotes" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await verifyAdminToken(token.trim());
      setAdminToken(token.trim());
      navigate("/admin/quotes", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl text-stone-900 mb-2">Admin</h1>
        <p className="text-stone-600 text-sm mb-6">
          Nhập admin token để quản lý yêu cầu báo giá.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="token" className="block text-sm text-stone-700 mb-1">
              Admin token
            </label>
            <input
              id="token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className="w-full rounded-lg border border-stone-300 px-3 py-2"
              placeholder="dev-admin-token"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 disabled:opacity-60"
          >
            {loading ? "Đang xác thực..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
