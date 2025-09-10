
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"customers" | "products" | "nhacungcap"| null>(null);

  return (
    <View style={styles.container}>
      {/* Thanh nút chọn */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.button, activeTab === "customers" && styles.activeButton]}
          onPress={() => setActiveTab("customers")}
        >
          <Text style={styles.buttonText}>Khách hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeTab === "products" && styles.activeButton]}
          onPress={() => setActiveTab("products")}
        >
          <Text style={styles.buttonText}>Sản phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeTab === "nhacungcap" && styles.activeButton]}
          onPress={() => setActiveTab("nhacungcap")}
        >
          <Text style={styles.buttonText}>Nhà cung cấp</Text>
        </TouchableOpacity>
        

        <TouchableOpacity
          style={[styles.button, activeTab === null && styles.activeButton]}
          onPress={() => setActiveTab(null)}
        >
          <Text style={styles.buttonText}>Ẩn</Text>
        </TouchableOpacity>
      </View>

      {/* Khu vực hiển thị nội dung */}
      <View style={styles.content}>
        {/* {activeTab === "customers" && <AdminCustomerList />}
        {activeTab === "products" && <AdminProductList />}
        {activeTab === "nhacungcap" && <AdminSupplierList />} */}
        {activeTab === null && (
          <Text style={{ textAlign: "center", marginTop: 20 }}>Chọn 1 thẻ để hiển thị</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  menu: { flexDirection: "row", marginBottom: 10, gap: 10 },
  button: {
    padding: 10,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: "#2563eb",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  content: { flex: 1, marginTop: 10 },
});
