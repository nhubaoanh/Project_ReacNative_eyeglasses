// import { Colors } from "@/constants/colors";
// import { Sizes } from "@/constants/sizes";
// import { Button } from "../../components/ui/Button";
// import { useCart } from "@/src/context/CartContext";
// import apiService, { Product } from "@/src/service/apiService";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useRef, useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   RefreshControl,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Image,
// } from "react-native";
// import productService from "@/src/service/product.Service";
// import { userStorage } from "@/src/utils/userStorage";
// import categoryService from "@/src/service/category.service";
// import Category from "@/src/types/category";

// const { width } = Dimensions.get("window");

// export default function HomeScreen() {
//   const { totalItems } = useCart();
//   const router = useRouter();
//   const bannerRef = useRef<FlatList>(null);

//   // --- Dữ liệu demo ---
//   const banners = [
//     {
//       id: 1,
//       title: "Khuyến mãi lớn",
//       subtitle: "Giảm giá lên đến 50%",
//       color: Colors.primary,
//     },
//     {
//       id: 2,
//       title: "Siêu sale 8.8",
//       subtitle: "Giảm ngay 100K",
//       color: "#FF6B6B",
//     },
//     {
//       id: 3,
//       title: "Miễn phí vận chuyển",
//       subtitle: "Đơn từ 0đ",
//       color: "#4ECDC4",
//     },
//   ];

//   const categories = [
//     { id: 1, name: "Gọng kính", icon: "👓", color: "#FF6B6B" },
//     { id: 2, name: "Kính râm", icon: "🕶️", color: "#4ECDC4" },
//     { id: 3, name: "Tròng kính", icon: "🔍", color: "#45B7D1" },
//     { id: 4, name: "Phụ kiện", icon: "🎒", color: "#96CEB4" },
//     { id: 5, name: "Hộp đựng", icon: "📦", color: "#FECA57" },
//     { id: 6, name: "Khăn lau", icon: "🧽", color: "#FF9FF3" },
//   ];

//   // --- State ---
//   const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [category, setCategory] = useState<Category[]>([]);


// const [user, setUser] = useState<{ userId: number; email: string } | null>(null);
//   // --- Effect: Auto slide banner ---
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBannerIndex((prevIndex) => {
//         const nextIndex = (prevIndex + 1) % banners.length;
//         bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//         return nextIndex;
//       });
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // --- Effect: Lấy dữ liệu ---
//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const currentUser = await userStorage.getCurrentUser();
//         setUser(currentUser);
//       } catch (err) {
//         console.log("Lỗi khi tải user:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

    
//     loadUser();
//     fetchData();
//     fetCategory();
//   }, []);

//   const fetCategory = async () => {
//     try {
//       const data = await categoryService.getAllCategories();
//       console.log("data", data);
//       if(data.success && data.data) {
//         setCategory(data.data);
//         console.log("category", category);
//       }
//     }catch(err){
//       console.log("Lỗi load dữ liêu : ",  err)
//     }

//   }

  


//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const productsRes = await productService.getAllProducts();
//       if (productsRes.success && productsRes.data) {
//         setProducts(productsRes.data);
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError("Không thể tải dữ liệu. Vui lòng thử lại.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Handlers ---
//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchData();
//     setRefreshing(false);
//   };

//   // const handleCategoryPress = (categoryId: number) => {
//   //   router.push(`/category/${categoryId}`);
//   // };

//   const handleCartPress = () => {
//     router.push("/cart");
//   };

//   const handleProductPress = (productId: number) => {
//     router.push({
//       pathname: "/product/[id]",
//       params: { id: productId.toString() },
//     });
//   };

//   const handleSearch = (text: string) => {
//     setSearchText(text);
//     const filtered = products.filter((product) =>
//       product.tensp.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   const renderBanner = ({ item }: { item: any }) => (
//     <View style={[styles.banner, { backgroundColor: item.color }]}>
//       <Text style={styles.bannerText}>{item.title}</Text>
//       <Text style={styles.bannerTextSub}>{item.subtitle}</Text>
//       <Button
//         title="Xem ngay"
//         onPress={() => {}}
//         variant="secondary"
//         size="small"
//       />
//     </View>
//   );

//   const renderProduct = (product: Product) => (
//     <TouchableOpacity
//       key={product.masp}
//       style={styles.productItem}
//       onPress={() => handleProductPress(product.masp || 0)}
//     >
//       <View style={styles.productImageBox}>
//         {product.hinhanh ? (
//           <Image
//             source={{ uri: apiService.getImageUrl(product.hinhanh) }}
//             style={styles.productImage}
//           />
//         ) : (
//           <Text style={styles.noImage}>📦</Text>
//         )}
//       </View>
//       <Text style={styles.productName} numberOfLines={2}>
//         {product.tensp}
//       </Text>
//       <Text style={styles.productPrice}>
//         {product.gia?.toLocaleString("vi-VN")} ₫
//       </Text>
//     </TouchableOpacity>
//   );

//   // --- Render ---
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerTop}>
//           <Text style={styles.textHeader}>Kính Mắt Store</Text>
//           <View style={styles.userBox}>
//             {user ? (
//               <>
//                 <Text style={styles.welcome}>Xin chào 👋</Text>
//                 <Text style={styles.email}>{user.email}</Text>
//               </>
//             ) : (
//               <Text style={styles.noUser}>Chưa đăng nhập</Text>
//             )}
//           </View>
//           <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
//             <Text style={styles.textIcon}>🛒</Text>
//             {totalItems > 0 && (
//               <View style={styles.cartBadge}>
//                 <Text style={styles.cartBadgeText}>{totalItems}</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.searchBar}>
//           <Text style={styles.searchIcon}>🔍</Text>
//           <TextInput
//             style={styles.searchText}
//             value={searchText}
//             onChangeText={handleSearch}
//             placeholder="Tìm kiếm sản phẩm ..."
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Body */}
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//         }
//       >
//         {/* Banner */}
//         <View style={styles.bannerContainer}>
//           <FlatList
//             ref={bannerRef}
//             data={banners}
//             renderItem={renderBanner}
//             keyExtractor={(item) => item.id.toString()}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onMomentumScrollEnd={(event) => {
//               const index = Math.round(
//                 event.nativeEvent.contentOffset.x / width
//               );
//               setCurrentBannerIndex(index);
//             }}
//           />
//           <View style={styles.bannerIndicators}>
//             {banners.map((_, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.indicator,
//                   {
//                     backgroundColor:
//                       currentBannerIndex === index
//                         ? Colors.primary
//                         : Colors.textSecondary,
//                   },
//                 ]}
//               />
//             ))}
//           </View>
//         </View>

//         {/* Categories */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
//           <View style={styles.categoriesGrid}>
//             {category.map((category) => (
//               <TouchableOpacity
//                 key={category.maloai}
//                 // style={[
//                 //   styles.categoryItem,
//                 //   { backgroundColor: category.color + "20" },
//                 // ]}
//                 // onPress={() => handleCategoryPress(category.id)}
//                 style={styles.categoryItem}
//                 // onPress={(filter) => handleCategoryPress(category.maloai)}
//               >
//                 <Text style={styles.categoryIcon}>{category.maloai === 1 ? "👓" : category.maloai === 2 ? "🔍": category.maloai === 3 ? "🎒" : "i'm don't no"}</Text>
//                 <Text style={styles.categoryName}>{category.tenloai}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Products */}
//         {searchText ? (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>
//               Kết quả tìm kiếm "{searchText}" ({filteredProducts.length} sản
//               phẩm)
//             </Text>
//             {loading ? (
//               <Text style={styles.loadingText}>Đang tải...</Text>
//             ) : error ? (
//               <Text style={styles.errorText}>{error}</Text>
//             ) : filteredProducts.length > 0 ? (
//               <View style={styles.productsGrid}>
//                 {filteredProducts.map(renderProduct)}
//               </View>
//             ) : (
//               <View style={styles.emptySearch}>
//                 <Text style={styles.emptySearchIcon}>🔍</Text>
//                 <Text style={styles.emptySearchText}>
//                   Không tìm thấy sản phẩm nào
//                 </Text>
//                 <Text style={styles.emptySearchSubtext}>Thử từ khóa khác</Text>
//               </View>
//             )}
//           </View>
//         ) : (
//           <>
//             <View style={styles.section}>
//               <View style={styles.sectionHeader}>
//                 <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
//                 <TouchableOpacity>
//                   <Text style={styles.seeAllText}>Xem tất cả</Text>
//                 </TouchableOpacity>
//               </View>
//               {loading ? (
//                 <Text style={styles.loadingText}>Đang tải...</Text>
//               ) : error ? (
//                 <Text style={styles.errorText}>{error}</Text>
//               ) : (
//                 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                   {products.filter((product) => product.noibat === 1)
//                   .map(renderProduct)}
//                 </ScrollView>
//               )}
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
//               {loading ? (
//                 <Text style={styles.loadingText}>Đang tải...</Text>
//               ) : error ? (
//                 <Text style={styles.errorText}>{error}</Text>
//               ) : (
//                 <View style={styles.productsGrid}>
//                   {products.map(renderProduct)}
//                 </View>
//               )}
//             </View>
//           </>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // --- Styles ---
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: Colors.background },
//   welcome: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: Colors.white,
//   },
//   email: {
//     fontSize: 18,
//     color: Colors.white,
//     marginTop: Sizes.sm,
//   },
//   noUser: {
//     fontSize: 16,
//     color: Colors.textSecondary,
//   },

//   // Header
//   header: {
//     backgroundColor: Colors.primary,
//     paddingHorizontal: Sizes.md,
//     paddingVertical: Sizes.md,
//   },
//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: Sizes.sm,
//   },
//   textHeader: { fontSize: 18, fontWeight: "600", color: Colors.white },
//   textIcon: { fontSize: 20 },
//   cartButton: { position: "relative", padding: Sizes.sm },
//   cartBadge: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     backgroundColor: Colors.error,
//     borderRadius: 10,
//     minWidth: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cartBadgeText: { fontSize: 12, color: Colors.white },

//   // Search
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: Colors.white,
//     borderRadius: Sizes.sm,
//     padding: Sizes.sm,
//   },
//   searchIcon: {
//     fontSize: 17,
//     marginRight: Sizes.sm,
//     color: Colors.textSecondary,
//   },
//   searchText: { color: Colors.secondary, fontSize: 16 },

//   // Banner
//   bannerContainer: { padding: Sizes.md },
//   banner: {
//     borderRadius: Sizes.md,
//     padding: Sizes.lg,
//     alignItems: "center",
//     gap: Sizes.md,
//     width: width - Sizes.md * 2,
//   },
//   bannerText: { fontSize: 24, color: Colors.white, fontWeight: "bold" },
//   bannerTextSub: { color: Colors.white },
//   bannerIndicators: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: Sizes.sm,
//   },
//   indicator: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: Sizes.xs,
//   },

//   // Section
//   section: { padding: Sizes.md },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: Colors.textPrimary,
//     marginBottom: Sizes.md,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: Sizes.md,
//   },
//   seeAllText: { color: Colors.primary, fontSize: 16, fontWeight: "500" },

//   // Categories
//   categoriesGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   categoryItem: {
//     width: (width - Sizes.md * 3) / 3,
//     aspectRatio: 1,
//     borderRadius: Sizes.md,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: Sizes.sm,
//     backgroundColor: Colors.huawei,
//   },
//   categoryIcon: { fontSize: 32, marginBottom: Sizes.xs },
//   categoryName: {
//     fontSize: 12,
//     fontWeight: "500",
//     textAlign: "center",
//     padding: Sizes.xs,
//     color: Colors.white,
//   },

//   // Products
//   productsGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   productItem: {
//     width: (width - Sizes.md * 3) / 2,
//     marginBottom: Sizes.md,
//     backgroundColor: Colors.white,
//     borderRadius: Sizes.sm,
//     padding: Sizes.sm,
//     elevation: 2,
//   },
//   productImageBox: {
//     width: "100%",
//     aspectRatio: 1,
//     borderRadius: Sizes.sm,
//     overflow: "hidden",
//     backgroundColor: "#f5f5f5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: Sizes.sm,
//   },
//   productImage: { width: "100%", height: "100%" },
//   noImage: { fontSize: 32 },
//   productName: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: Colors.textPrimary,
//     marginBottom: Sizes.xs,
//   },
//   productPrice: { fontSize: 14, fontWeight: "bold", color: Colors.primary },

//   // Loading / Empty
//   loadingText: {
//     textAlign: "center",
//     color: Colors.textSecondary,
//     fontSize: 16,
//     padding: Sizes.lg,
//   },
//   errorText: {
//     textAlign: "center",
//     color: Colors.error,
//     fontSize: 16,
//     padding: Sizes.lg,
//   },
//   emptySearch: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: Sizes.lg,
//   },
//   emptySearchIcon: { fontSize: 48, marginBottom: Sizes.md },
//   emptySearchText: { fontSize: 16, marginBottom: Sizes.sm },
//   emptySearchSubtext: { fontSize: 14, color: Colors.textSecondary },
//   userBox: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//     marginLeft: Sizes.md,
//     flexShrink: 1,
//   },
// });
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "@/src/context/CartContext";
import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";

import { BannerSlider } from "@/src/screens/home/components/BannerSlider";
import { CategoryGrid } from "@/src/screens/home/components/CategoryGrid";
import { ProductList } from "@/src/screens/home/components/ProductList";
import { useHomeData } from "@/src/screens/home/hooks/useHomeData";
import { Header } from "./components/Header";

export default function HomeScreen() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { user, loading } = useHomeData();

  const {
    products,
    category,
    refreshing,
    handleRefresh,
    currentBannerIndex,
    setCurrentBannerIndex,
    bannerRef,
  } = useHomeData();

  const handleProductPress = (masp: number) => {
    router.push({ pathname: "/product/[id]", params: { id: masp.toString() } });
  };

  const handleCategoryPress = (maloai: number) => {
    console.log("Chọn danh mục:", maloai);
    // router.push(`/category/${maloai}`);
  };

  const banners = [
    {
      id: 1,
      title: "Khuyến mãi lớn",
      subtitle: "Giảm giá lên đến 50%",
      color: Colors.primary,
      image:
        "https://www.dichvuinnhanh.com/wp-content/uploads/2025/04/hinh-nen-dep-anh-dep-innhanh.pro_.vn-1.webp",
    },
    {
      id: 2,
      title: "Siêu sale 8.8",
      subtitle: "Giảm ngay 100K",
      color: "#FF6B6B",
      image:
        "https://www.dichvuinnhanh.com/wp-content/uploads/2025/04/hinh-nen-dep-anh-dep-innhanh.pro_.vn-1.webp",
    },
    {
      id: 3,
      title: "Miễn phí vận chuyển",
      subtitle: "Đơn từ 0đ",
      color: "#4ECDC4",
      image:
        "https://www.dichvuinnhanh.com/wp-content/uploads/2025/04/hinh-nen-dep-anh-dep-innhanh.pro_.vn-1.webp",
    },
  ];


  return (
    <SafeAreaView style={styles.container}>
      {!loading && (
        <Header user={user} onLoginPress={() => router.push("/login")} />
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <BannerSlider
          banners={banners}
          bannerRef={bannerRef}
          currentIndex={currentBannerIndex}
          setCurrentIndex={setCurrentBannerIndex}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
          <CategoryGrid categories={category} onPress={handleCategoryPress} />
        </View>

        {products.some((p) => p.noibat === 1) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
            <ProductList
              products={products.filter((p) => p.noibat === 1)}
              onPress={handleProductPress}
              horizontal
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
          <ProductList products={products} onPress={handleProductPress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  section: { padding: Sizes.md },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: Sizes.md },
});
