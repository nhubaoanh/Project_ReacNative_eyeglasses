import User from "../types/user";
import apiService, { ApiResponse } from "./apiservice";

class UserService {
    async getAllUsers() : Promise<ApiResponse<User[]>> {
        return apiService.makeRequest<User[]>("/nhanvien")
    }
}

const userService = new UserService();
export default userService;