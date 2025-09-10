// API Service - Quản lý tất cả API calls
const API_BASE_URL = 'http://192.168.0.102:7890/api';

// Định nghĩa types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface Product {
  masp?: number;          // Mã sản phẩm
  tensp: string;         // Tên sản phẩm
  maloai: number;        // Mã loại
  thuonghieu: string;    // Thương hiệu
  hinhanh: string;       // Hình ảnh
  gia: number;           // Giá
  mausac: string;        // Màu sắc
  kieudang: string;      // Kiểu dáng
  kichthuoc: string;     // Kích thước
  chatlieu: string;      // Chất liệu
}

interface Category {
  id?: number;
  ten_danhmuc: string;
  mo_ta?: string;
}

interface Customer {
  makh?: number;
  hoten: string;
  email?: string;
  sdt?: string;
}

interface Order {
  id?: number;
  ngay_tao?: string;
  tong_tien?: number;
  trang_thai?: string;
}

interface Supplier {
  mancc?: number;
  tenncc: string;
  diachi?: string;
  sdt?: string;
  email?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, {
        ...defaultOptions,
        ...options
      });

      const text = await response.text();
      if (!response.ok) {
        // try parse error payload if json
        try {
          const errJson = JSON.parse(text);
          return { success: false, error: errJson?.error || `HTTP ${response.status}` };
        } catch {
          return { success: false, error: `HTTP ${response.status}` };
        }
      }

      try {
        const data = text ? JSON.parse(text) : undefined;
        return { success: true, data } as ApiResponse<T>;
      } catch {
        return { success: false, error: 'Invalid JSON response' };
      }
    } catch (error) {
      console.error('API Request Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Health Check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.makeRequest('/health');
  }

  // ===== SẢN PHẨM (PRODUCTS) =====
  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    return this.makeRequest<Product[]>('/sanpham');
  }

  async getProductById(id: number): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>(`/sanpham/${id}`);
  }

  // async getNewProducts(): Promise<ApiResponse<Product[]>> {
  //   return this.makeRequest<Product[]>('/sanpham/new');
  // }

  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    return this.makeRequest<Product[]>('/sanpham/kieudang');
  }

  async getProductsByCategory(categoryId: number): Promise<ApiResponse<Product[]>> {
    return this.makeRequest<Product[]>(`/sanpham/category/${categoryId}`);
  }

  async createProduct(productData: Product): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>('/sanpham', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  }

  async updateProduct(id: number, productData: Product & { imageBase64?: string }): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>(`/sanpham/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  }

  async deleteProduct(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/sanpham/${id}`, {
      method: 'DELETE'
    });
  }

  // ===== DANH MỤC (CATEGORIES) =====
  async getAllCategories(): Promise<ApiResponse<Category[]>> {
    return this.makeRequest<Category[]>('/danhmuc');
  }

  async getCategoryById(id: number): Promise<ApiResponse<Category>> {
    return this.makeRequest<Category>(`/danhmuc/${id}`);
  }

  async createCategory(categoryData: Category): Promise<ApiResponse<Category>> {
    return this.makeRequest<Category>('/danhmuc', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    });
  }

  async updateCategory(id: number, categoryData: Category): Promise<ApiResponse<Category>> {
    return this.makeRequest<Category>(`/danhmuc/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData)
    });
  }

  async deleteCategory(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/danhmuc/${id}`, {
      method: 'DELETE'
    });
  }

  // ===== KHÁCH HÀNG (CUSTOMERS) =====
  async getAllCustomers(): Promise<ApiResponse<Customer[]>> {
    return this.makeRequest<Customer[]>('/khachhang');
  }

  async getCustomerById(id: number): Promise<ApiResponse<Customer>> {
    return this.makeRequest<Customer>(`/khachhang/${id}`);
  }

  async createCustomer(customerData: Customer): Promise<ApiResponse<Customer>> {
    return this.makeRequest<Customer>('/khachhang', {
      method: 'POST',
      body: JSON.stringify(customerData)
    });
  }

  async updateCustomer(id: number, customerData: Customer): Promise<ApiResponse<Customer>> {
    return this.makeRequest<Customer>(`/khachhang/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customerData)
    });
  }

  async deleteCustomer(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/khachhang/${id}`, {
      method: 'DELETE'
    });
  }

  // ===== HÓA ĐƠN (ORDERS) =====
  async getAllOrders(): Promise<ApiResponse<Order[]>> {
    return this.makeRequest<Order[]>('/hoadon');
  }

  async getOrderById(id: number): Promise<ApiResponse<Order>> {
    return this.makeRequest<Order>(`/hoadon/${id}`);
  }

  async createOrder(orderData: Order): Promise<ApiResponse<Order>> {
    return this.makeRequest<Order>('/hoadon', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  async updateOrder(id: number, orderData: Order): Promise<ApiResponse<Order>> {
    return this.makeRequest<Order>(`/hoadon/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData)
    });
  }

  async deleteOrder(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/hoadon/${id}`, {
      method: 'DELETE'
    });
  }

  // ===== NHÀ CUNG CẤP (SUPPLIERS) =====
  async getAllSuppliers(): Promise<ApiResponse<Supplier[]>> {
    return this.makeRequest<Supplier[]>('/nhacungcap');
  }

  async getSupplierById(id: number): Promise<ApiResponse<Supplier>> {
    return this.makeRequest<Supplier>(`/nhacungcap/${id}`);
  }

  async createSupplier(supplierData: Supplier): Promise<ApiResponse<Supplier>> {
    return this.makeRequest<Supplier>('/nhacungcap', {
      method: 'POST',
      body: JSON.stringify(supplierData)
    });
  }

  async updateSupplier(id: number, supplierData: Supplier): Promise<ApiResponse<Supplier>> {
    return this.makeRequest<Supplier>(`/nhacungcap/${id}`, {
      method: 'PUT',
      body: JSON.stringify(supplierData)
    });
  }

  async deleteSupplier(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/nhacungcap/${id}`, {
      method: 'DELETE'
    });
  }

  // ===== UPLOAD ẢNH =====
  async convertImageToBase64(imageUri: string): Promise<string> {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  }

  async uploadImage(imageUri: string): Promise<ApiResponse<any>> {
    try {
      // Convert image to base64
      const base64Image = await this.convertImageToBase64(imageUri);
      
      const response = await fetch(`${this.baseURL}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64Image
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Upload Image Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async uploadAndUpdateProduct(productId: number, imageUri: string): Promise<ApiResponse<Product>> {
    try {
      console.log('Starting uploadAndUpdateProduct for product:', productId);
      
      // Convert image to base64
      const base64Image = await this.convertImageToBase64(imageUri);
      console.log('Image converted to base64, length:', base64Image.length);
      
      // Get current product data
      const productResult = await this.getProductById(productId);
      if (!productResult.success || !productResult.data) {
        return { success: false, error: 'Failed to get product data' };
      }

      console.log('Current product data:', productResult.data);
      console.log('Current hinhanh field:', productResult.data.hinhanh);

      // Send image to backend and get the image path
      const uploadResponse = await fetch(`${this.baseURL}/sanpham/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productResult.data,
          imageBase64: base64Image
        })
      });

      console.log('Upload response status:', uploadResponse.status);
      console.log('Upload response headers:', uploadResponse.headers);

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('Upload error response:', errorText);
        return { success: false, error: `Upload failed: ${errorText}` };
      }

      const responseText = await uploadResponse.text();
      console.log('Raw backend response:', responseText);

      let backendResponse;
      try {
        backendResponse = JSON.parse(responseText);
        console.log('Parsed backend response:', backendResponse);
        console.log('Updated hinhanh field from backend:', backendResponse?.hinhanh);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        return { success: false, error: 'Invalid JSON response from server' };
      }

      // Backend returns {success, message, hinhanh}, but we need to return the updated product
      if (backendResponse.success && backendResponse.hinhanh) {
        // Update the product data with the new image path
        const updatedProduct = {
          ...productResult.data,
          hinhanh: backendResponse.hinhanh
        };
        
        console.log('Final updated product:', updatedProduct);
        return { success: true, data: updatedProduct };
      } else {
        return { success: false, error: backendResponse.message || 'Upload failed' };
      }
    } catch (error) {
      console.error('Upload Product Image Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Helper method để tạo full URL cho ảnh
  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    
    // Nếu đã là full URL thì return luôn
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Nếu là relative path thì tạo full URL
    return `${this.baseURL.replace('/api', '')}${imagePath}`;
  }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;

// Export types for use in other files
export type { ApiResponse, Category, Customer, Order, Product, Supplier };

