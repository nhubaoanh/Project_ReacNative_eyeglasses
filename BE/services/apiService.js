// API Service - Quản lý tất cả API calls
const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Generic request method
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const defaultOptions = {
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
            return { success: false, error: error.message };
        }
    }

    // Health Check
    async healthCheck() {
        return this.makeRequest('/health');
    }

    // ===== SẢN PHẨM (PRODUCTS) =====
    async getAllProducts() {
        return this.makeRequest('/sanpham');
    }

    async getProductById(id) {
        return this.makeRequest(`/sanpham/${id}`);
    }

    async createProduct(productData) {
        return this.makeRequest('/sanpham', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    }

    async updateProduct(id, productData) {
        return this.makeRequest(`/sanpham/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    }

    async deleteProduct(id) {
        return this.makeRequest(`/sanpham/${id}`, {
            method: 'DELETE'
        });
    }

    // ===== DANH MỤC (CATEGORIES) =====
    async getAllCategories() {
        return this.makeRequest('/danhmuc');
    }

    async getCategoryById(id) {
        return this.makeRequest(`/danhmuc/${id}`);
    }

    async createCategory(categoryData) {
        return this.makeRequest('/danhmuc', {
            method: 'POST',
            body: JSON.stringify(categoryData)
        });
    }

    async updateCategory(id, categoryData) {
        return this.makeRequest(`/danhmuc/${id}`, {
            method: 'PUT',
            body: JSON.stringify(categoryData)
        });
    }

    async deleteCategory(id) {
        return this.makeRequest(`/danhmuc/${id}`, {
            method: 'DELETE'
        });
    }

    // ===== KHÁCH HÀNG (CUSTOMERS) =====
    async getAllCustomers() {
        return this.makeRequest('/khachhang');
    }

    async getCustomerById(id) {
        return this.makeRequest(`/khachhang/${id}`);
    }

    async createCustomer(customerData) {
        return this.makeRequest('/khachhang', {
            method: 'POST',
            body: JSON.stringify(customerData)
        });
    }

    async updateCustomer(id, customerData) {
        return this.makeRequest(`/khachhang/${id}`, {
            method: 'PUT',
            body: JSON.stringify(customerData)
        });
    }

    async deleteCustomer(id) {
        return this.makeRequest(`/khachhang/${id}`, {
            method: 'DELETE'
        });
    }

    // ===== HÓA ĐƠN (ORDERS) =====
    async getAllOrders() {
        return this.makeRequest('/hoadon');
    }

    async getOrderById(id) {
        return this.makeRequest(`/hoadon/${id}`);
    }

    async createOrder(orderData) {
        return this.makeRequest('/hoadon', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    }

    async updateOrder(id, orderData) {
        return this.makeRequest(`/hoadon/${id}`, {
            method: 'PUT',
            body: JSON.stringify(orderData)
        });
    }

    async deleteOrder(id) {
        return this.makeRequest(`/hoadon/${id}`, {
            method: 'DELETE'
        });
    }

    // ===== CHI TIẾT HÓA ĐƠN (ORDER DETAILS) =====
    async getAllOrderDetails() {
        return this.makeRequest('/hoadonchitiet');
    }

    async getOrderDetailById(id) {
        return this.makeRequest(`/hoadonchitiet/${id}`);
    }

    async createOrderDetail(orderDetailData) {
        return this.makeRequest('/hoadonchitiet', {
            method: 'POST',
            body: JSON.stringify(orderDetailData)
        });
    }

    async updateOrderDetail(id, orderDetailData) {
        return this.makeRequest(`/hoadonchitiet/${id}`, {
            method: 'PUT',
            body: JSON.stringify(orderDetailData)
        });
    }

    async deleteOrderDetail(id) {
        return this.makeRequest(`/hoadonchitiet/${id}`, {
            method: 'DELETE'
        });
    }

    // ===== NHÂN VIÊN (EMPLOYEES) =====
    async getAllEmployees() {
        return this.makeRequest('/nhanvien');
    }

    async getEmployeeById(id) {
        return this.makeRequest(`/nhanvien/${id}`);
    }

    async createEmployee(employeeData) {
        return this.makeRequest('/nhanvien', {
            method: 'POST',
            body: JSON.stringify(employeeData)
        });
    }

    async updateEmployee(id, employeeData) {
        return this.makeRequest(`/nhanvien/${id}`, {
            method: 'PUT',
            body: JSON.stringify(employeeData)
        });
    }

    async deleteEmployee(id) {
        return this.makeRequest(`/nhanvien/${id}`, {
            method: 'DELETE'
        });
    }

    // ===== NHÀ CUNG CẤP (SUPPLIERS) =====
    async getAllSuppliers() {
        return this.makeRequest('/nhacungcap');
    }

    async getSupplierById(id) {
        return this.makeRequest(`/nhacungcap/${id}`);
    }

    async createSupplier(supplierData) {
        return this.makeRequest('/nhacungcap', {
            method: 'POST',
            body: JSON.stringify(supplierData)
        });
    }

    async updateSupplier(id, supplierData) {
        return this.makeRequest(`/nhacungcap/${id}`, {
            method: 'PUT',
            body: JSON.stringify(supplierData)
        });
    }

    async deleteSupplier(id) {
        return this.makeRequest(`/nhacungcap/${id}`, {
            method: 'DELETE'
        });
    }

    // ===== KHO (WAREHOUSE) =====
    async getAllWarehouses() {
        return this.makeRequest('/kho');
    }

    async getWarehouseById(id) {
        return this.makeRequest(`/kho/${id}`);
    }

    async createWarehouse(warehouseData) {
        return this.makeRequest('/kho', {
            method: 'POST',
            body: JSON.stringify(warehouseData)
        });
    }

    async updateWarehouse(id, warehouseData) {
        return this.makeRequest(`/kho/${id}`, {
            method: 'PUT',
            body: JSON.stringify(warehouseData)
        });
    }

    async deleteWarehouse(id) {
        return this.makeRequest(`/kho/${id}`, {
            method: 'DELETE'
        });
    }

    // ===== MÀU SẮC (COLORS) =====
    async getAllColors() {
        return this.makeRequest('/mausac');
    }

    async getColorById(id) {
        return this.makeRequest(`/mausac/${id}`);
    }

    // ===== KÍCH CỠ (SIZES) =====
    async getAllSizes() {
        return this.makeRequest('/kichco');
    }

    async getSizeById(id) {
        return this.makeRequest(`/kichco/${id}`);
    }

    // ===== CHẤT LIỆU (MATERIALS) =====
    async getAllMaterials() {
        return this.makeRequest('/chatlieu');
    }

    async getMaterialById(id) {
        return this.makeRequest(`/chatlieu/${id}`);
    }

    // ===== KIỂU DÁNG (STYLES) =====
    async getAllStyles() {
        return this.makeRequest('/kieudang');
    }

    async getStyleById(id) {
        return this.makeRequest(`/kieudang/${id}`);
    }

    // ===== THƯƠNG HIỆU (BRANDS) =====
    async getAllBrands() {
        return this.makeRequest('/thuonghieu');
    }

    async getBrandById(id) {
        return this.makeRequest(`/thuonghieu/${id}`);
    }

    // ===== XUẤT XỨ (ORIGINS) =====
    async getAllOrigins() {
        return this.makeRequest('/xuatxu');
    }

    async getOriginById(id) {
        return this.makeRequest(`/xuatxu/${id}`);
    }

    // ===== ĐÁNH GIÁ (REVIEWS) =====
    async getAllReviews() {
        return this.makeRequest('/danhgia');
    }

    async getReviewById(id) {
        return this.makeRequest(`/danhgia/${id}`);
    }

    // ===== PHIẾU KIỂM KÊ (INVENTORY) =====
    async getAllInventories() {
        return this.makeRequest('/phieukiemke');
    }

    async getInventoryById(id) {
        return this.makeRequest(`/phieukiemke/${id}`);
    }

    // ===== ADMIN =====
    async getAllAdmins() {
        return this.makeRequest('/admin');
    }

    async getAdminById(id) {
        return this.makeRequest(`/admin/${id}`);
    }

    // ===== USER SESSION =====
    async getAllUserSessions() {
        return this.makeRequest('/usersession');
    }

    async getUserSessionById(id) {
        return this.makeRequest(`/usersession/${id}`);
    }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;
