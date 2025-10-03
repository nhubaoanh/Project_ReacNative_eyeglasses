import Product from "../types/product";
import apiService, {ApiResponse} from "./apiservice";

class ProductService {
  // Lấy tất cả sản phẩm
  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    return apiService.makeRequest<Product[]>("/sanpham");
  }

  // Lấy sản phẩm theo ID
  async getProductById(id: number): Promise<ApiResponse<Product>> {
    return apiService.makeRequest<Product>(`/sanpham/${id}`);
  }

  // Lấy sản phẩm nổi bật
  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    return apiService.makeRequest<Product[]>("/sanpham/featured");
  }

  // Tạo sản phẩm mới
  async createProduct(productData: Product): Promise<ApiResponse<Product[]>> {
    return apiService.makeRequest<Product[]>("/sanpham", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  // Cập nhật sản phẩm
  async updateProduct(
    id: number,
    productData: Product
  ): Promise<ApiResponse<Product>> {
    return apiService.makeRequest<Product>(`/sanpham/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
  }

  // Xóa sản phẩm
  async deleteProduct(id: number): Promise<ApiResponse<Product[]>> {
    return apiService.makeRequest(`/sanpham/${id}`, {
      method: "DELETE",
    });
  }

  // Tìm kiếm sản phẩm
  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return apiService.makeRequest<Product[]>(
      `/sanpham/search?q=${encodeURIComponent(query)}`
    );
  }

  async updateProductImage(
    id: number,
    imageUrl: string
  ): Promise<ApiResponse<Product>> {
    return apiService.makeRequest<Product>(`/sanpham/${id}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON đúng kiểu
      },
      body: JSON.stringify({ hinhanh: imageUrl }),
    });
  }

}

// Export singleton instance
const productService = new ProductService();
export default productService;
