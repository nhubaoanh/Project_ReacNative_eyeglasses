# 🕶️ Backend API - Hệ thống Quản lý Kính Mắt

## 📋 Mô tả

Backend API cho hệ thống quản lý cửa hàng kính mắt, được xây dựng với Express.js và Vite.

## 🚀 Cài đặt và Khởi động

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Khởi động server
```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:8080`

## 📚 Cấu trúc Dự án

```
BE/
├── app.ts                 # File chính khởi động server
├── vite.config.ts         # Cấu hình Vite
├── package.json           # Dependencies và scripts
├── routes/               # Định nghĩa routes
│   ├── sanpham.routes.js
│   ├── danhmuc.routes.js
│   ├── khachhang.routes.js
│   └── ...
├── controllers/          # Logic xử lý
│   ├── sanpham.controller.js
│   ├── danhmuc.controller.js
│   └── ...
├── models/              # Models database
├── services/            # API service cho frontend
│   └── apiService.js
├── examples/            # Ví dụ sử dụng
│   └── ReactNativeExample.js
├── API_GUIDE.md         # Hướng dẫn chi tiết API
├── test-api.html        # File test API
└── README.md           # File này
```

## 🔗 API Endpoints

### Health Check
- `GET /api/health` - Kiểm tra trạng thái server

### Sản phẩm (Products)
- `GET /api/sanpham` - Lấy tất cả sản phẩm
- `GET /api/sanpham/:id` - Lấy sản phẩm theo ID
- `POST /api/sanpham` - Thêm sản phẩm mới
- `PUT /api/sanpham/:id` - Cập nhật sản phẩm
- `DELETE /api/sanpham/:id` - Xóa sản phẩm

### Danh mục (Categories)
- `GET /api/danhmuc` - Lấy tất cả danh mục
- `GET /api/danhmuc/:id` - Lấy danh mục theo ID
- `POST /api/danhmuc` - Thêm danh mục mới
- `PUT /api/danhmuc/:id` - Cập nhật danh mục
- `DELETE /api/danhmuc/:id` - Xóa danh mục

### Khách hàng (Customers)
- `GET /api/khachhang` - Lấy tất cả khách hàng
- `GET /api/khachhang/:id` - Lấy khách hàng theo ID
- `POST /api/khachhang` - Thêm khách hàng mới
- `PUT /api/khachhang/:id` - Cập nhật khách hàng
- `DELETE /api/khachhang/:id` - Xóa khách hàng

### Hóa đơn (Orders)
- `GET /api/hoadon` - Lấy tất cả hóa đơn
- `GET /api/hoadon/:id` - Lấy hóa đơn theo ID
- `POST /api/hoadon` - Tạo hóa đơn mới
- `PUT /api/hoadon/:id` - Cập nhật hóa đơn
- `DELETE /api/hoadon/:id` - Xóa hóa đơn

### Chi tiết hóa đơn (Order Details)
- `GET /api/hoadonchitiet` - Lấy tất cả chi tiết hóa đơn
- `GET /api/hoadonchitiet/:id` - Lấy chi tiết hóa đơn theo ID
- `POST /api/hoadonchitiet` - Thêm chi tiết hóa đơn
- `PUT /api/hoadonchitiet/:id` - Cập nhật chi tiết hóa đơn
- `DELETE /api/hoadonchitiet/:id` - Xóa chi tiết hóa đơn

### Và nhiều endpoints khác...
- Nhân viên, Nhà cung cấp, Kho, Màu sắc, Kích cỡ, Chất liệu, Kiểu dáng, Thương hiệu, Xuất xứ, Đánh giá, Phiếu kiểm kê, Admin, User Session

## 🧪 Test API

### 1. Sử dụng file HTML test
Mở file `test-api.html` trong trình duyệt để test các API endpoints.

### 2. Sử dụng Postman
Import các endpoints vào Postman để test.

### 3. Sử dụng cURL
```bash
# Test health check
curl http://localhost:8080/api/health

# Lấy tất cả sản phẩm
curl http://localhost:8080/api/sanpham

# Thêm sản phẩm mới
curl -X POST http://localhost:8080/api/sanpham \
  -H "Content-Type: application/json" \
  -d '{"ten_sanpham":"Kính mắt Ray-Ban","gia":1500000,"mo_ta":"Kính mắt thời trang"}'
```

## 💻 Sử dụng trong Frontend

### 1. Sử dụng API Service (Khuyến nghị)
```javascript
import apiService from './services/apiService';

// Lấy tất cả sản phẩm
const getProducts = async () => {
  const result = await apiService.getAllProducts();
  if (result.success) {
    console.log(result.data);
  }
};

// Thêm sản phẩm mới
const addProduct = async (productData) => {
  const result = await apiService.createProduct(productData);
  if (result.success) {
    console.log('Thêm thành công');
  }
};
```

### 2. Sử dụng Fetch API
```javascript
// Lấy tất cả sản phẩm
const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/sanpham');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Thêm sản phẩm mới
const addProduct = async (productData) => {
  try {
    const response = await fetch('http://localhost:8080/api/sanpham', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### 3. Sử dụng Axios
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Lấy tất cả sản phẩm
const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sanpham`);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 📱 Sử dụng trong React Native

Xem file `examples/ReactNativeExample.js` để có ví dụ đầy đủ về cách sử dụng API trong React Native.

## 🔧 Cấu hình

### CORS
Server đã được cấu hình CORS để cho phép frontend gọi API từ các domain khác.

### Port
Mặc định server chạy trên port 8080. Có thể thay đổi trong `vite.config.ts`.

## 📖 Tài liệu chi tiết

Xem file `API_GUIDE.md` để có hướng dẫn chi tiết về cách sử dụng API.

## 🐛 Troubleshooting

### 1. Server không khởi động
- Kiểm tra port 8080 có đang được sử dụng không
- Chạy `npm install` để cài đặt dependencies

### 2. CORS error
- Server đã được cấu hình CORS, kiểm tra lại URL frontend

### 3. API không trả về dữ liệu
- Kiểm tra kết nối database
- Kiểm tra logs trong console

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. Console logs
2. Network tab trong DevTools
3. File `API_GUIDE.md` để có thêm thông tin

## 📄 License

MIT License
