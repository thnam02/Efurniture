import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AdminShell } from "../../components/admin/AdminShell";
import {
  QUOTE_STATUSES,
  clearAdminToken,
  getAdminToken,
  getQuotes,
  updateQuoteStatus,
  uploadUrl,
  type QuoteRequest,
  type QuoteStatus,
} from "../../lib/adminApi";

function statusLabel(status: string) {
  return QUOTE_STATUSES.find((s) => s.value === status)?.label ?? status;
}

function statusClass(status: string) {
  switch (status) {
    case "new":
      return "bg-amber-100 text-amber-800";
    case "contacted":
      return "bg-sky-100 text-sky-800";
    case "quoted":
      return "bg-emerald-100 text-emerald-800";
    case "closed":
      return "bg-stone-200 text-stone-700";
    default:
      return "bg-stone-100 text-stone-700";
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminQuotesPage() {
  const navigate = useNavigate();
  const token = getAdminToken();
  const [filter, setFilter] = useState<QuoteStatus | "all">("all");
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    async function loadQuotes() {
      setLoading(true);
      setError(null);
      try {
        const data = await getQuotes(filter);
        if (cancelled) return;
        setQuotes(data);
        setSelectedId((current) => {
          if (current && data.some((q) => q.id === current)) return current;
          return data[0]?.id ?? null;
        });
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : "Không tải được dữ liệu";
        setError(message);
        if (message === "Unauthorized") {
          clearAdminToken();
          navigate("/admin", { replace: true });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadQuotes();

    return () => {
      cancelled = true;
    };
  }, [filter, navigate, token]);

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  const selected = quotes.find((q) => q.id === selectedId) ?? null;

  async function handleStatusChange(id: string, status: QuoteStatus) {
    setUpdatingId(id);
    setError(null);
    try {
      const updated = await updateQuoteStatus(id, status);
      setQuotes((prev) => prev.map((q) => (q.id === id ? updated : q)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cập nhật thất bại");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <AdminShell title="Yêu cầu báo giá">
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-sm ${
            filter === "all"
              ? "bg-amber-700 text-white"
              : "bg-white text-stone-700 border border-stone-200"
          }`}
        >
          Tất cả
        </button>
        {QUOTE_STATUSES.map((status) => (
          <button
            key={status.value}
            type="button"
            onClick={() => setFilter(status.value)}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === status.value
                ? "bg-amber-700 text-white"
                : "bg-white text-stone-700 border border-stone-200"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {loading && <p className="text-stone-500">Đang tải...</p>}

      {!loading && quotes.length === 0 && (
        <p className="text-stone-500">Chưa có yêu cầu báo giá nào.</p>
      )}

      {!loading && quotes.length > 0 && (
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-stone-50 text-left text-stone-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Khách hàng</th>
                    <th className="px-4 py-3 font-medium">SĐT</th>
                    <th className="px-4 py-3 font-medium">Trạng thái</th>
                    <th className="px-4 py-3 font-medium">Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr
                      key={quote.id}
                      onClick={() => setSelectedId(quote.id)}
                      className={`border-t border-stone-100 cursor-pointer hover:bg-amber-50/50 ${
                        selectedId === quote.id ? "bg-amber-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="text-stone-900">{quote.name}</div>
                        <div className="text-stone-500 text-xs">
                          {quote.email || "Không có email"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-stone-700">{quote.phone}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs ${statusClass(quote.status)}`}
                        >
                          {statusLabel(quote.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-stone-600 whitespace-nowrap">
                        {formatDate(quote.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="bg-white border border-stone-200 rounded-2xl p-6 h-fit">
            {selected ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-500 mb-1">
                    Chi tiết
                  </p>
                  <h2 className="text-xl text-stone-900">{selected.name}</h2>
                </div>

                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-stone-500">Số điện thoại</dt>
                    <dd>
                      <a
                        href={`tel:${selected.phone}`}
                        className="text-amber-700 hover:underline"
                      >
                        {selected.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Email</dt>
                    <dd>
                      {selected.email ? (
                        <a
                          href={`mailto:${selected.email}`}
                          className="text-amber-700 hover:underline"
                        >
                          {selected.email}
                        </a>
                      ) : (
                        <span className="text-stone-400">—</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Kích thước</dt>
                    <dd className="text-stone-800">{selected.dimensions || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Mô tả</dt>
                    <dd className="text-stone-800 whitespace-pre-wrap">
                      {selected.description}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">File đính kèm</dt>
                    <dd>
                      {selected.filePath ? (
                        <a
                          href={uploadUrl(selected.filePath) ?? "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-700 hover:underline"
                        >
                          Xem file
                        </a>
                      ) : (
                        <span className="text-stone-400">Không có</span>
                      )}
                    </dd>
                  </div>
                </dl>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm text-stone-700 mb-2"
                  >
                    Cập nhật trạng thái
                  </label>
                  <select
                    id="status"
                    value={selected.status}
                    disabled={updatingId === selected.id}
                    onChange={(e) =>
                      void handleStatusChange(
                        selected.id,
                        e.target.value as QuoteStatus,
                      )
                    }
                    className="w-full rounded-lg border border-stone-300 px-3 py-2"
                  >
                    {QUOTE_STATUSES.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  {updatingId === selected.id && (
                    <p className="text-xs text-stone-500 mt-2">Đang cập nhật...</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-stone-500">Chọn một yêu cầu để xem chi tiết.</p>
            )}
          </aside>
        </div>
      )}
    </AdminShell>
  );
}
