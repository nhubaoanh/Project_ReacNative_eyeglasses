# Hướng dẫn gọi API Backend

## Khởi động Server

1. Cài đặt dependencies:
```bash
npm install
```

2. Khởi động server:
```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:8080`

## Các API Endpoints

### 1. Sản phẩm (Products)
- **GET** `/api/sanpham` - Lấy tất cả sản phẩm
- **GET** `/api/sanpham/:id` - Lấy sản phẩm theo ID
- **POST** `/api/sanpham` - Thêm sản phẩm mới
- **PUT** `/api/sanpham/:id` - Cập nhật sản phẩm
- **DELETE** `/api/sanpham/:id` - Xóa sản phẩm

### 2. Danh mục (Categories)
- **GET** `/api/danhmuc` - Lấy tất cả danh mục
- **GET** `/api/danhmuc/:id` - Lấy danh mục theo ID
- **POST** `/api/danhmuc` - Thêm danh mục mới
- **PUT** `/api/danhmuc/:id` - Cập nhật danh mục
- **DELETE** `/api/danhmuc/:id` - Xóa danh mục

### 3. Khách hàng (Customers)
- **GET** `/api/khachhang` - Lấy tất cả khách hàng
- **GET** `/api/khachhang/:id` - Lấy khách hàng theo ID
- **POST** `/api/khachhang` - Thêm khách hàng mới
- **PUT** `/api/khachhang/:id` - Cập nhật khách hàng
- **DELETE** `/api/khachhang/:id` - Xóa khách hàng

### 4. Hóa đơn (Orders)
- **GET** `/api/hoadon` - Lấy tất cả hóa đơn
- **GET** `/api/hoadon/:id` - Lấy hóa đơn theo ID
- **POST** `/api/hoadon` - Tạo hóa đơn mới
- **PUT** `/api/hoadon/:id` - Cập nhật hóa đơn
- **DELETE** `/api/hoadon/:id` - Xóa hóa đơn

### 5. Chi tiết hóa đơn (Order Details)
- **GET** `/api/hoadonchitiet` - Lấy tất cả chi tiết hóa đơn
- **GET** `/api/hoadonchitiet/:id` - Lấy chi tiết hóa đơn theo ID
- **POST** `/api/hoadonchitiet` - Thêm chi tiết hóa đơn
- **PUT** `/api/hoadonchitiet/:id` - Cập nhật chi tiết hóa đơn
- **DELETE** `/api/hoadonchitiet/:id` - Xóa chi tiết hóa đơn

## Cách gọi API từ Frontend

### Sử dụng Fetch API (JavaScript/TypeScript)

```javascript
// Lấy tất cả sản phẩm
const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/sanpham');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Lấy sản phẩm theo ID
const getProductById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/sanpham/${id}`);
    const data = await response.json();
    return data;
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
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Cập nhật sản phẩm
const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`http://localhost:8080/api/sanpham/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Xóa sản phẩm
const deleteProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/sanpham/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Sử dụng Axios

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Lấy tất cả sản phẩm
const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sanpham`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Thêm sản phẩm mới
const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sanpham`, productData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Sử dụng trong React Native

```javascript
// Trong React Native component
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sanpham');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.ten_sanpham}</Text>
            <Text>{item.gia}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ProductList;
```

## Test API

Bạn có thể sử dụng các công cụ sau để test API:

1. **Postman** - Import file `API_TESTS.postman_collection.json`
2. **Thunder Client** (VS Code extension)
3. **cURL** commands
4. **Browser** - Chỉ cho GET requests

## Lưu ý quan trọng

1. **CORS**: Server đã được cấu hình CORS để cho phép frontend gọi API
2. **Port**: Server chạy trên port 8080
3. **Content-Type**: Sử dụng `application/json` cho POST/PUT requests
4. **Error Handling**: Luôn xử lý lỗi khi gọi API
5. **Loading States**: Hiển thị trạng thái loading khi gọi API
