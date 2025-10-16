import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Lấy params
import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";

interface Order {
  id: number;
  date: string;
  total: number;
  status: string;
}

const MyOrdersScreen = () => {
  const { orders: ordersJson } = useLocalSearchParams();
  const orders: Order[] = ordersJson ? JSON.parse(ordersJson as string) : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Đơn hàng của tôi</Text>
        <Text>Chưa có đơn hàng nào.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Đơn hàng của tôi ({orders.length})</Text>
      <ScrollView>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.orderId}>Đơn hàng #{order.id}</Text>
            <Text>Ngày: {order.date}</Text>
            <Text>Tổng: {formatPrice(order.total)}</Text>
            <Text style={styles.status}>Trạng thái: {order.status}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Sizes.screenPadding,
  },
  title: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: "600",
    marginBottom: Sizes.md,
  },
  orderCard: {
    backgroundColor: Colors.surface,
    padding: Sizes.md,
    marginBottom: Sizes.sm,
    borderRadius: Sizes.radiusMd,
  },
  orderId: { fontWeight: "700", color: Colors.primary },
  status: { color: Colors.success }, // Giả sử có Colors.success
});

export default MyOrdersScreen;
