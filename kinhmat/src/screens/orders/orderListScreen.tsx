import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button } from '../../components/ui/Button';

interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  color: string;
  storage: string;
}

interface Order {
  id: string;
  orderNumber: string;
  orderDate: Date;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

interface OrderListScreenProps {
  onBack: () => void;
  onOrderDetail: (order: Order) => void;
}

export const OrderListScreen: React.FC<OrderListScreenProps> = ({
  onBack,
  onOrderDetail,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      orderDate: new Date('2024-01-15'),
      status: 'delivered',
      totalAmount: 299900,
      items: [
        {
          id: '1',
          productName: 'kính mắt gọng vuông',
          productImage: 'https://cdn.tgdd.vn/Files/2019/07/21/1180759/xuhuongmatkinh20191.jpg',
          quantity: 1,
          price: 299900,
          color: 'Titan tự nhiên',
          storage: 'chuẩn',
        },
      ],
      shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
      paymentMethod: 'Thanh toán khi nhận hàng',
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      orderDate: new Date('2024-01-20'),
      status: 'shipping',
      totalAmount: 539800,
      items: [
        {
          id: '2',
          productName: 'gọng kính mắt mèo',
          productImage: 'https',
          quantity: 2,
          price: 269900,
          color: 'Titanium Gray',
          storage: 'chuẩn',
        },
      ],
      shippingAddress: '456 Đường XYZ, Quận 3, TP.HCM',
      paymentMethod: 'Chuyển khoản ngân hàng',
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      orderDate: new Date('2024-01-25'),
      status: 'confirmed',
      totalAmount: 199900,
      items: [
        {
          id: '3',
          productName: 'gọng kính mắt mèo',
          productImage: 'https',
          quantity: 1,
          price: 199900,
          color: 'Black',
          storage: 'chuẩn',
        },
      ],
      shippingAddress: '789 Đường DEF, Quận 7, TP.HCM',
      paymentMethod: 'Ví điện tử',
    },
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: 'Chờ xác nhận', color: Colors.warning, icon: '⏳' };
      case 'confirmed':
        return { text: 'Đã xác nhận', color: Colors.primary, icon: '✅' };
      case 'shipping':
        return { text: 'Đang giao', color: Colors.secondary, icon: '🚚' };
      case 'delivered':
        return { text: 'Đã giao', color: Colors.success, icon: '📦' };
      case 'cancelled':
        return { text: 'Đã hủy', color: Colors.error, icon: '❌' };
      default:
        return { text: 'Không xác định', color: Colors.gray, icon: '❓' };
    }
  };

  const getFilteredOrders = () => {
    if (selectedStatus === 'all') return orders;
    return orders.filter(order => order.status === selectedStatus);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>
      <View style={styles.placeholder} />
    </View>
  );

  const renderStatusFilter = () => (
    <View style={styles.statusFilter}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedStatus === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedStatus('all')}
        >
          <Text style={[
            styles.filterButtonText,
            selectedStatus === 'all' && styles.filterButtonTextActive,
          ]}>
            Tất cả
          </Text>
        </TouchableOpacity>
        
        {['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'].map((status) => {
          const statusInfo = getStatusInfo(status);
          return (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                selectedStatus === status && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedStatus === status && styles.filterButtonTextActive,
              ]}>
                {statusInfo.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderOrderCard = ({ item }: { item: Order }) => {
    const statusInfo = getStatusInfo(item.status);
    
    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => onOrderDetail(item)}
        activeOpacity={0.8}
      >
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderNumber}>{item.orderNumber}</Text>
            <Text style={styles.orderDate}>{formatDate(item.orderDate)}</Text>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
            <Text style={styles.statusIcon}>{statusInfo.icon}</Text>
            <Text style={styles.statusText}>{statusInfo.text}</Text>
          </View>
        </View>
        
        <View style={styles.orderItems}>
          {item.items.map((orderItem, index) => (
            <View key={orderItem.id} style={styles.orderItem}>
              <Image source={{ uri: orderItem.productImage }} style={styles.itemImage} />
              
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {orderItem.productName}
                </Text>
                
                <View style={styles.itemDetails}>
                  <Text style={styles.itemDetail}>
                    Màu: {orderItem.color}
                  </Text>
                  <Text style={styles.itemDetail}>
                    Kiểu dáng: {orderItem.storage}
                  </Text>
                  <Text style={styles.itemDetail}>
                    Số lượng: {orderItem.quantity}
                  </Text>
                </View>
                
                <Text style={styles.itemPrice}>
                  {formatPrice(orderItem.price)}
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.orderFooter}>
          <View style={styles.orderTotal}>
            <Text style={styles.totalLabel}>Tổng cộng:</Text>
            <Text style={styles.totalAmount}>
              {formatPrice(item.totalAmount)}
            </Text>
          </View>
          
          <View style={styles.orderActions}>
            {item.status === 'delivered' && (
              <Button
                title="Đánh giá"
                onPress={() => {}}
                variant="outline"
                size="small"
                style={styles.actionButton}
              />
            )}
            
            {item.status === 'shipping' && (
              <Button
                title="Theo dõi"
                onPress={() => {}}
                variant="primary"
                size="small"
                style={styles.actionButton}
              />
            )}
            
            {item.status === 'pending' && (
              <Button
                title="Hủy đơn"
                onPress={() => {}}
                variant="danger"
                size="small"
                style={styles.actionButton}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>📋</Text>
      <Text style={styles.emptyStateTitle}>Chưa có đơn hàng nào</Text>
      <Text style={styles.emptyStateSubtitle}>
        Bạn chưa đặt đơn hàng nào. Hãy bắt đầu mua sắm ngay!
      </Text>
      <Button
        title="Mua sắm ngay"
        onPress={onBack}
        variant="primary"
        size="medium"
        style={styles.shopNowButton}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderStatusFilter()}
      
      {getFilteredOrders().length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={getFilteredOrders()}
          renderItem={renderOrderCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.orderList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.screenPadding,
    paddingVertical: Sizes.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  backButton: {
    padding: Sizes.sm,
  },
  
  backIcon: {
    fontSize: Sizes.iconLg,
    color: Colors.textPrimary,
  },
  
  headerTitle: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  
  placeholder: {
    width: 40,
  },
  
  statusFilter: {
    backgroundColor: Colors.surface,
    paddingVertical: Sizes.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  filterButton: {
    paddingHorizontal: Sizes.md,
    paddingVertical: Sizes.sm,
    marginHorizontal: Sizes.xs,
    borderRadius: Sizes.radiusMd,
    backgroundColor: Colors.grayLight,
  },
  
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  
  filterButtonText: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  
  filterButtonTextActive: {
    color: Colors.white,
  },
  
  orderList: {
    padding: Sizes.screenPadding,
  },
  
  orderCard: {
    backgroundColor: Colors.surface,
    borderRadius: Sizes.radiusMd,
    marginBottom: Sizes.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Sizes.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  
  orderInfo: {
    flex: 1,
  },
  
  orderNumber: {
    fontSize: Sizes.fontSizeMd,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
  },
  
  orderDate: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
  },
  
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.sm,
    paddingVertical: Sizes.xs,
    borderRadius: Sizes.radiusSm,
  },
  
  statusIcon: {
    fontSize: Sizes.fontSizeSm,
    marginRight: Sizes.xs,
  },
  
  statusText: {
    fontSize: Sizes.fontSizeXs,
    color: Colors.white,
    fontWeight: '600',
  },
  
  orderItems: {
    padding: Sizes.md,
  },
  
  orderItem: {
    flexDirection: 'row',
    marginBottom: Sizes.md,
  },
  
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: Sizes.radiusSm,
    marginRight: Sizes.md,
  },
  
  itemInfo: {
    flex: 1,
  },
  
  itemName: {
    fontSize: Sizes.fontSizeSm,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
    lineHeight: Sizes.lineHeightSm,
  },
  
  itemDetails: {
    marginBottom: Sizes.xs,
  },
  
  itemDetail: {
    fontSize: Sizes.fontSizeXs,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  
  itemPrice: {
    fontSize: Sizes.fontSizeSm,
    fontWeight: '600',
    color: Colors.primary,
  },
  
  orderFooter: {
    padding: Sizes.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.md,
  },
  
  totalLabel: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
  },
  
  totalAmount: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: '700',
    color: Colors.primary,
  },
  
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  
  actionButton: {
    marginLeft: Sizes.sm,
  },
  
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Sizes.screenPadding,
  },
  
  emptyStateIcon: {
    fontSize: Sizes.iconXxl * 2,
    marginBottom: Sizes.lg,
  },
  
  emptyStateTitle: {
    fontSize: Sizes.fontSizeXl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Sizes.sm,
    textAlign: 'center',
  },
  
  emptyStateSubtitle: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Sizes.lg,
    lineHeight: Sizes.lineHeightMd,
  },
  
  shopNowButton: {
    marginBottom: Sizes.md,
  },
});
