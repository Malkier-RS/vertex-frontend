import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import { RequireAuth } from './components/layout/RequireAuth.jsx';
import { ScrollToTop } from './components/layout/ScrollToTop.jsx';

import { HomePage } from './pages/HomePage.jsx';
import { ShopPage } from './pages/ShopPage.jsx';
import { ProductDetailPage } from './pages/ProductDetailPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { DistributionPage } from './pages/DistributionPage.jsx';
import { BlogListPage } from './pages/BlogListPage.jsx';
import { BlogDetailPage } from './pages/BlogDetailPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { AccountPage } from './pages/AccountPage.jsx';
import { OrdersPage } from './pages/OrdersPage.jsx';
import { OrderDetailPage } from './pages/OrderDetailPage.jsx';
import { CartPage } from './pages/CartPage.jsx';

import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.jsx';
import { AdminProductsPage } from './pages/admin/AdminProductsPage.jsx';
import { AdminProductEditorPage } from './pages/admin/AdminProductEditorPage.jsx';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage.jsx';
import { AdminBrandsPage } from './pages/admin/AdminBrandsPage.jsx';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage.jsx';
import { AdminCustomerDetailPage } from './pages/admin/AdminCustomerDetailPage.jsx';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage.jsx';
import { AdminOrderDetailPage } from './pages/admin/AdminOrderDetailPage.jsx';
import { AdminBlogPage } from './pages/admin/AdminBlogPage.jsx';

import './styles/app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:slug" element={<ProductDetailPage />} />
              <Route path="/categories/:slug" element={<ShopPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/distribution-logistics" element={<DistributionPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<RequireAuth />}>
                <Route path="/account" element={<AccountPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:id" element={<OrderDetailPage />} />
                <Route path="/korpa" element={<CartPage />} />
              </Route>
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="products/new" element={<AdminProductEditorPage key="product-new" />} />
              <Route path="products/:id/edit" element={<AdminProductEditorPage key="product-edit" />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="brands" element={<AdminBrandsPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="customers/:id" element={<AdminCustomerDetailPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="orders/:id" element={<AdminOrderDetailPage />} />
              <Route path="blog" element={<AdminBlogPage />} />
              <Route path="blog/new" element={<AdminBlogPage />} />
              <Route path="blog/:id/edit" element={<AdminBlogPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

