# 🍜 BeoVan – Fullstack Web Application

Ứng dụng web fullstack sử dụng **ReactJS** (Frontend) và **Node.js + Express + MySQL** (Backend).
backend:https://github.com/beovan/Backend-nodejs-Booking-care
---

## 📁 Cấu trúc dự án

```
beovan/
├── frontend/          # ReactJS App
└── backend/           # Node.js Express API
```

---

## ⚙️ Công nghệ sử dụng

| Layer     | Công nghệ                                                            |
|-----------|----------------------------------------------------------------------|
| Frontend  | ReactJS 17, Redux, React Router, Bootstrap 5, SCSS, React Intl       |
| Backend   | Node.js, Express 4, Sequelize 6, MySQL2, JWT, Nodemailer, Babel      |
| Database  | MySQL                                                                |
| Thanh toán| VNPay                                                                |

---

## 🖥️ FRONTEND

### Yêu cầu
- Node.js >= 12
- npm >= 6

### Cài đặt

```bash
cd frontend
npm install
```

### Cấu hình môi trường

Tạo file `.env` tại thư mục `frontend/` dựa trên `.env.example`:

```env
PORT=3000
NODE_ENV=development
REACT_APP_BACKEND_URL=http://localhost:8080
REACT_APP_ROUTER_BASE_NAME=

# VNPay (nếu dùng tính năng thanh toán)
VNP_TMN_CODE=
VNP_SECURE_SECRET=
VNPAY_HOST=
HASH_ALGORITHM_VNPAY=
```

### Chạy môi trường development

```bash
npm start
```

Ứng dụng chạy tại: [http://localhost:3000](http://localhost:3000)

### Build production

```bash
npm run build
```

Output tại thư mục `build/`.

---

## 🛠️ BACKEND

### Yêu cầu
- Node.js >= 12
- npm >= 6
- MySQL đang chạy

### Cài đặt

```bash
cd backend
npm install
```

### Cấu hình database

Sửa file `src/config/config.js` với thông tin kết nối MySQL của bạn:

```json
{
  "development": {
    "username": "root",
    "password": "your_password",
    "database": "beovan_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Cấu hình Sequelize

File `.sequelizerc` đã được thiết lập sẵn:

```js
const path = require('path');
module.exports = {
  'config':           path.resolve('./src/config', 'config.js'),
  'migrations-path':  path.resolve('./src', 'migrations'),
  'models-path':      path.resolve('./src', 'models'),
  'seeders-path':     path.resolve('./src', 'seeders')
};
```

### Migrate database

```bash
# Chạy migrations để tạo bảng
npx sequelize-cli db:migrate

# (Tuỳ chọn) Chạy seeders để thêm dữ liệu mẫu
npx sequelize-cli db:seed:all
```

### Chạy môi trường development

```bash
npm start
```

Server chạy tại: [http://localhost:8080](http://localhost:8080)

### Build & chạy production

```bash
npm run build-src   # Compile Babel sang thư mục build/
npm run build       # Chạy file đã build
```

---

## 🗄️ Các lệnh Sequelize thường dùng

```bash
# Tạo model mới
npx sequelize-cli model:generate --name TenModel --attributes field1:string,field2:integer

# Chạy migration
npx sequelize-cli db:migrate

# Rollback migration gần nhất
npx sequelize-cli db:migrate:undo

# Tạo seeder
npx sequelize-cli seed:generate --name ten-seeder

# Chạy tất cả seeder
npx sequelize-cli db:seed:all
```

---

## 🚀 Khởi chạy toàn bộ dự án

Mở **2 terminal** và chạy song song:

```bash
# Terminal 1 – Backend
cd backend && npm start

# Terminal 2 – Frontend
cd frontend && npm start
```

Frontend tự động kết nối với backend qua biến `REACT_APP_BACKEND_URL`.

---

## 📦 Các thư viện chính

### Frontend
| Thư viện | Mục đích |
|---|---|
| `react-redux` + `redux-thunk` | Quản lý state |
| `react-router-dom` | Điều hướng |
| `axios` | Gọi API |
| `react-intl` | Đa ngôn ngữ (i18n) |
| `react-toastify` | Thông báo |
| `react-bootstrap` + `reactstrap` | UI components |
| `firebase` | Firebase services |
| `vnpay` | Tích hợp thanh toán VNPay |

### Backend
| Thư viện | Mục đích |
|---|---|
| `express` | HTTP server |
| `sequelize` + `mysql2` | ORM + kết nối MySQL |
| `jsonwebtoken` | Xác thực JWT |
| `bcryptjs` | Mã hóa mật khẩu |
| `nodemailer` | Gửi email |
| `cors` | Cấu hình CORS |
| `dotenv` | Biến môi trường |

---

## 📝 Lưu ý

- Đảm bảo MySQL đang chạy trước khi khởi động backend.
- File `.env` **không được** commit lên Git (đã có trong `.gitignore`).
- Script `eject` trong frontend có lỗi đánh máy (`resact-scripts`) — không sử dụng lệnh này.
