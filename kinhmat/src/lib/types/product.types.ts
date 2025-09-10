export interface Product {
  masp?: number;
  tensp: string;
  maloai: number;
  thuonghieu: string;
  hinhanh: string;
  gia : number;
  mausac: string;
  kieudang: string;
  kichthuoc: string;
  chatlieu: string;
}

// Kiểu dữ liệu từ API
// export interface ProductFromAPI {
//   masp: number;
//   tensp: string;
//   model: string;
//   id_danhmuc?: number;
//   id_thuonghieu?: number;
//   id_xuatxu?: number;
//   id_chatlieu?: number;
//   id_kieudang?: number;
//   mo_ta: string;
//   hinh_anh: string[];
//   san_pham_moi?: number;      // 0 hoặc 1
//   san_pham_noi_bat?: number;  // 0 hoặc 1
//   ngay_tao: string;           // ISO string
//   ngay_cap_nhat: string;      // ISO string
//   gia?: number;
// }

// 🔹 Sửa cấu trúc specifications để hợp lý với kính mắt
export interface ProductSpecifications {
  frame: {
    material: string;     // Chất liệu gọng: Titan, Nhựa, Kim loại
    shape: string;        // Hình dáng gọng: tròn, vuông, aviator
    size: string;         // Kích thước: 50-20-140 mm
    weight: string;       // Trọng lượng: 20g
  };
  lenses: {
    type: string;         // Loại tròng: cận, râm, chống ánh sáng xanh
    coating: string;      // Lớp phủ: chống UV, chống chói, chống trầy
    features: string[];   // Đặc điểm: Polarized, Blue Cut, đổi màu...
  };
  suitability: {
    gender: string;       // Nam/Nữ/Unisex
    ageGroup: string;     // Người lớn, trẻ em
    prescription: boolean; // Có thể lắp tròng cận/viễn/loạn không
  };
  dimensions: {
    lensWidth: string;    // Chiều ngang tròng: 52 mm
    bridge: string;       // Cầu kính: 18 mm
    templeLength: string; // Càng kính: 140 mm
    weight: string
  };
}

// 🔹 Giữ nguyên cho phù hợp
export interface ProductColor {
  name: string;  // "Đen", "Nâu gỗ", "Bạc"
  code: string;  // Mã màu hex
  available: boolean;
}

// 🔹 Trong kính => storage = quy cách
export interface ProductStorage {
  size: string;   // "1 cặp", "Combo 2 kính", "Size M"
  price: number;
  available: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories?: ProductCategory[];
}

export interface ProductFilter {
  brand?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  category?: string[];
  rating?: number;
  inStock?: boolean;
  features?: string[]; // ví dụ: ['Polarized', 'Chống UV', 'Blue Cut']
}

export interface ProductSort {
  field: 'price' | 'rating' | 'name' | 'createdAt';
  order: 'asc' | 'desc';
}
