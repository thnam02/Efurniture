const API_BASE = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:4000/api" : "/api");
const UPLOADS_BASE =
  import.meta.env.VITE_UPLOADS_URL ?? (import.meta.env.DEV ? "http://localhost:4000" : "");

const ADMIN_TOKEN_KEY = "efurniture_admin_token";

export type QuoteStatus = "new" | "contacted" | "quoted" | "closed";

export type QuoteRequest = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  description: string;
  dimensions: string | null;
  filePath: string | null;
  status: string;
  createdAt: string;
};

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  _count?: { products: number };
};

export type CategoryInput = {
  name: string;
  slug?: string;
  imageUrl?: string | null;
};

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceFrom: number;
  imageUrl: string;
  popular: boolean;
  categoryId: string;
  category: AdminCategory;
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = {
  name: string;
  slug?: string;
  description?: string | null;
  priceFrom: number;
  imageUrl: string;
  popular: boolean;
  categoryId: string;
};

export const QUOTE_STATUSES: { value: QuoteStatus; label: string }[] = [
  { value: "new", label: "Mới" },
  { value: "contacted", label: "Đã liên hệ" },
  { value: "quoted", label: "Đã báo giá" },
  { value: "closed", label: "Đã đóng" },
];

export function getAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function uploadUrl(filePath: string | null) {
  if (!filePath) return null;
  if (filePath.startsWith("http")) return filePath;
  return `${UPLOADS_BASE}${filePath}`;
}

async function adminRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAdminToken();
  const headers = new Headers(init?.headers);
  if (token) headers.set("x-admin-token", token);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.error || `Request failed (${response.status})`);
  }

  return body as T;
}

export async function verifyAdminToken(token: string) {
  const response = await fetch(`${API_BASE}/quotes`, {
    headers: { "x-admin-token": token },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || "Token không hợp lệ");
  }
  return body as { data: QuoteRequest[] };
}

export async function getQuotes(status?: QuoteStatus | "all") {
  const query =
    status && status !== "all" ? `?status=${encodeURIComponent(status)}` : "";
  const result = await adminRequest<{ data: QuoteRequest[] }>(`/quotes${query}`);
  return result.data;
}

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  const result = await adminRequest<{ data: QuoteRequest; message: string }>(
    `/quotes/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
  );
  return result.data;
}

export async function getAdminCategories() {
  const result = await adminRequest<{ data: AdminCategory[] }>("/categories");
  return result.data;
}

export async function createCategory(input: CategoryInput) {
  const result = await adminRequest<{ data: AdminCategory; message: string }>(
    "/categories",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
  return result.data;
}

export async function updateCategory(id: string, input: Partial<CategoryInput>) {
  const result = await adminRequest<{ data: AdminCategory; message: string }>(
    `/categories/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
  );
  return result.data;
}

export async function deleteCategory(id: string) {
  return adminRequest<{ message: string }>(`/categories/${id}`, {
    method: "DELETE",
  });
}

export async function getAdminProducts(params?: { category?: string }) {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  const suffix = query.toString() ? `?${query}` : "";
  const result = await adminRequest<{ data: AdminProduct[] }>(`/products${suffix}`);
  return result.data;
}

export async function createProduct(input: ProductInput) {
  const result = await adminRequest<{ data: AdminProduct; message: string }>(
    "/products",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
  return result.data;
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  const result = await adminRequest<{ data: AdminProduct; message: string }>(
    `/products/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
  );
  return result.data;
}

export async function deleteProduct(id: string) {
  return adminRequest<{ message: string }>(`/products/${id}`, {
    method: "DELETE",
  });
}

export async function uploadProductImage(file: File) {
  const token = getAdminToken();
  const formData = new FormData();
  formData.append("file", file);

  const headers = new Headers();
  if (token) headers.set("x-admin-token", token);

  const response = await fetch(`${API_BASE}/uploads`, {
    method: "POST",
    headers,
    body: formData,
  });
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.error || `Upload failed (${response.status})`);
  }

  return (body as { data: { url: string } }).data.url;
}
