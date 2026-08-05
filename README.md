# 🪑 E-Furniture - High-End Furniture E-Commerce

Nền tảng thương mại điện tử đồ nội thất cao cấp được xây dựng với React, TypeScript và Tailwind CSS.

## ✨ Tính năng

- Trang chủ với Hero section và các section chính
- Catalog sản phẩm `/products` với lọc theo danh mục
- Trang chi tiết sản phẩm `/products/:slug`
- Form yêu cầu báo giá (API)
- Responsive design cho mọi thiết bị
- UI components tái sử dụng (shadcn/ui pattern)

## 🛠️ Tech Stack

- **React** 18.3.1 + **TypeScript**
- **Vite** 6.4.1
- **Tailwind CSS** 4.1.3
- **Radix UI** - UI components
- **Lucide React** - Icons

## 🚀 Quick Start

### Backend (API + SQLite)

```bash
cd backend
npm install
npm run db:setup
npm run dev
```

API chạy tại `http://localhost:4000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Ứng dụng chạy tại `http://localhost:3000`

## 🔌 API

| Method | Path | Mô tả |
|--------|------|-------|
| GET | `/api/health` | Health check |
| GET | `/api/products?popular=true` | Danh sách sản phẩm |
| GET | `/api/products/:idOrSlug` | Chi tiết sản phẩm |
| GET | `/api/categories` | Danh mục |
| POST | `/api/quotes` | Yêu cầu báo giá (multipart, field `file` tùy chọn) |
| GET | `/api/quotes` | Danh sách báo giá (**admin**, header `x-admin-token`) |
| GET | `/api/quotes/:id` | Chi tiết báo giá (**admin**) |
| PATCH | `/api/quotes/:id` | Cập nhật status (**admin**) |
| POST | `/api/contacts` | Form liên hệ |

### Admin báo giá

1. Mở `http://localhost:3000/admin`
2. Nhập token từ `backend/.env` → `ADMIN_TOKEN` (mặc định dev: `dev-admin-token`)
3. Quản lý tại `/admin/quotes` — lọc trạng thái, xem chi tiết, cập nhật `new` → `contacted` → `quoted` → `closed`


## 📁 Cấu trúc

```
backend/
├── prisma/           # Schema + seed
├── src/routes/       # products, categories, quotes, contacts
└── uploads/          # File đính kèm báo giá
frontend/
├── src/components/   # UI sections
├── src/lib/api.ts    # API client
└── App.tsx
```

## 📝 Scripts

**Backend:** `npm run dev` · `npm run db:setup` · `npm run db:seed`  
**Frontend:** `npm run dev` · `npm run build`

