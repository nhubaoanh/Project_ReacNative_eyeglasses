# 📱 ProductDetailScreen - Hướng dẫn sử dụng

## 🔄 Thay đổi từ Mock Data sang API thực

### **Trước (Mock Data):**
```typescript
// Sử dụng mock data từ mockProducts
const product: Product = productId 
  ? mockProducts.find(p => p.id === productId) || mockProducts[0]
  : mockProducts[0];
```

### **Sau (API thực):**
```typescript
// Fetch dữ liệu từ API
const [product, setProduct] = useState<ApiProduct | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (productId) {
    fetchProduct();
  }
}, [productId]);

const fetchProduct = async () => {
  const response = await apiService.getProductById(parseInt(productId || '1'));
  if (response.success && response.data) {
    setProduct(response.data);
  }
};
```

## 📊 Cấu trúc dữ liệu mới

### **API Product Interface:**
```typescript
interface ApiProduct {
  masp: number;           // Mã sản phẩm
  tensp: string;          // Tên sản phẩm
  maloai: number;         // Mã loại
  thuonghieu: string;     // Thương hiệu
  hinhanh: string;        // Hình ảnh
  gia: number;            // Giá
  mausac: string;         // Màu sắc
  kieudang: string;       // Kiểu dáng
  kichthuoc: string;      // Kích thước
  chatlieu: string;       // Chất liệu
}
```

## 🎨 UI Components được cập nhật

### **1. Image Gallery**
```typescript
// Trước: Multiple images với thumbnails
<Image source={{ uri: product.images[0] }} />
{product.images.map((image, index) => (...))}

// Sau: Single image từ API
<Image source={{ uri: product?.hinhanh || 'https://via.placeholder.com/300' }} />
```

### **2. Product Info**
```typescript
// Trước: Mock data structure
<Text>{product.brand}</Text>
<Text>{product.name}</Text>
<Text>{formatPrice(product.price)}</Text>

// Sau: API data structure
<Text>{product?.thuonghieu || 'Thương hiệu'}</Text>
<Text>{product?.tensp || 'Tên sản phẩm'}</Text>
<Text>{formatPrice(product?.gia || 0)}</Text>
```

### **3. Color Selection**
```typescript
// Trước: Multiple colors array
{product.colors.map((color) => (...))}

// Sau: Single color từ API
<TouchableOpacity onPress={() => setSelectedColor(product?.mausac || '')}>
  <Text>{product?.mausac || 'Mặc định'}</Text>
</TouchableOpacity>
```

### **4. Storage/Size Selection**
```typescript
// Trước: Multiple storage options
{product.storage.map((storage) => (...))}

// Sau: Single size từ API
<TouchableOpacity onPress={() => setSelectedStorage(product?.kichthuoc || '')}>
  <Text>{product?.kichthuoc || 'Mặc định'}</Text>
</TouchableOpacity>
```

### **5. Specifications**
```typescript
// Trước: Complex nested specifications
{product.specifications.frame.size}
{product.specifications.lenses.coating}

// Sau: Simple flat structure từ API
<Text>Mã sản phẩm: {product?.masp}</Text>
<Text>Thương hiệu: {product?.thuonghieu}</Text>
<Text>Màu sắc: {product?.mausac}</Text>
<Text>Kiểu dáng: {product?.kieudang}</Text>
<Text>Kích thước: {product?.kichthuoc}</Text>
<Text>Chất liệu: {product?.chatlieu}</Text>
```

## 🔄 Loading & Error States

### **Loading State:**
```typescript
if (loading) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Đang tải thông tin sản phẩm...</Text>
      </View>
    </SafeAreaView>
  );
}
```

### **Error State:**
```typescript
if (error || !product) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Không tìm thấy sản phẩm'}</Text>
        <Button title="Thử lại" onPress={fetchProduct} />
      </View>
    </SafeAreaView>
  );
}
```

## 🚀 Cách sử dụng

### **1. Navigation từ HomeScreen:**
```typescript
const handleProductPress = (productId: string) => {
  router.push({ pathname: "/product/[id]", params: { id: productId } });
};
```

### **2. Route Configuration:**
```typescript
// app/product/[id].tsx
const { id } = useLocalSearchParams<{ id: string }>();
return <ProductDetailScreen productId={id} />;
```

### **3. API Call:**
```typescript
// Tự động gọi API khi component mount
useEffect(() => {
  if (productId) {
    fetchProduct();
  }
}, [productId]);
```

## 🎯 Tính năng mới

### ✅ **Real-time Data**
- Dữ liệu thực từ database
- Tự động cập nhật khi có thay đổi

### ✅ **Loading States**
- Hiển thị loading khi đang fetch data
- UX tốt hơn cho người dùng

### ✅ **Error Handling**
- Xử lý lỗi network
- Nút retry khi có lỗi
- Thông báo lỗi rõ ràng

### ✅ **Type Safety**
- TypeScript với type checking
- IntelliSense hoàn chỉnh

### ✅ **Fallback Values**
- Default values khi data null/undefined
- Placeholder images
- Graceful degradation

## 🔧 Troubleshooting

### **Lỗi không hiển thị dữ liệu:**
1. Kiểm tra API endpoint có hoạt động không
2. Kiểm tra productId có được truyền đúng không
3. Kiểm tra console logs để debug

### **Lỗi hình ảnh không load:**
1. Kiểm tra URL hình ảnh có hợp lệ không
2. Sử dụng placeholder image làm fallback
3. Kiểm tra network connection

### **Lỗi API call:**
1. Kiểm tra backend có chạy không
2. Kiểm tra CORS configuration
3. Kiểm tra database connection

## 📋 Checklist Migration

- [x] Cập nhật imports (apiService, ApiProduct)
- [x] Thay thế mock data bằng API calls
- [x] Cập nhật UI components để sử dụng API data
- [x] Thêm loading states
- [x] Thêm error handling
- [x] Cập nhật specifications display
- [x] Thêm fallback values
- [x] Test navigation flow
- [x] Test error scenarios

## 🚀 Bước tiếp theo

1. **Thêm multiple images** - Khi API support multiple images
2. **Thêm reviews/ratings** - Khi có API cho đánh giá
3. **Thêm related products** - Sản phẩm liên quan
4. **Thêm wishlist** - Yêu thích sản phẩm
5. **Thêm share functionality** - Chia sẻ sản phẩm
6. **Thêm zoom images** - Zoom hình ảnh
7. **Thêm video support** - Video sản phẩm
