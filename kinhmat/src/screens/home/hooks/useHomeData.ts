import { useEffect, useState, useRef } from "react";
import { Product } from "@/src/service/apiService";
import productService from "@/src/service/product.Service";
import categoryService from "@/src/service/category.service";
import { userStorage } from "@/src/utils/userStorage";
import Category from "@/src/types/category";
import { FlatList } from "react-native";

export const useHomeData = () => {
  const [user, setUser] = useState<{ userId: number; email: string } | null>(
    null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

//   const bannerRef = useRef(null);
const bannerRef = useRef<FlatList<any>>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const fetchUser = async () => {
    try {
      const currentUser = await userStorage.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error("Lỗi khi tải user:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAllProducts();
      if (res.success && res.data) {
        setProducts(res.data);
    }

    } catch (err) {
      setError("Không thể tải dữ liệu sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAllCategories();
      if (res.success && res.data) {
        // lọc bỏ category thiếu maloai
        const filtered: Category[] = res.data.filter(
          (c): c is Category => c.maloai !== undefined
        );
        setCategory(filtered);
      }
    } catch (err) {
      console.error("Lỗi load danh mục:", err);
    }
  };


  const handleSearch = (text: string) => {
    setSearchText(text);
    setFilteredProducts(
      products.filter((p) => p.tensp.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUser();
    fetchProducts();
    fetchCategories();
  }, []);

  return {
    user,
    products,
    category,
    loading,
    error,
    refreshing,
    handleRefresh,
    searchText,
    handleSearch,
    filteredProducts,
    currentBannerIndex,
    setCurrentBannerIndex,
    bannerRef,
  };
};
