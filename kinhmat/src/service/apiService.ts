
import { Category } from "../types/category";
import Customer from "../types/customer";
import { Order, OrderItem } from "../types/order";
import Product from "../types/product";
import { Supplier } from "../types/supplier";

const API_BASE_URL = process.env.EXPO_PUBLIC_URL_API || 'http://localhost:7890/api';

// Định nghĩa types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    // console.log("=== API REQUEST ===");
    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
      });

      const text = await response.text();

      if (!response.ok) {
        console.error("Response not OK:", response.status);
        // try parse error payload if json
        try {
          const errJson = JSON.parse(text);
          console.error("Error JSON:", errJson);
          return {
            success: false,
            error: errJson?.error || `HTTP ${response.status}`,
          };
        } catch {
          return { success: false, error: `HTTP ${response.status}` };
        }
      }

      try {
        const data = text ? JSON.parse(text) : undefined;
        return { success: true, data } as ApiResponse<T>;
      } catch {
        console.error("Failed to parse JSON response");
        return { success: false, error: "Invalid JSON response" };
      }
    } catch (error) {
      console.error("API Request Error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Health Check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.makeRequest("/health");
  }


  // ===== ĐĂNG NHẬP (LOGIN) =====
  async login(email: string, matkhau: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseURL}/vaitro/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, matkhau }),
      });

      const text = await response.text();

      if (!response.ok) {
        try {
          const errJson = JSON.parse(text);
          return {
            success: false,
            error: errJson?.error || `HTTP ${response.status}`,
          };
        } catch {
          return { success: false, error: `HTTP ${response.status}` };
        }
      }

      const data = text ? JSON.parse(text) : undefined;
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // ===== SẢN PHẨM (PRODUCTS) =====
  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    return this.makeRequest<Product[]>("/sanpham");
  }

  async getProductById(id: number): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>(`/sanpham/${id}`);
  }

  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    return this.makeRequest<Product[]>("/sanpham/kieudang");
  }

  async getProductsByCategory(
    categoryId: number
  ): Promise<ApiResponse<Product[]>> {
    return this.makeRequest<Product[]>(`/sanpham/category/${categoryId}`);
  }

  async createProduct(productData: Product): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>("/sanpham", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(
    id: number,
    productData: Product & { imageBase64?: string }
  ): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>(`/sanpham/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/sanpham/${id}`, {
      method: "DELETE",
    });
  }

  // ===== DANH MỤC (CATEGORIES) =====
  async getAllCategories(): Promise<ApiResponse<Category[]>> {
    return this.makeRequest<Category[]>("/danhmuc");
  }

  async getCategoryById(id: number): Promise<ApiResponse<Category>> {
    return this.makeRequest<Category>(`/danhmuc/${id}`);
  }

  async createCategory(categoryData: Category): Promise<ApiResponse<Category>> {
    return this.makeRequest<Category>("/danhmuc", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(
    id: number,
    categoryData: Category
  ): Promise<ApiResponse<Category>> {
    return this.makeRequest<Category>(`/danhmuc/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/danhmuc/${id}`, {
      method: "DELETE",
    });
  }

  // ===== KHÁCH HÀNG (CUSTOMERS) =====
  async getAllCustomers(): Promise<ApiResponse<Customer[]>> {
    return this.makeRequest<Customer[]>("/khachhang");
  }

  async getCustomerById(id: number): Promise<ApiResponse<Customer>> {
    return this.makeRequest<Customer>(`/khachhang/${id}`);
  }

  async createCustomer(customerData: Customer): Promise<ApiResponse<Customer>> {
    return this.makeRequest<Customer>("/khachhang", {
      method: "POST",
      body: JSON.stringify(customerData),
    });
  }

  async updateCustomer(
    id: number,
    customerData: Customer
  ): Promise<ApiResponse<Customer>> {
    return this.makeRequest<Customer>(`/khachhang/${id}`, {
      method: "PUT",
      body: JSON.stringify(customerData),
    });
  }

  async deleteCustomer(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/khachhang/${id}`, {
      method: "DELETE",
    });
  }

  async getAllOrders(): Promise<Order[]> {
    const res = await this.makeRequest<any>("/orders");
    return res.data?.data ?? []; // chỉ return mảng orders
  }

  async getOrderById(id: number): Promise<ApiResponse<Order>> {
    return this.makeRequest<Order>(`/orders/${id}`);
  }

  async createOrder(orderData: Order): Promise<ApiResponse<Order>> {
    return this.makeRequest<Order>("/orders/create", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }
  async updateOrder(id: number, orderData: Order): Promise<ApiResponse<Order>> {
    return this.makeRequest<Order>(`/hoadon/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderData),
    });
  }

  async deleteOrder(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/hoadon/${id}`, {
      method: "DELETE",
    });
  }

  // ===== NHÀ CUNG CẤP (SUPPLIERS) =====
  async getAllSuppliers(): Promise<ApiResponse<Supplier[]>> {
    return this.makeRequest<Supplier[]>("/nhacungcap");
  }

  async getSupplierById(id: number): Promise<ApiResponse<Supplier>> {
    return this.makeRequest<Supplier>(`/nhacungcap/${id}`);
  }

  async createSupplier(supplierData: Supplier): Promise<ApiResponse<Supplier>> {
    return this.makeRequest<Supplier>("/nhacungcap", {
      method: "POST",
      body: JSON.stringify(supplierData),
    });
  }

  async updateSupplier(
    id: number,
    supplierData: Supplier
  ): Promise<ApiResponse<Supplier>> {
    return this.makeRequest<Supplier>(`/nhacungcap/${id}`, {
      method: "PUT",
      body: JSON.stringify(supplierData),
    });
  }

  async deleteSupplier(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/nhacungcap/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== Cập nhật hình ảnh sản phẩm=====================
  async updateProductImage(
    id: number,
    data: { imageUri: string }
  ): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>(`/sanpham/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Helper method để tạo full URL cho ảnh
  getImageUrl(imagePath: string): string {
    if (!imagePath) return "";

    // Nếu đã là full URL thì return luôn
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Nếu là relative path thì tạo full URL
    return `${this.baseURL.replace("/api", "")}${imagePath}`;
  }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;

// Export types for use in other files
export type { ApiResponse, Category, Customer, Order, Product, Supplier };

