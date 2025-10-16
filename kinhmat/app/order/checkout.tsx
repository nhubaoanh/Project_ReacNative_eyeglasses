import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import apiService from "@/src/service/apiService";
import { Sizes } from "@/constants/sizes";
import { Colors } from "@/constants/colors";
import { useCart } from "@/src/context/CartContext";


interface Product {
  masp: number;
  tensp: string;
  gia: number;
  hinhanh?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

type PaymentMethod = "COD" | "QR";

export default function CheckoutScreen() {
  const { cartItems, totalPrice, totalItems } = useLocalSearchParams();
  const items: CartItem[] = cartItems ? JSON.parse(cartItems as string) : [];

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");

  const { clearCart } = useCart(); // <-- lấy clearCart từ context

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  const handleCheckout = async () => {
    if (!customerName || !phone || !address) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const ngaydat_mysql = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const tongtien_val = Number(totalPrice) || 0;

    const orderItems = items.map((item) => ({
      masp: item.product.masp,
      dongia: Number(item.product.gia),
      soluong: item.quantity,
    }));

    try {
      const response = await apiService.createOrder({
        makh: 1,
        madh: 1,
        ngaydat: ngaydat_mysql,
        diachi_giao: address,
        items: orderItems,
        matrangthai: 1,
        tongtien: tongtien_val,
        paymentMethod: paymentMethod,
      });
      console.log("Order Response:", response);

      if (response.success) {
        Alert.alert("Thành công", "Đặt hàng thành công!");
        clearCart();
        router.back();
      } else {
        Alert.alert("Lỗi", response.error || "Không thể đặt hàng.");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đặt hàng.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Thông tin người nhận */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>
          <TextInput
            placeholder="Họ và tên"
            style={styles.input}
            value={customerName}
            onChangeText={setCustomerName}
          />
          <TextInput
            placeholder="Số điện thoại"
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            placeholder="Địa chỉ giao hàng"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Danh sách sản phẩm */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản phẩm</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              {item.product.hinhanh ? (
                <Image
                  source={{ uri: item.product.hinhanh }}
                  style={styles.productImage}
                />
              ) : (
                <View style={[styles.productImage, styles.placeholderImage]}>
                  <Text>Ảnh</Text>
                </View>
              )}
              <View style={styles.itemDetails}>
                <Text style={styles.productName}>{item.product.tensp}</Text>
                <Text>Số lượng: {item.quantity}</Text>
                <Text>Giá: {formatCurrency(item.product.gia)}</Text>
                <Text style={styles.itemTotal}>
                  Thành tiền: {formatCurrency(item.product.gia * item.quantity)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Phương thức thanh toán */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "COD" && styles.paymentOptionActive,
              ]}
              onPress={() => setPaymentMethod("COD")}
            >
              <Text
                style={[
                  styles.paymentText,
                  paymentMethod === "COD" && styles.paymentTextActive,
                ]}
              >
                Thanh toán khi nhận hàng (COD)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "QR" && styles.paymentOptionActive,
              ]}
              onPress={() => setPaymentMethod("QR")}
            >
              <Text
                style={[
                  styles.paymentText,
                  paymentMethod === "QR" && styles.paymentTextActive,
                ]}
              >
                QR Code
              </Text>
            </TouchableOpacity>
          </View>

          {paymentMethod === "QR" && (
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <QRCode
                value={`Chuyen khoan ${totalPrice} VND toi STK 3010200411111`}
                size={180}
              />
              <Text style={{ marginTop: 8, fontWeight: "500" }}>
                Quét mã để thanh toán: {formatCurrency(Number(totalPrice) || 0)}
              </Text>
            </View>
          )}
        </View>

        {/* Tổng kết đơn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tổng kết đơn hàng</Text>
          <View style={styles.summaryRow}>
            <Text>Tổng sản phẩm</Text>
            <Text>{totalItems}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Tạm tính</Text>
            <Text>{formatCurrency(Number(totalPrice) || 0)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(Number(totalPrice) || 0)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Nút thanh toán cố định */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>
            Đặt hàng - {formatCurrency(Number(totalPrice) || 0)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  container: { flex: 1, padding: 12 },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#f8f9fa",
  },
  placeholderImage: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  itemDetails: { flex: 1 },
  productName: { fontSize: 15, fontWeight: "500", marginBottom: 5 },
  itemTotal: { color: "#e74c3c", marginTop: 5, fontWeight: "bold" },
  paymentMethods: { flexDirection: "row", justifyContent: "space-between" },
  paymentOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    alignItems: "center",
  },
  paymentOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: "#eaf6ff",
  },
  paymentText: { fontSize: 14, color: "#333" },
  paymentTextActive: { color: Colors.primary, fontWeight: "bold" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: { fontWeight: "bold", fontSize: 15 },
  totalValue: { fontWeight: "bold", fontSize: 16, color: "#e74c3c" },
  footer: {
    backgroundColor: "#fff",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
