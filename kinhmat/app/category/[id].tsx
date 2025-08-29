import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../../constants/colors';
import { Sizes } from '../../constants/sizes';
import { ProductCard } from '../../components/cards/ProductCard';
import { mockProducts } from '../../src/lib/utils/mockData';

const CategoryPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  // Filter products by category
  const categoryProducts = mockProducts.filter(product => 
    product.category.toLowerCase() === id.toLowerCase()
  );

  const getCategoryName = (categoryId: string) => {
    const categoryMap: { [key: string]: string } = {
      'phones': 'Điện thoại',
      'laptops': 'Laptop',
      'accessories': 'Phụ kiện',
      'tablets': 'Máy tính bảng',
      'smartwatches': 'Đồng hồ thông minh',
      'audio': 'Âm thanh'
    };
    return categoryMap[categoryId] || categoryId;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{getCategoryName(id)}</Text>
        <Text style={styles.subtitle}>{categoryProducts.length} sản phẩm</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {categoryProducts.map((product) => (
            <View key={product.id} style={styles.productItem}>
              <ProductCard
                product={product}
                onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })}
              />
            </View>
          ))}
        </View>
        
        {categoryProducts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Không có sản phẩm nào trong danh mục này</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Sizes.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  productsGrid: {
    padding: Sizes.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    marginBottom: Sizes.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizes.xl,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default CategoryPage;
