import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ProductDetailScreen from '../../src/screens/product/ProductDetailScreen';

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return <ProductDetailScreen productId={id} />;
};

export default ProductDetailPage;
