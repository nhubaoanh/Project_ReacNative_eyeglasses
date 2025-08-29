import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import { Button } from "@/src/components/ui/Button";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { useRouter } from 'expo-router';
import { mockProducts } from "@/src/lib/utils/mockData";
import { ProductCard } from "@/components/cards/ProductCard";
const { width } = Dimensions.get('window');

export default function HomeScreen(){
    const banners = [
        { title: "Khuyến mãi lớn", subtitle: "Giảm giá lên đến 50%" },
        { title: "Siêu sale 8.8", subtitle: "Giảm ngay 100K" },
        { title: "Miễn phí vận chuyển", subtitle: "Đơn từ 0đ" },
    ];
    const router = useRouter();
    const categories = [
            { id: 'glasses', name: 'Kính mắt', icon: '👓', color: '#007AFF' },
            { id: 'sunglasses', name: 'Kính râm', icon: '🕶️', color: '#34C759' },
            { id: 'frames', name: 'Gọng kính', icon: '👓', color: '#FF9500' },
            { id: 'lenses', name: 'Tròng kính', icon: '🔍', color: '#AF52DE' },
            { id: 'contact-lenses', name: 'Kính áp tròng', icon: '👁️', color: '#FF3B30' },
            { id: 'accessories', name: 'Phụ kiện kính', icon: '🧴', color: '#5856D6' },

        ];
    const featuredProducts = mockProducts.filter(product => product.isFeatured);

    // const handleCategoryPress = (category: string) => {
    //     router.push(`/category/${category}`);
    // };
      const handleProductPress = (productId: string) => {
            router.push({ pathname: "/product/[id]", params: { id: productId } });
        };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.textHeader}>Chào mừng bạn</Text>
                    <TouchableOpacity style={styles.cartButton}>
                        <Text style={styles.textIcon}>🛒
                            
                        </Text>
                        <View style={styles.cartBadge}>
                            <Text>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <Text style={styles.searchText}>Tìm kiếm sản phẩm ...</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.bannerContainer}>
                    <View style={styles.banner}>
                        <Text style={styles.bannerText}>Khuyen mai lon</Text>
                        <Text style={styles.bannerTextSub}>Giam gia len den 50%</Text>
                        <Button 
                        title="Xem ngay" 
                        onPress={() => {}} 
                        variant="primary"
                        size="small"
                        />
                    </View>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
                    <View style={styles.categoriesGrid}>
                        {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[styles.categoryItem, { backgroundColor: category.color + '20' }]}
                            onPress={() => {}}
                        >
                            <Text style={styles.categoryIcon}>{category.icon}</Text>
                            <Text style={[styles.categoryName, { color: category.color }]}>
                            {category.name}
                            </Text>
                        </TouchableOpacity>
                        ))}
                    </View>
                </View>
                {/* Featured Products */}
                <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
                    <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.seeAllText}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {featuredProducts.map((product) => (
                    <View key={product.id} style={styles.productContainer}>
                        <ProductCard
                        product={product} 
                        onPress={() => handleProductPress(product.id)}
                        />
                    </View>
                    ))}
                </ScrollView>
                </View>

                {/* New Arrivals */}
                <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
                <View style={styles.productsGrid}>
                    {mockProducts.slice(0, 4).map((product) => (
                    <View key={product.id} style={styles.productGridItem}>
                        <ProductCard 
                        product={product} 
                        onPress={() => handleProductPress(product.id)}
                        />
                    </View>
                    ))}
                </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: Colors.background,
    }, header: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Sizes.md,
        paddingTop: Sizes.sm,
        paddingBottom: Sizes.md,
    }, headerTop: {
        flexDirection: 'row',
        justifyContent : "space-between",
        alignItems: 'center',
        marginBottom: Sizes.sm
    }, textHeader:{
        fontSize : 18,
        fontWeight: 600,
        color: Colors.white
    },textIcon: {
        fontSize : 20
    }
    , cartButton: {
        position: 'relative',
        padding: Sizes.sm,
    }, cartBadge: {
        position: "absolute",
        top: 0,
        right : 0,
        backgroundColor : Colors.error,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },searchIcon : {
        fontSize : 17,
        marginRight: Sizes.sm,
        color: Colors.textSecondary
    },searchText: {
        color: Colors.secondary,
        fontSize: 16
    }
    ,searchBar: {
        flexDirection : 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: Sizes.sm,
        padding: Sizes.sm
    }, bannerContainer: {
        padding: Sizes.md
    }, banner :{
        backgroundColor: Colors.primary,
        borderRadius: Sizes.md,
        padding: Sizes.lg,
        alignItems : 'center'
    }, bannerText:{
        fontSize : 24,
        color: Colors.white,
        fontWeight: 'bold',
    },bannerTextSub: {
        color: Colors.white
    },sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Sizes.md,
  },section: {
    padding: Sizes.md,
  },seeAllText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (width - Sizes.md * 3) / 3,
    aspectRatio: 1,
    borderRadius: Sizes.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.sm,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: Sizes.xs,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.md,
  }, productContainer: {
    marginRight: Sizes.md,
    width: 160,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productGridItem: {
    width: (width - Sizes.md * 3) / 2,
    marginBottom: Sizes.md,
  },
})