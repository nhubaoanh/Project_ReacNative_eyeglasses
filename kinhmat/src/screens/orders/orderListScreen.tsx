import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import apiService, { Order } from "@/src/service/apiService";
// import ExpoImage from "expo-image";
import { Image as ExpoImage } from "expo-image";

// import ExpoImage from "expo-image/build/ExpoImage";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React from 'react';

interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  color: string;
  storage: string;
}

// interface order {
//   id: string;
//   orderNumber: string;
//   orderDate: Date;
//   status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
//   totalAmount: number;
//   items: OrderItem[];
//   shippingAddress: string;
//   paymentMethod: string;
// }

// interface OrderListScreenProps {
//   onBack: () => void;
//   onOrderDetail: (order: order) => void;
// }

// export const OrderListScreen: React.FC<OrderListScreenProps> = ({
//   onBack,
//   onOrderDetail,
// }) => {
//   const [selectedStatus, setSelectedStatus] = useState<string>('all');

//   // call api lên 
//   const [orders, setOrders] = useState<Order[]>([]);

//   const fetchData = async () => {
//     apiService.getAllOrders()
//     const orderres = await apiService.getAllOrders();
//     if(orderres.success && orderres.data){
//       setOrders(orderres.data);
//     }
//   }


//   



//   const getStatusInfo = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return { text: 'Chờ xác nhận', color: Colors.warning, icon: '⏳' };
//       case 'confirmed':
//         return { text: 'Đã xác nhận', color: Colors.primary, icon: '✅' };
//       case 'shipping':
//         return { text: 'Đang giao', color: Colors.secondary, icon: '🚚' };
//       case 'delivered':
//         return { text: 'Đã giao', color: Colors.success, icon: '📦' };
//       case 'cancelled':
//         return { text: 'Đã hủy', color: Colors.error, icon: '❌' };
//       default:
//         return { text: 'Không xác định', color: Colors.gray, icon: '❓' };
//     }
//   };

//   const getFilteredOrders = () => {
//     if (selectedStatus === 'all') return orders;
//     return orders.filter(order => order.status === selectedStatus);
//   };

// };
export default function OrderListScreen() {

  // call api lấy danh sách đơn hàng
  const[orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    fetchOrders();
  },[]);
  
  // const fetchOrders = async () => {
  //   const response = await apiService.getAllOrders();
  //   console.log("orders response:", response);
  //   console.log("orders response:", response.data);
  //   console.log("orders:", JSON.stringify(response.data, null, 2));


  //   if (response.success && Array.isArray(response.data)) {
  //     setOrders(response.data);
  //   } else {
  //     setOrders([]); // fallback
  //   }
  // }
  const fetchOrders = async () => {
    const list = await apiService.getAllOrders();
    setOrders(list);
  };


  const statuses = [
    { key: 'all', label: 'Tất cả' },
    { key: 'pending', label: 'Chờ xác nhận' },
    { key: 'confirmed', label: 'Đã xác nhận' },
    { key: 'shipping', label: 'Đang giao' },
    { key: 'delivered', label: 'Đã giao' },
    { key: 'cancelled', label: 'Đã hủy' },
  ];
  
    // chuyen doi gia
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    };

// chuyển đổi ngày từ string -> Date rồi format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString); 
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // const getImageSource = () => {
  //   const imageUrl = apiService.getImageUrl()
  // }

  // render header 
  const renderHeader = () => {
    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>
          Danh sách đơn hàng
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {statuses.map(item => (
            <TouchableOpacity key={item.key} style={styles.textStatus}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  // render danh sách đơn hàng

  const renderOrderList = () => {
  console.log("orders in render:", orders);
  return (
    <ScrollView>
     {orders.map(order => (
        <View key={order.madh} style={styles.content}>
          <Text style={styles.title}>Mã hóa đơn: {order.madh}</Text>
          <Text>Ngày đặt: {formatDate(order.ngaydat)}</Text>
          <Text>Tổng tiền: {formatPrice(Number(order.tongtien))}</Text>
          <Text>Địa chỉ giao: {order.diachi_giao}</Text>
          <Text>Trạng thái: {order.matrangthai}</Text>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "700" }}>Sản phẩm:</Text>
            {order.items?.map(item => (
              <View key={item.masp} style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                <ExpoImage
                  source={{ uri: apiService.getImageUrl(item.hinhanh) }}
                  style={{ width: 50, height: 50, marginRight: 10 }}
                />
                <View>
                  <Text>{item.tensp}</Text>
                  <Text>Số lượng: {item.soluong}</Text>
                  <Text>Đơn giá: {formatPrice(Number(item.dongia))}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}

    </ScrollView>
  );
};



    
  
  
  return( 
    <View>
      {renderHeader()}
      {renderOrderList()}
    </View>
  )
}

const styles = StyleSheet.create({
  textStatus: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Sizes.md,
    paddingVertical: Sizes.sm,
    marginRight: Sizes.sm,
    borderRadius: Sizes.radiusMd,
    borderWidth: 1,
    borderColor: Colors.border,
  }, content : {
    padding: Sizes.lg
  }, title: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    borderRadius: Sizes.radiusMd,
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginBottom: Sizes.lg
  }, contentName: {
    fontSize: 15,
    color: Colors.primaryDark,
    marginBottom: Sizes.sm,
    fontWeight: '600',
  }
});