import { ProductCard } from "@/components/cards/ProductCard";
import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import { Button } from "@/src/components/ui/Button";
import apiService, { Product } from "@/src/service/apiService";
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
const { width } = Dimensions.get('window');

export default function HomeScreen(){
    const banners = [
        { id: 1, title: "Khuyến mãi lớn", subtitle: "Giảm giá lên đến 50%", color: Colors.primary },
        { id: 2, title: "Siêu sale 8.8", subtitle: "Giảm ngay 100K", color: "#FF6B6B" },
        { id: 3, title: "Miễn phí vận chuyển", subtitle: "Đơn từ 0đ", color: "#4ECDC4" },
    ];

    const categories = [
        { id: 1, name: "Gọng kính", icon: "👓", color: "#FF6B6B" },
        { id: 2, name: "Kính râm", icon: "🕶️", color: "#4ECDC4" },
        { id: 3, name: "Tròng kính", icon: "🔍", color: "#45B7D1" },
        { id: 4, name: "Phụ kiện", icon: "🎒", color: "#96CEB4" },
        { id: 5, name: "Hộp đựng", icon: "📦", color: "#FECA57" },
        { id: 6, name: "Khăn lau", icon: "🧽", color: "#FF9FF3" },
    ];

    const router = useRouter();
    const bannerRef = useRef<FlatList>(null);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    
    // State management
    const [products, setProducts] = useState<Product[]>([]);
    const [newProducts, setNewProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    // Auto-slide banner
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % banners.length;
                bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 3000); // Change banner every 3 seconds

        return () => clearInterval(interval);
    }, []);

    // Fetch data from API
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const productsRes = await apiService.getAllProducts();

            if (productsRes.success && productsRes.data) {
                setProducts(productsRes.data);
            }
            console.log("như bảo anh quá đẹp zai")

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Không thể tải dữ liệu. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    const handleCategoryPress = (categoryId: number) => {
        router.push(`/category/${categoryId}`);
    };

    const handleCartPress = () => {
        router.push('/cart');
    };

    const handleProductPress = (productId: number) => {
        router.push({ pathname: "/product/[id]", params: { id: productId.toString() } });
        console.log('Product ID:', productId);
        // console.log('Product name:', products.find((product) => product.masp === productId)?.tensp);
    };

    const renderBanner = ({ item }: { item: any }) => (
        <View style={[styles.banner, { backgroundColor: item.color }]}>
            <Text style={styles.bannerText}>{item.title}</Text>
            <Text style={styles.bannerTextSub}>{item.subtitle}</Text>
            <Button 
                title="Xem ngay" 
                onPress={() => {}} 
                variant="secondary"
                size="small"
            />
        </View>
    );

    const handleSearch = (text: string) => {
        setSearchText(text);
        const filtered = products.filter((product) => product.tensp.toLowerCase().includes(text.toLowerCase()));
        setFilteredProducts(filtered);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.textHeader}>Kính Mắt Store</Text>
                    <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
                        <Text style={styles.textIcon}>🛒</Text>
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput 
                        style={styles.searchText} 
                        value={searchText} 
                        onChangeText={handleSearch} 
                        placeholder="Tìm kiếm sản phẩm ..."
                    />
                </TouchableOpacity>
            </View>
            
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={handleRefresh} 
                    />
                }
            >
                {/* Auto-sliding Banner */}
                <View style={styles.bannerContainer}>
                    <FlatList
                        ref={bannerRef}
                        data={banners}
                        renderItem={renderBanner}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(event) => {
                            const index = Math.round(event.nativeEvent.contentOffset.x / width);
                            setCurrentBannerIndex(index);
                        }}
                    />
                    
                    {/* Banner indicators */}
                    <View style={styles.bannerIndicators}>
                        {banners.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.indicator,
                                    { backgroundColor: currentBannerIndex === index ? Colors.primary : Colors.textSecondary }
                                ]}
                            />
                        ))}
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
                                onPress={() => handleCategoryPress(category.id)}
                            >
                                <Text style={styles.categoryIcon}>{category.icon}</Text>
                                <Text style={[styles.categoryName, { color: category.color }]}>
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Search Results or Featured Products */}
                {searchText ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Kết quả tìm kiếm "{searchText}" ({filteredProducts.length} sản phẩm)
                        </Text>
                        {loading ? (
                            <Text style={styles.loadingText}>Đang tải...</Text>
                        ) : error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : filteredProducts.length > 0 ? (
                            <View style={styles.productsGrid}>
                                {filteredProducts.map((product) => (
                                    <View key={product.masp} style={styles.productGridItem}>
                                        <ProductCard 
                                            product={{
                                                masp: product.masp,
                                                tensp: product.tensp,
                                                gia: product.gia,
                                                hinhanh: product.hinhanh || '',
                                                maloai: product.maloai,
                                                thuonghieu: product.thuonghieu || '',
                                                mausac: product.mausac || '',
                                                kieudang: product.kieudang || '',
                                                kichthuoc: product.kichthuoc || '',
                                                chatlieu: product.chatlieu || '',
                                            }} 
                                            onPress={() => handleProductPress(product.masp || 0)}
                                        />
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <View style={styles.emptySearch}>
                                <Text style={styles.emptySearchIcon}>🔍</Text>
                                <Text style={styles.emptySearchText}>Không tìm thấy sản phẩm nào</Text>
                                <Text style={styles.emptySearchSubtext}>Thử tìm kiếm với từ khóa khác</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    <>
                        {/* Featured Products */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
                                <TouchableOpacity onPress={() => {}}>
                                    <Text style={styles.seeAllText}>Xem tất cả</Text>
                                </TouchableOpacity>
                            </View>
                            {loading ? (
                                <Text style={styles.loadingText}>Đang tải...</Text>
                            ) : error ? (
                                <Text style={styles.errorText}>{error}</Text>
                            ) : (
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {products.map((product) => (
                                        <View key={product.masp} style={styles.productContainer}>
                                            <ProductCard
                                                product={{
                                                    masp: product.masp,
                                                    tensp: product.tensp,
                                                    gia: product.gia || 0,
                                                    hinhanh: product.hinhanh || '',
                                                    maloai: product.maloai,
                                                    thuonghieu: product.thuonghieu || '',
                                                    mausac: product.mausac || '',
                                                    kieudang: product.kieudang || '',
                                                    kichthuoc: product.kichthuoc || '',
                                                    chatlieu: product.chatlieu || '',
                                                }} 
                                                onPress={() => handleProductPress(product.masp || 0)}
                                            />
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                        </View>

                        {/* New Arrivals */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
                            {loading ? (
                                <Text style={styles.loadingText}>Đang tải...</Text>
                            ) : error ? (
                                <Text style={styles.errorText}>{error}</Text>
                            ) : (
                                <View style={styles.productsGrid}>
                                    {products.slice().map((product) => (
                                        <View key={product.masp} style={styles.productGridItem}>
                                            <ProductCard 
                                                product={{
                                                    masp: product.masp,
                                                    tensp: product.tensp,
                                                    gia: product.gia,
                                                    hinhanh: product.hinhanh || '',
                                                    maloai: product.maloai,
                                                    thuonghieu: product.thuonghieu || '',
                                                    mausac: product.mausac || '',
                                                    kieudang: product.kieudang || '',
                                                    kichthuoc: product.kichthuoc || '',
                                                    chatlieu: product.chatlieu || '',
                                                }} 
                                                onPress={() => handleProductPress(product.masp || 0)}
                                            />
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: Colors.background,
    }, 
    header: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Sizes.md,
        paddingTop: Sizes.sm,
        paddingBottom: Sizes.md,
    }, 
    headerTop: {
        flexDirection: 'row',
        justifyContent : "space-between",
        alignItems: 'center',
        marginBottom: Sizes.sm
    }, 
    textHeader:{
        fontSize : 18,
        fontWeight: 600,
        color: Colors.white
    },
    textIcon: {
        fontSize : 20
    },
    cartButton: {
        position: 'relative',
        padding: Sizes.sm,
    }, 
    cartBadge: {
        position: "absolute",
        top: 0,
        right : 0,
        backgroundColor : Colors.error,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    cartBadgeText: {
        fontSize: 12,
        color: Colors.white
    },
    searchIcon : {
        fontSize : 17,
        marginRight: Sizes.sm,
        color: Colors.textSecondary
    }, 
    searchText: {
        color: Colors.secondary,
        fontSize: 16
    },
    searchBar: {
        flexDirection : 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: Sizes.sm,
        padding: Sizes.sm
    }, 
    bannerContainer: {
        padding: Sizes.md
    }, 
    banner :{
        backgroundColor: Colors.primary,
        borderRadius: Sizes.md,
        padding: Sizes.lg,
        alignItems : 'center',
        gap : Sizes.md,
        width: width - (Sizes.md * 2)
    }, 
    bannerText:{
        fontSize : 24,
        color: Colors.white,
        fontWeight: 'bold',
    }, 
    bannerTextSub: {
        color: Colors.white
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Sizes.md,
    },
    section: {
        padding: Sizes.md,
    },
    seeAllText: {
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
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Sizes.md,
    },
    productContainer: {
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
    loadingText: {
        textAlign: 'center',
        color: Colors.textSecondary,
        fontSize: 16,
        padding: Sizes.lg,
    },
    errorText: {
        textAlign: 'center',
        color: Colors.error,
        fontSize: 16,
        padding: Sizes.lg,
    },
    bannerIndicators: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Sizes.sm,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: Sizes.xs,
    },
    emptySearch: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: Sizes.lg,
    },
    emptySearchIcon: {
        fontSize: 48,
        marginBottom: Sizes.md,
    },
    emptySearchText: {
        fontSize: 16,
        marginBottom: Sizes.sm,
    },
    emptySearchSubtext: {
        fontSize: 14,
        color: Colors.textSecondary,
    }
})