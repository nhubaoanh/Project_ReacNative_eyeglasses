import Role from "../types/role";
import User from "../types/user";
import apiService, { ApiResponse } from "./apiservice";

class UserService {
    async getAllUsers() : Promise<ApiResponse<User[]>> {
        return apiService.makeRequest<User[]>("/nhanvien")
    }

    async getUserById(id : number): Promise<ApiResponse<User>>{
        return apiService.makeRequest<User>(`/nhanvien/${id}`);
    }

    async createUser(user: User): Promise<ApiResponse<User[]>>{
        return apiService.makeRequest<User[]>("/nhanvien", {
            method: "POST",
            body: JSON.stringify(user),
        });
    }

    async getVaiTro(): Promise<ApiResponse<Role[]>>{
        return apiService.makeRequest<Role[]>("/vaitro");
    }

    async updateUser(id: number, UserData: User): Promise<ApiResponse<User>>{
        return apiService.makeRequest<User>(`/nhanvien/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(UserData),
        });
        }
    async deleteUser(id:number): Promise<ApiResponse<User[]>>{
        return apiService.makeRequest(`/nhanvien/${id}`, {
            method: "DELETE",
        });
    }

    async searchUsers(query: string): Promise<ApiResponse<User[]>>{
        return apiService.makeRequest<User[]>(
            `/nhanvien/search?q=${encodeURIComponent(query)}`
        );
    }
}

const userService = new UserService();
export default userService;