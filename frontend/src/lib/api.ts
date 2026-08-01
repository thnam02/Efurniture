const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceFrom: number;
  imageUrl: string;
  popular: boolean;
  category: Category;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, init);
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.error || `Request failed (${response.status})`);
  }

  return body as T;
}

export function formatPriceVnd(priceFrom: number) {
  return new Intl.NumberFormat("vi-VN").format(priceFrom);
}

export async function getProducts(params?: { popular?: boolean; category?: string }) {
  const query = new URLSearchParams();
  if (params?.popular) query.set("popular", "true");
  if (params?.category) query.set("category", params.category);
  const suffix = query.toString() ? `?${query}` : "";
  const result = await request<{ data: Product[] }>(`/products${suffix}`);
  return result.data;
}

export async function getCategories() {
  const result = await request<{ data: Category[] }>("/categories");
  return result.data;
}

export async function submitQuote(formData: FormData) {
  return request<{ message: string }>("/quotes", {
    method: "POST",
    body: formData,
  });
}

export async function submitContact(payload: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  return request<{ message: string }>("/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
