// Ví dụ sử dụng API Service trong React Native
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native';
import apiService from '../services/apiService';

const ReactNativeExample = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    ten_sanpham: '',
    gia: '',
    mo_ta: ''
  });

  // Lấy tất cả sản phẩm
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await apiService.getAllProducts();
      if (result.success) {
        setProducts(result.data);
      } else {
        Alert.alert('Lỗi', 'Không thể tải danh sách sản phẩm');
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Thêm sản phẩm mới
  const addProduct = async () => {
    if (!newProduct.ten_sanpham || !newProduct.gia) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.createProduct({
        ...newProduct,
        gia: parseFloat(newProduct.gia)
      });
      
      if (result.success) {
        Alert.alert('Thành công', 'Đã thêm sản phẩm mới');
        setNewProduct({ ten_sanpham: '', gia: '', mo_ta: '' });
        fetchProducts(); // Tải lại danh sách
      } else {
        Alert.alert('Lỗi', 'Không thể thêm sản phẩm');
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Xóa sản phẩm
  const deleteProduct = async (id) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa sản phẩm này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const result = await apiService.deleteProduct(id);
              if (result.success) {
                Alert.alert('Thành công', 'Đã xóa sản phẩm');
                fetchProducts(); // Tải lại danh sách
              } else {
                Alert.alert('Lỗi', 'Không thể xóa sản phẩm');
              }
            } catch (error) {
              Alert.alert('Lỗi', error.message);
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  // Kiểm tra kết nối server
  const checkServerHealth = async () => {
    try {
      const result = await apiService.healthCheck();
      if (result.success) {
        Alert.alert('Kết nối OK', 'Server đang hoạt động bình thường');
      } else {
        Alert.alert('Lỗi kết nối', 'Không thể kết nối đến server');
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.ten_sanpham}</Text>
        <Text style={styles.productPrice}>{item.gia?.toLocaleString()} VNĐ</Text>
        {item.mo_ta && <Text style={styles.productDescription}>{item.mo_ta}</Text>}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteProduct(item.id)}
      >
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quản lý Sản phẩm</Text>
        <TouchableOpacity style={styles.healthButton} onPress={checkServerHealth}>
          <Text style={styles.healthButtonText}>🔍 Kiểm tra Server</Text>
        </TouchableOpacity>
      </View>

      {/* Form thêm sản phẩm */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Thêm sản phẩm mới</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Tên sản phẩm"
          value={newProduct.ten_sanpham}
          onChangeText={(text) => setNewProduct({ ...newProduct, ten_sanpham: text })}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Giá"
          value={newProduct.gia}
          onChangeText={(text) => setNewProduct({ ...newProduct, gia: text })}
          keyboardType="numeric"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Mô tả (tùy chọn)"
          value={newProduct.mo_ta}
          onChangeText={(text) => setNewProduct({ ...newProduct, mo_ta: text })}
          multiline
          numberOfLines={3}
        />
        
        <TouchableOpacity style={styles.addButton} onPress={addProduct}>
          <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Danh sách sản phẩm ({products.length})</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={fetchProducts}>
            <Text style={styles.refreshButtonText}>🔄 Làm mới</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id?.toString()}
          style={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  healthButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  healthButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  productList: {
    maxHeight: 400,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 3,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ReactNativeExample;
