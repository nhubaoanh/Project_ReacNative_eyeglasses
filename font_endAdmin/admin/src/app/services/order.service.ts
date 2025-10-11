import Order from "../types/order";
import apiService, { ApiResponse } from "./apiservice";

class OrderService {
  async getOrders(): Promise<Order[]> {
    // 🟢 thêm await để lấy dữ liệu thực sự, không phải Promise
    const res = await apiService.makeRequest<ApiResponse<Order[]>>("/orders");

    // 🟢 vì API trả về dạng { success: true, data: [...] }
    const orders = res?.data?.data ?? [];
    return orders;
  }
}

const orderService = new OrderService();
export default orderService;
