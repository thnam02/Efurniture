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

- **React** 18.3.1 + **TypeScript** + **Vite**
- **Express** + **Prisma** + **PostgreSQL**
- **Tailwind CSS** + **Radix UI**

## 🚀 Quick Start (local)

Postgres phải chạy trước (Docker hoặc local):

```bash
cd Efurniture
docker compose up db -d
```

### Backend

```bash
cd backend
cp .env.example .env   # lần đầu
npm install
npx prisma generate
npm run db:setup       # migrate + seed
npm run dev
```

API: `http://localhost:4000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:3000`

## 🚢 Deploy (Docker)

Từ thư mục `Efurniture`:

```bash
cp .env.example .env
# Sửa POSTGRES_PASSWORD, ADMIN_TOKEN, FRONTEND_ORIGIN (domain thật)

docker compose up --build -d
```

Mở `http://localhost:8080` (hoặc `WEB_PORT`).

- Admin: `/admin` — token = `ADMIN_TOKEN`
- API/health qua cùng origin: `/api/health`
- File upload lưu volume `uploads_data`
- Postgres lưu volume `postgres_data`

Seed chỉ chạy khi DB trống. Reset catalog: `FORCE_SEED=true` khi chạy `npm run db:seed`.

Production: đổi mật khẩu/token, set `FRONTEND_ORIGIN=https://your-domain`, trỏ DNS vào máy chạy Compose (port 80/8080).


## 🔌 API

| Method | Path | Mô tả |
|--------|------|-------|
| GET | `/api/health` | Health check |
| GET | `/api/products?popular=true` | Danh sách sản phẩm |
| GET | `/api/products/:idOrSlug` | Chi tiết sản phẩm |
| GET | `/api/categories` | Danh mục |
| POST | `/api/categories` | Tạo danh mục (**admin**) |
| PATCH | `/api/categories/:id` | Sửa danh mục (**admin**) |
| DELETE | `/api/categories/:id` | Xóa danh mục (**admin**, chỉ khi không còn sản phẩm) |
| POST | `/api/quotes` | Yêu cầu báo giá (multipart, field `file` tùy chọn) |
| GET | `/api/quotes` | Danh sách báo giá (**admin**, header `x-admin-token`) |
| GET | `/api/quotes/:id` | Chi tiết báo giá (**admin**) |
| PATCH | `/api/quotes/:id` | Cập nhật status (**admin**) |
| POST | `/api/products` | Tạo sản phẩm (**admin**) |
| PATCH | `/api/products/:id` | Sửa sản phẩm (**admin**) |
| DELETE | `/api/products/:id` | Xóa sản phẩm (**admin**) |
| POST | `/api/uploads` | Upload ảnh sản phẩm (**admin**, multipart `file`) |
| POST | `/api/contacts` | Form liên hệ |

### Admin

1. Mở `http://localhost:3000/admin`
2. Token: `ADMIN_TOKEN` trong `backend/.env` (dev: `dev-admin-token`)
3. `/admin/quotes` — quản lý báo giá  
4. `/admin/products` — thêm / sửa / xóa sản phẩm
5. `/admin/categories` — thêm / sửa / xóa danh mục


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

