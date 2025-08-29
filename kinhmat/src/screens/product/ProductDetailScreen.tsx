import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Sizes } from '../../../constants/sizes';
import { Button } from '../../components/ui/Button';
import { Product, ProductColor, ProductStorage } from '../../lib/types/product.types';
import { mockProducts } from '../../lib/utils/mockData';

const { width } = Dimensions.get('window');

interface ProductDetailScreenProps {
  productId?: string;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ productId }) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Find product by ID or use first product as fallback
  const product: Product = productId 
    ? mockProducts.find(p => p.id === productId) || mockProducts[0]
    : mockProducts[0];

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product.id, quantity);
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log('Buy now:', product.id, quantity);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const renderImageGallery = () => (
    <View style={styles.imageGallery}>
      <Image source={{ uri: product.images[0] }} style={styles.mainImage} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailContainer}>
        {product.images.map((image, index) => (
          <TouchableOpacity key={index} style={styles.thumbnailWrapper}>
            <Image source={{ uri: image }} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderProductInfo = () => (
    <View style={styles.productInfo}>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.name}>{product.name}</Text>
      
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>⭐ {product.rating}</Text>
        <Text style={styles.reviewCount}>({product.reviewCount} đánh giá)</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>{formatPrice(product.price)}</Text>
        {product.originalPrice && (
          <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
        )}
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
      </View>

      <Text style={styles.description}>{product.description}</Text>
    </View>
  );

  const renderColorSelection = () => (
    <View style={styles.selectionSection}>
      <Text style={styles.sectionTitle}>Màu sắc</Text>
      <View style={styles.colorOptions}>
        {product.colors.map((color) => (
          <TouchableOpacity
            key={color.name}
            style={[
              styles.colorOption,
              selectedColor === color.name && styles.colorOptionSelected
            ]}
            onPress={() => setSelectedColor(color.name)}
          >
            <View style={[styles.colorCircle, { backgroundColor: color.code }]} />
            <Text style={styles.colorName}>{color.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStorageSelection = () => (
    <View style={styles.selectionSection}>
      <Text style={styles.sectionTitle}>Dung lượng</Text>
      <View style={styles.storageOptions}>
        {product.storage.map((storage) => (
          <TouchableOpacity
            key={storage.size}
            style={[
              styles.storageOption,
              selectedStorage === storage.size && styles.storageOptionSelected
            ]}
            onPress={() => setSelectedStorage(storage.size)}
          >
            <Text style={styles.storageCapacity}>{storage.size}</Text>
            <Text style={styles.storagePrice}>{formatPrice(storage.price)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderQuantitySelector = () => (
    <View style={styles.quantitySection}>
      <Text style={styles.sectionTitle}>Số lượng</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity(quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSpecifications = () => (
    <View style={styles.specificationsSection}>
      <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
      <View style={styles.specificationsList}>
          <View style={styles.specificationItem}>
          <Text style={styles.specificationKey}>Size - kieu dang</Text>
          <Text style={styles.specificationValue}>{product.specifications.frame.size} - {product.specifications.frame.shape}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationKey}>Cong dung</Text>
          <Text style={styles.specificationValue}>{product.specifications.lenses.coating}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationKey}>Gioi tinh</Text>
          <Text style={styles.specificationValue}>{product.specifications.suitability.gender}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationKey}>Nhom nguoi</Text>
          <Text style={styles.specificationValue}>{product.specifications.suitability.ageGroup}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationKey}>Chiều rộng tròng kính</Text>
          <Text style={styles.specificationValue}>{product.specifications.dimensions.lensWidth}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationKey}>Cầu kính (khoảng cách giữa 2 tròng</Text>
          <Text style={styles.specificationValue}>{product.specifications.dimensions.bridge}</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationKey}>Trọng lượng</Text>
          <Text style={styles.specificationValue}>{product.specifications.dimensions.weight}</Text>
        </View>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtons}>
      <Button
        title="Thêm vào giỏ hàng"
        onPress={handleAddToCart}
        variant="outline"
        fullWidth
        style={styles.addToCartButton}
      />
      <Button
        title="Mua ngay"
        onPress={handleBuyNow}
        variant="primary"
        fullWidth
        style={styles.buyNowButton}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderImageGallery()}
        {renderProductInfo()}
        {renderColorSelection()}
        {renderStorageSelection()}
        {renderQuantitySelector()}
        {renderSpecifications()}
      </ScrollView>
      {renderActionButtons()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageGallery: {
    backgroundColor: Colors.white,
    paddingBottom: Sizes.md,
  },
  mainImage: {
    width: width,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  thumbnailContainer: {
    paddingHorizontal: Sizes.md,
  },
  thumbnailWrapper: {
    marginRight: Sizes.sm,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: Sizes.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  productInfo: {
    backgroundColor: Colors.white,
    padding: Sizes.md,
    marginBottom: Sizes.sm,
  },
  brand: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Sizes.xs,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Sizes.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.sm,
  },
  rating: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginRight: Sizes.xs,
  },
  reviewCount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.md,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: Sizes.sm,
  },
  originalPrice: {
    fontSize: 18,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: Sizes.sm,
  },
  discountBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: Sizes.sm,
    paddingVertical: Sizes.xs,
    borderRadius: Sizes.sm,
  },
  discountText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  selectionSection: {
    backgroundColor: Colors.white,
    padding: Sizes.md,
    marginBottom: Sizes.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.md,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Sizes.md,
    marginBottom: Sizes.sm,
    padding: Sizes.sm,
    borderRadius: Sizes.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  colorOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: Sizes.xs,
  },
  colorName: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  storageOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  storageOption: {
    padding: Sizes.sm,
    marginRight: Sizes.sm,
    marginBottom: Sizes.sm,
    borderRadius: Sizes.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    minWidth: 80,
  },
  storageOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  storageCapacity: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
  },
  storagePrice: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  quantitySection: {
    backgroundColor: Colors.white,
    padding: Sizes.md,
    marginBottom: Sizes.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginHorizontal: Sizes.lg,
    minWidth: 30,
    textAlign: 'center',
  },
  specificationsSection: {
    backgroundColor: Colors.white,
    padding: Sizes.md,
    marginBottom: Sizes.sm,
  },
  specificationsList: {
    gap: Sizes.sm,
  },
  specificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Sizes.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  specificationKey: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  specificationValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  actionButtons: {
    backgroundColor: Colors.white,
    padding: Sizes.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  addToCartButton: {
    marginBottom: Sizes.sm,
  },
  buyNowButton: {
    marginBottom: Sizes.sm,
  },
});

export default ProductDetailScreen;
