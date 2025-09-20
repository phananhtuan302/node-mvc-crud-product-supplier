# Node.js MVC CRUD - Supplier & Product

Dự án web CRUD đơn giản cho **nhà cung cấp (Supplier)** và **sản phẩm (Product)**  
được xây dựng bằng **Node.js, Express, MongoDB, Mongoose** theo kiến trúc **MVC**.

## 🚀 Chức năng
- Quản lý **Nhà cung cấp**
  - Thêm, sửa, xóa, xem danh sách
- Quản lý **Sản phẩm**
  - Thêm, sửa, xóa, xem danh sách
  - Liên kết với nhà cung cấp

## 🛠️ Công nghệ sử dụng
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/) (template engine)

## ⚙️ Cài đặt & chạy dự án

### 1. Clone repo
```bash
git clone https://github.com/<username>/node-mvc-crud-product-supplier.git
cd node-mvc-crud-product-supplier
2. Cài đặt dependencies
bash
Sao chép mã
npm install
3. Tạo file .env
env
Sao chép mã
MONGO_URI=mongodb://127.0.0.1:27017/mvc_crud
PORT=3000
4. Chạy project
bash
Sao chép mã
npm start
Truy cập: http://localhost:3000/suppliers
hoặc http://localhost:3000/products

📂 Cấu trúc thư mục
arduino
Sao chép mã
node-mvc-crud-product-supplier/
│── app.js
│── .env
│── .gitignore
│── models/
│   ├── Supplier.js
│   └── Product.js
│── controllers/
│   ├── supplierController.js
│   └── productController.js
│── routes/
│   ├── supplierRoutes.js
│   └── productRoutes.js
│── views/
│   ├── suppliers/
│   └── products/
└── public/
✨ Tác giả
Phan Anh Tuấn 🎓 – Trường ĐH Công nghiệp