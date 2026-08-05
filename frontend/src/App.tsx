import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminQuotesPage } from "./pages/admin/AdminQuotesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<AdminLoginPage />} />
        <Route path="admin/quotes" element={<AdminQuotesPage />} />

        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
