// import AsyncStorage from "@react-native-async-storage/async-storage";

// interface UserStorageItem {
//   userId: number;
//   token: string;
//   email: string;
// }

// export const userStorage = {
//   async addUser(userId: number, token: string, email: string) {
//     const user: UserStorageItem = { userId, token, email };

//     // Lưu riêng từng user
//     await AsyncStorage.setItem(`user_${userId}`, JSON.stringify(user));

//     // Lấy tất cả user hiện có
//     const allUsers: UserStorageItem[] = await userStorage.getAllUsers();

//     // Kiểm tra xem user này đã tồn tại chưa
//     const exists = allUsers.some((u: UserStorageItem) => u.userId === userId);

//     if (!exists) {
//       allUsers.push(user);
//       await AsyncStorage.setItem("users", JSON.stringify(allUsers));
//     }

//     // Ghi nhớ người dùng hiện tại
//     await AsyncStorage.setItem("currentUserId", userId.toString());
//   },

//   async getAllUsers(): Promise<UserStorageItem[]> {
//     const users = await AsyncStorage.getItem("users");
//     return users ? JSON.parse(users) : [];
//   },

//   async getCurrentUser(): Promise<UserStorageItem | null> {
//     const currentId = await AsyncStorage.getItem("currentUserId");
//     if (!currentId) return null;
//     const user = await AsyncStorage.getItem(`user_${currentId}`);
//     return user ? JSON.parse(user) : null;
//   },

//   async switchUser(userId: number) {
//     await AsyncStorage.setItem("currentUserId", userId.toString());
//   },

//   async clearUser(userId: number) {
//     await AsyncStorage.removeItem(`user_${userId}`);
//     const users: UserStorageItem[] = await userStorage.getAllUsers();
//     const updated = users.filter((u: UserStorageItem) => u.userId !== userId);
//     await AsyncStorage.setItem("users", JSON.stringify(updated));
//   },

//   async clearAll() {
//     await AsyncStorage.clear();
//   },
// };



import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserStorageItem {
  userId: number;
  username: string;
  token: string;
  email?: string;
}

export const userStorage = {
  // 🔹 Lấy tất cả user
  async getAllUsers(): Promise<UserStorageItem[]> {
    const json = await AsyncStorage.getItem("users");
    return json ? JSON.parse(json) : [];
  },

  // 🔹 Thêm hoặc cập nhật user
  async addUser(
    userId: number,
    token: string,
    username: string,
    email?: string
  ) {
    const users = await this.getAllUsers();
    const updated = users.filter((u) => u.userId !== userId);
    updated.push({ userId, username, token, email });
    await AsyncStorage.setItem("users", JSON.stringify(updated));

    // 🔹 Đặt user này là người đang đăng nhập hiện tại
    await AsyncStorage.setItem("currentUserId", String(userId));
  },

  // 🔹 Lấy user hiện tại (đang đăng nhập)
  async getCurrentUser(): Promise<UserStorageItem | null> {
    const currentUserId = await AsyncStorage.getItem("currentUserId");
    if (!currentUserId) return null;
    const users = await this.getAllUsers();
    return users.find((u) => u.userId === Number(currentUserId)) || null;
  },

  // 🔹 Đặt user hiện tại thủ công (khi cần chuyển user)
  async setCurrentUser(userId: number) {
    await AsyncStorage.setItem("currentUserId", String(userId));
  },

  // 🔹 Xóa 1 user
  async clearUser(userId: number) {
    const users = await this.getAllUsers();
    const updated = users.filter((u) => u.userId !== userId);
    await AsyncStorage.setItem("users", JSON.stringify(updated));

    const currentUserId = await AsyncStorage.getItem("currentUserId");
    if (currentUserId && Number(currentUserId) === userId) {
      await AsyncStorage.removeItem("currentUserId"); // Xóa trạng thái đăng nhập
    }
  },

  // 🔹 Đăng xuất (xoá người dùng hiện tại, nhưng vẫn giữ danh sách user)
  async logout() {
    await AsyncStorage.removeItem("currentUserId");
    console.log("Đăng xuat thanh cong");
  },

  // 🔹 Xoá tất cả user (nếu cần reset app)
  async clearAll() {
    await AsyncStorage.removeItem("users");
    await AsyncStorage.removeItem("currentUserId");
  },
};

