import { Product } from '../types/product.types';

export const mockProducts: Product[] = [
  // Kính cận
  {
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
    thumbnail: 'https://via.placeholder.com/150x150/007AFF/FFFFFF?text=Kinh+can+Titan',
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

  // Kính râm
  {
    id: '2',
    name: 'Kính râm Polarized chống tia UV',
    brand: 'Ray-Ban',
    model: 'Aviator RB3025',
    price: 3590000,
    originalPrice: 3990000,
    discount: 10,
    images: [
      'https://cdn.tgdd.vn/Files/2019/07/21/1180759/xuhuongmatkinh20191.jpg',
      'https://via.placeholder.com/400x400/1428A0/FFFFFF?text=Kinh+ram+RayBan+2',
    ],
    thumbnail: 'https://via.placeholder.com/150x150/1428A0/FFFFFF?text=Kinh+ram+RayBan',
    description: 'Kính râm Ray-Ban Aviator với tròng Polarized giảm chói, bảo vệ mắt khỏi tia UV400.',
    specifications: {
      frame: {
        material: 'Kim loại',
        shape: 'Aviator',
        size: '52-18-140 mm',
        weight: '25 g'
      },
      lenses: {
        type: 'Polarized',
        coating: 'Chống UV400',
        features: ['Giảm chói', 'Bảo vệ mắt']
      },
      suitability: {
        gender: 'Unisex',
        ageGroup: 'Người lớn',
        prescription: false
      },
      dimensions: {
        lensWidth: '52 mm',
        bridge: '18 mm',
        templeLength: '140 mm',
        weight: '25 g'
      }
    },
    colors: [
      { name: 'Đen bóng', code: '#000000', available: true },
      { name: 'Vàng đồng', code: '#DAA520', available: true }
    ],
    storage: [
      { size: 'Chuẩn', price: 3590000, available: true }
    ],
    rating: 4.8,
    reviewCount: 541,
    inStock: true,
    isNew: false,
    isFeatured: true,
    category: 'sunglasses',
    tags: ['Kính râm', 'Ray-Ban', 'Polarized'],
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15')
  },

  // Tròng kính
  {
    id: '3',
    name: 'Tròng kính chống ánh sáng xanh',
    brand: 'Essilor',
    model: 'Blue Cut 1.56',
    price: 890000,
    originalPrice: 1190000,
    discount: 25,
    images: [
      'https://cdn.tgdd.vn/Files/2019/07/21/1180759/xuhuongmatkinh20191.jpg',
      'https://via.placeholder.com/400x400/FF6B35/FFFFFF?text=Trong+kinh+Essilor+2',
    ],
    thumbnail: 'https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=Trong+kinh+Essilor',
    description: 'Tròng kính Essilor Blue Cut chống ánh sáng xanh, bảo vệ mắt khi dùng máy tính, điện thoại.',
    specifications: {
      frame: {
        material: 'Không gọng',
        shape: 'Tròng rời',
        size: '60 mm',
        weight: '10 g'
      },
      lenses: {
        type: 'Blue Cut',
        coating: 'Chống trầy, chống UV',
        features: ['Chống ánh sáng xanh']
      },
      suitability: {
        gender: 'Unisex',
        ageGroup: 'Người lớn',
        prescription: true
      },
      dimensions: {
        lensWidth: '60 mm',
        bridge: '0 mm',
        templeLength: '0 mm',
        weight: '10 g'
      }
    },
    colors: [
      { name: 'Trong suốt', code: '#F5F5F5', available: true }
    ],
    storage: [
      { size: '1 cặp', price: 890000, available: true }
    ],
    rating: 4.6,
    reviewCount: 220,
    inStock: true,
    isNew: true,
    isFeatured: false,
    category: 'lenses',
    tags: ['Tròng kính', 'Essilor', 'Blue Cut'],
    createdAt: new Date('2024-03-18'),
    updatedAt: new Date('2024-03-18')
  }
];
