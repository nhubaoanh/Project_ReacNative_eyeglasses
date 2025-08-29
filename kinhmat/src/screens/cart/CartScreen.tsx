import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import { Button } from "@/src/components/ui/Button";
import { Product } from "@/src/lib/types/product.types";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";


interface CartItem{
    product: Product;
    quantity: number;
    selectedColor: any;
    selectedStorage: any;
}

interface CartScreenProps {
  onBack: () => void;
  onCheckout: () => void;
}


export const CartScreen :React.FC<CartScreenProps> = ({
    onBack, 
    onCheckout,
}) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        }).format(price);
    };

    const updateQuantity = (index: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        const newCartItems = [...cartItems];
        newCartItems[index].quantity = newQuantity;
        setCartItems(newCartItems);
    };

        const removeItem = (index: number) => {
        Alert.alert(
        'Xác nhận',
        'Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?',
        [
            { text: 'Hủy', style: 'cancel' },
            {
            text: 'Xóa',
            style: 'destructive',
            onPress: () => {
                const newCartItems = cartItems.filter((_, i) => i !== index);
                setCartItems(newCartItems);
            },
            },
        ]
        );
    };
    
    // logic bài
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            product: {
                id: '1',
                name: 'Kính cận gọng tròn Titan',
                brand: 'Gentle Monster',
                model: 'Round Titan 2024',
                price: 1990000,
                originalPrice: 2290000,
                discount: 13,
                images: [
                    'https://cdn.tgdd.vn/Files/2019/07/21/1180759/xuhuongmatkinh20191.jpg',
                    'https://via.placeholder.com/400x400/007AFF/FFFFFF?text=Kinh+can+Titan+2',
                    'https://via.placeholder.com/400x400/007AFF/FFFFFF?text=Kinh+can+Titan+3',
                ],
                thumbnail: 'https://cdn.tgdd.vn/Files/2019/07/21/1180759/xuhuongmatkinh20191.jpg',
                description: 'Kính cận gọng Titan nhẹ, thiết kế gọng tròn trẻ trung, phù hợp nam nữ.',
                specifications: {
                    frame: {
                        material: 'Titan',
                        shape: 'Tròn',
                        size: '50-20-140 mm',
                        weight: '20 g'
                    },
                    lenses: {
                        type: 'Cận',
                        coating: 'Chống trầy, chống UV',
                        features: ['Blue Cut']
                    },
                    suitability: {
                        gender: 'Unisex',
                        ageGroup: 'Người lớn',
                        prescription: true
                    },
                    dimensions: {
                        lensWidth: '50 mm',
                        bridge: '20 mm',
                        templeLength: '140 mm',
                        weight: '20 g'
                    }
                },
                colors: [
                    { name: 'Đen', code: '#000000', available: true },
                    { name: 'Bạc', code: '#C0C0C0', available: true }
                ],
                storage: [
                    { size: 'Chuẩn', price: 1990000, available: true }
                ],
                rating: 4.7,
                reviewCount: 312,
                inStock: true,
                isNew: true,
                isFeatured: true,
                category: 'glasses',
                tags: ['Kính cận', 'Titan', 'Gọng tròn'],
                createdAt: new Date('2024-03-10'),
                updatedAt: new Date('2024-03-10')
            },
            quantity: 1,
            selectedColor: { name: 'Đen', code: '#000000', available: true },
            selectedStorage: { size: 'Chuẩn', price: 1990000, available: true },
        },
        {
            product: {
                id: '2',
                name: 'Kính cận vuông tròn Titan',
                brand: 'Gentle Monster',
                model: 'Round Titan 2024',
                price: 1990000,
                originalPrice: 2290000,
                discount: 13,
                images: [
                    'https://cdn.tgdd.vn/Files/2019/07/21/1180759/xuhuongmatkinh20191.jpg',
                    'https://via.placeholder.com/400x400/007AFF/FFFFFF?text=Kinh+can+Titan+2',
                    'https://via.placeholder.com/400x400/007AFF/FFFFFF?text=Kinh+can+Titan+3',
                ],
                thumbnail: 'https://cdn.tgdd.vn/Files/2019/07/21/1180759/xuhuongmatkinh20191.jpg',
                description: 'Kính cận gọng Titan nhẹ, thiết kế gọng tròn trẻ trung, phù hợp nam nữ.',
                specifications: {
                    frame: {
                        material: 'Titan',
                        shape: 'Tròn',
                        size: '50-20-140 mm',
                        weight: '20 g'
                    },
                    lenses: {
                        type: 'Cận',
                        coating: 'Chống trầy, chống UV',
                        features: ['Blue Cut']
                    },
                    suitability: {
                        gender: 'Unisex',
                        ageGroup: 'Người lớn',
                        prescription: true
                    },
                    dimensions: {
                        lensWidth: '50 mm',
                        bridge: '20 mm',
                        templeLength: '140 mm',
                        weight: '20 g'
                    }
                },
                colors: [
                    { name: 'Đen', code: '#000000', available: true },
                    { name: 'Bạc', code: '#C0C0C0', available: true }
                ],
                storage: [
                    { size: 'Chuẩn', price: 1990000, available: true }
                ],
                rating: 4.7,
                reviewCount: 312,
                inStock: true,
                isNew: true,
                isFeatured: true,
                category: 'glasses',
                tags: ['Kính cận', 'Titan', 'Gọng tròn'],
                createdAt: new Date('2024-03-10'),
                updatedAt: new Date('2024-03-10')
            },
            quantity: 1,
            selectedColor: { name: 'Đen', code: '#000000', available: true },
            selectedStorage: { size: 'Chuẩn', price: 1990000, available: true },
        },
        {
            product: {
                id: '3',
                name: 'Kính cận gọng oval Titan',
                brand: 'Gentle Monster',
                model: 'Round Titan 2024',
                price: 1990000,
                originalPrice: 2290000,
                discount: 13,
                images: [
                    'https://cdn.tgdd.vn/Files/2019/07/21/1180759/xuhuongmatkinh20191.jpg',
                    'https://via.placeholder.com/400x400/007AFF/FFFFFF?text=Kinh+can+Titan+2',
                    'https://via.placeholder.com/400x400/007AFF/FFFFFF?text=Kinh+can+Titan+3',
                ],
                thumbnail: 'https://cdn.tgdd.vn/Files/2019/07/21/1180759/xuhuongmatkinh20191.jpg',
                description: 'Kính cận gọng Titan nhẹ, thiết kế gọng tròn trẻ trung, phù hợp nam nữ.',
                specifications: {
                    frame: {
                        material: 'Titan',
                        shape: 'Tròn',
                        size: '50-20-140 mm',
                        weight: '20 g'
                    },
                    lenses: {
                        type: 'Cận',
                        coating: 'Chống trầy, chống UV',
                        features: ['Blue Cut']
                    },
                    suitability: {
                        gender: 'Unisex',
                        ageGroup: 'Người lớn',
                        prescription: true
                    },
                    dimensions: {
                        lensWidth: '50 mm',
                        bridge: '20 mm',
                        templeLength: '140 mm',
                        weight: '20 g'
                    }
                },
                colors: [
                    { name: 'Đen', code: '#000000', available: true },
                    { name: 'Bạc', code: '#C0C0C0', available: true }
                ],
                storage: [
                    { size: 'Chuẩn', price: 1990000, available: true }
                ],
                rating: 4.7,
                reviewCount: 312,
                inStock: true,
                isNew: true,
                isFeatured: true,
                category: 'glasses',
                tags: ['Kính cận', 'Titan', 'Gọng tròn'],
                createdAt: new Date('2024-03-10'),
                updatedAt: new Date('2024-03-10')
            },
            quantity: 1,
            selectedColor: { name: 'Đen', code: '#000000', available: true },
            selectedStorage: { size: 'Chuẩn', price: 1990000, available: true },
        },
        {
            product: {
                id: '4',
                name: 'Kính cận gọng tròn Titan',
                brand: 'Gentle Monster',
                model: 'Round Titan 2024',
                price: 1990000,
                originalPrice: 2290000,
                discount: 13,
                images: [
                    'https://cdn.tgdd.vn/Files/2019/07/21/1180759/xuhuongmatkinh20191.jpg',
                    'https://via.placeholder.com/400x400/007AFF/FFFFFF?text=Kinh+can+Titan+2',
                    'https://via.placeholder.com/400x400/007AFF/FFFFFF?text=Kinh+can+Titan+3',
                ],
                thumbnail: 'https://cdn.tgdd.vn/Files/2019/07/21/1180759/xuhuongmatkinh20191.jpg',
                description: 'Kính cận gọng Titan nhẹ, thiết kế gọng tròn trẻ trung, phù hợp nam nữ.',
                specifications: {
                    frame: {
                        material: 'Titan',
                        shape: 'Tròn',
                        size: '50-20-140 mm',
                        weight: '20 g'
                    },
                    lenses: {
                        type: 'Cận',
                        coating: 'Chống trầy, chống UV',
                        features: ['Blue Cut']
                    },
                    suitability: {
                        gender: 'Unisex',
                        ageGroup: 'Người lớn',
                        prescription: true
                    },
                    dimensions: {
                        lensWidth: '50 mm',
                        bridge: '20 mm',
                        templeLength: '140 mm',
                        weight: '20 g'
                    }
                },
                colors: [
                    { name: 'Đen', code: '#000000', available: true },
                    { name: 'Bạc', code: '#C0C0C0', available: true }
                ],
                storage: [
                    { size: 'Chuẩn', price: 1990000, available: true }
                ],
                rating: 4.7,
                reviewCount: 312,
                inStock: true,
                isNew: true,
                isFeatured: true,
                category: 'glasses',
                tags: ['Kính cận', 'Titan', 'Gọng tròn'],
                createdAt: new Date('2024-03-10'),
                updatedAt: new Date('2024-03-10')
            },
            quantity: 1,
            selectedColor: { name: 'Đen', code: '#000000', available: true },
            selectedStorage: { size: 'Chuẩn', price: 1990000, available: true },
        }
    ]);

    const [newprice, setNewprive] = useState(1);

    const updateprice = () => {
        return cartItems.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0)
    }

    // header cart
    const renderHeader= () => (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} >
                <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Giỏ hàng</Text>
            <TouchableOpacity onPress={() => setCartItems([])}>
                <Text>Xóa tất cả</Text>
            </TouchableOpacity>
        </View>
    )

    // cart item
    const renderCartItem = (item: CartItem, index: number) => (
        <View key={index} style={styles.cartItem}>
        <Image source={{ uri: item.product.thumbnail }} style={styles.itemImage} />
        
        <View style={styles.itemInfo}>
            <Text style={styles.itemBrand}>{item.product.brand}</Text>
            <Text style={styles.itemName} numberOfLines={2}>
            {item.product.name}
            </Text>
            
            <View style={styles.itemOptions}>
            <Text style={styles.itemOption}>
                Màu: {item.selectedColor.name}
            </Text>
            <Text style={styles.itemOption}>
                kiểu dáng: {item.selectedStorage.size}
            </Text>
            </View>
            
            <View style={styles.itemPrice}>
            <Text style={styles.currentPrice}>
                {item.selectedStorage.price ? formatPrice(item.selectedStorage.price * item.quantity) : formatPrice(0)}
            </Text>
            {item.product.originalPrice && (
                <Text style={styles.originalPrice}>
                {formatPrice(item.product.originalPrice)}
                </Text>
            )}
            </View>
        </View>
        
        <View style={styles.itemActions}>
            <View style={styles.quantityContainer}>
            <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(index, item.quantity - 1)}
            >
                <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{item.quantity}</Text>
            
            <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(index, item.quantity + 1)}
            >
                <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
            </View>
            
            <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(index)}
            >
            <Text style={styles.removeButtonText}>🗑️</Text>
            </TouchableOpacity>
        </View>
        </View>
    );

    const renderCartItemS = () =>{
        if(cartItems.length === 0) {
            <View>
                <Text>🛒</Text>
                <Text>Giỏ hàng trống</Text>
                <Text>Bạn chưa có sản phẩm nào</Text>
                <Button
                    title="tiếp tục mua hàng đi"
                    onPress={onBack}
                    variant="primary"
                    size="medium"
                />
            </View>
        }
        return (
            <ScrollView showsHorizontalScrollIndicator={false}>
                {cartItems.map((item, index)=> renderCartItem(item, index))}
            </ScrollView>
        )
        
    };
   
    return(
        <SafeAreaView>
            {renderHeader()}
            {renderCartItemS()}
        </SafeAreaView>
    )
}

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
  
  clearButton: {
    padding: Sizes.sm,
  },
  
  clearButtonText: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.error,
    fontWeight: '600',
  },
  
  content: {
    flex: 1,
    paddingHorizontal: Sizes.screenPadding,
    paddingTop: Sizes.md,
  },
  
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Sizes.screenPadding,
  },
  
  emptyCartIcon: {
    fontSize: Sizes.iconXxl * 2,
    marginBottom: Sizes.lg,
  },
  
  emptyCartTitle: {
    fontSize: Sizes.fontSizeXl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Sizes.sm,
    textAlign: 'center',
  },
  
  emptyCartSubtitle: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Sizes.lg,
    lineHeight: Sizes.lineHeightMd,
  },
  
  continueShoppingButton: {
    marginBottom: Sizes.md,
  },
  
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Sizes.radiusMd,
    padding: Sizes.md,
    marginBottom: Sizes.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: Sizes.radiusSm,
    marginRight: Sizes.md,
  },
  
  itemInfo: {
    flex: 1,
    marginRight: Sizes.sm,
  },
  
  itemBrand: {
    fontSize: Sizes.fontSizeXs,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Sizes.xs,
  },
  
  itemName: {
    fontSize: Sizes.fontSizeSm,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
    lineHeight: Sizes.lineHeightSm,
  },
  
  itemOptions: {
    marginBottom: Sizes.xs,
  },
  
  itemOption: {
    fontSize: Sizes.fontSizeXs,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  
  itemPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  currentPrice: {
    fontSize: Sizes.fontSizeMd,
    fontWeight: '700',
    color: Colors.primary,
    marginRight: Sizes.xs,
  },
  
  originalPrice: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
    borderRadius: Sizes.radiusSm,
    paddingHorizontal: Sizes.xs,
    marginBottom: Sizes.sm,
  },
  
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: Sizes.radiusSm,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  quantityButtonText: {
    fontSize: Sizes.fontSizeSm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  
  quantityText: {
    fontSize: Sizes.fontSizeSm,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginHorizontal: Sizes.sm,
    minWidth: 20,
    textAlign: 'center',
  },
  
  removeButton: {
    padding: Sizes.xs,
  },
  
  removeButtonText: {
    fontSize: Sizes.iconMd,
  },
  
  orderSummary: {
    backgroundColor: Colors.surface,
    padding: Sizes.screenPadding,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  
  summaryTitle: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.md,
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.sm,
  },
  
  summaryLabel: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
  },
  
  summaryValue: {
    fontSize: Sizes.fontSizeMd,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  
  discountValue: {
    color: Colors.success,
  },
  
  totalValue: {
    fontSize: Sizes.fontSizeLg,
    color: Colors.primary,
  },
  
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Sizes.md,
  },
  
  actionButtons: {
    padding: Sizes.screenPadding,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  
  checkoutButton: {
    marginBottom: Sizes.sm,
  },
});