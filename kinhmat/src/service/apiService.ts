// API Service - Quản lý tất cả API calls
const API_BASE_URL = 'http://192.168.1.73:8080/api';

// Định nghĩa types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface Product {
  id?: number;
  ten_sanpham: string;
  gia?: number;
  mo_ta?: string;
  model?: string;
}

interface Category {
  id?: number;
  ten_danhmuc: string;
  mo_ta?: string;
}

interface Customer {
  id?: number;
  ten_khachhang: string;
  email?: string;
  sdt?: string;
}

interface Order {
  id?: number;
  ngay_tao?: string;
  tong_tien?: number;
  trang_thai?: string;
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
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

  async createProduct(productData: Product): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>('/sanpham', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  }

  async updateProduct(id: number, productData: Product): Promise<ApiResponse<Product>> {
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
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;

// Export types for use in other files
export type { ApiResponse, Category, Customer, Order, Product };

