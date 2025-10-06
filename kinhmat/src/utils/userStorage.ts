import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserStorageItem {
  userId: number;
  token: string;
  email: string;
}

export const userStorage = {
  async addUser(userId: number, token: string, email: string) {
    const user: UserStorageItem = { userId, token, email };

    // Lưu riêng từng user
    await AsyncStorage.setItem(`user_${userId}`, JSON.stringify(user));

    // Lấy tất cả user hiện có
    const allUsers: UserStorageItem[] = await userStorage.getAllUsers();

    // Kiểm tra xem user này đã tồn tại chưa
    const exists = allUsers.some((u: UserStorageItem) => u.userId === userId);

    if (!exists) {
      allUsers.push(user);
      await AsyncStorage.setItem("users", JSON.stringify(allUsers));
    }

    // Ghi nhớ người dùng hiện tại
    await AsyncStorage.setItem("currentUserId", userId.toString());
  },

  async getAllUsers(): Promise<UserStorageItem[]> {
    const users = await AsyncStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  },

  async getCurrentUser(): Promise<UserStorageItem | null> {
    const currentId = await AsyncStorage.getItem("currentUserId");
    if (!currentId) return null;
    const user = await AsyncStorage.getItem(`user_${currentId}`);
    return user ? JSON.parse(user) : null;
  },

  async switchUser(userId: number) {
    await AsyncStorage.setItem("currentUserId", userId.toString());
  },

  async clearUser(userId: number) {
    await AsyncStorage.removeItem(`user_${userId}`);
    const users: UserStorageItem[] = await userStorage.getAllUsers();
    const updated = users.filter((u: UserStorageItem) => u.userId !== userId);
    await AsyncStorage.setItem("users", JSON.stringify(updated));
  },

  async clearAll() {
    await AsyncStorage.clear();
  },
};
