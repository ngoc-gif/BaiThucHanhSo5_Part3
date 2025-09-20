# BaiThucHanhSo5_Part3
# Supplier-Product App

Ứng dụng quản lý Nhà cung cấp và Sản phẩm (Node/Express/MongoDB/EJS).

## Tính năng
- Đăng ký, đăng nhập, đăng xuất (session + cookie).
- CRUD Nhà cung cấp (name, address, phone).
- CRUD Sản phẩm (name, price, quantity, supplier).
- Giao diện dùng Bootstrap.
- Tìm kiếm sản phẩm theo tên và lọc theo nhà cung cấp.
- Swagger UI tại `/api-docs` mô tả REST API.
- Cấu hình qua `.env`.

## Cài đặt
1. Clone repo
2. Tạo `.env` (xem `.env.example`)
3. `npm install`
4. `npm run dev` (hoặc `npm start`)

## Lưu ý
Không commit `node_modules` và `.env`.
