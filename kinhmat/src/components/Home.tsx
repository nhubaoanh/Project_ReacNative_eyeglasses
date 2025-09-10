import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import apiService, { Product } from '../service/apiService';

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiService.getAllProducts();
      
      if (result.success && result.data) {
        setProducts(result.data);
      } else {
        setError(result.error || 'Không thể tải danh sách sản phẩm');
      }
    } catch (error) {
      setError('Lỗi kết nối server');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const renderProduct = ({ item }: { item: Product }) => {
    // Debug logging for image paths
    console.log('Product:', item.tensp, 'hinhanh:', item.hinhanh);
    if (item.hinhanh) {
      const imageUrl = apiService.getImageUrl(item.hinhanh);
      console.log('Generated image URL:', imageUrl);
    }
    
    return (
      <View style={styles.productCard}>
        <View style={styles.imageContainer}>
          {item.hinhanh ? (
            <Image 
              source={{ uri: apiService.getImageUrl(item.hinhanh) }} 
              style={styles.productImage}
              resizeMode="cover"
              onError={(error) => {
                console.log('Image load error for', item.tensp, ':', error.nativeEvent.error);
              }}
              onLoad={() => {
                console.log('Image loaded successfully for', item.tensp);
              }}
            />
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>📷</Text>
              <Text style={styles.noImageSubText}>Chưa có ảnh</Text>
            </View>
          )}
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.tensp}</Text>
          <Text style={styles.productBrand}>Thương hiệu: {item.thuonghieu}</Text>
          <Text style={styles.productPrice}>
            {item.gia?.toLocaleString()} VNĐ
          </Text>
          <View style={styles.productDetails}>
            <Text style={styles.productDetailText}>Màu: {item.mausac}</Text>
            <Text style={styles.productDetailText}>Kiểu: {item.kieudang}</Text>
          </View>
          <Text style={styles.productMaterial}>Chất liệu: {item.chatlieu}</Text>
          <Text style={styles.productSize}>Kích thước: {item.kichthuoc}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Lỗi: {error}</Text>
        <Text style={styles.retryText} onPress={fetchProducts}>
          Thử lại
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Trang Chủ - Sản Phẩm Nổi Bật</Text>
      
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.masp?.toString() || Math.random().toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: 'white',
    flex: 1,
    margin: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 150,
    width: '100%',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  noImageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 32,
    color: '#ccc',
  },
  noImageSubText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  productBrand: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  productDetailText: {
    fontSize: 11,
    color: '#888',
    flex: 1,
  },
  productMaterial: {
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
  },
  productSize: {
    fontSize: 11,
    color: '#888',
  },
});

export default HomeScreen;
