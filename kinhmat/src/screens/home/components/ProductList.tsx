import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import { Sizes } from "@/constants/sizes";
import { Colors } from "@/constants/colors";
import apiService from "@/src/service/apiService";
import ProductType from "@/src/types/product";

const { width } = Dimensions.get("window");

interface ProductListProps {
  products: ProductType[];
  onPress?: (masp: number) => void;
  horizontal?: boolean; // true = scroll ngang
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onPress,
  horizontal = false,
}) => {
  if (horizontal) {
    // Scroll ngang cho sản phẩm nổi bật
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products
          .filter((p) => p.masp !== undefined)
          .map((item) => (
            <TouchableOpacity
              key={item.masp}
              style={{
                width: (width - Sizes.md * 3) / 2,
                backgroundColor: Colors.white,
                borderRadius: Sizes.sm,
                padding: Sizes.sm,
                marginRight: Sizes.sm,
              }}
              onPress={() => onPress?.(item.masp!)}
            >
              <View
                style={{
                  width: "100%",
                  aspectRatio: 1,
                  backgroundColor: "#f5f5f5",
                  borderRadius: Sizes.sm,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.hinhanh ? (
                  <Image
                    source={{ uri: apiService.getImageUrl(item.hinhanh) }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <Text style={{ fontSize: 32 }}>📦</Text>
                )}
              </View>
              <Text
                numberOfLines={2}
                style={{ fontWeight: "500", marginVertical: Sizes.xs }}
              >
                {item.tensp}
              </Text>
              <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
                {item.gia?.toLocaleString("vi-VN")} ₫
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    );
  }

  // Scroll dọc cho sản phẩm mới
  return (
    <FlatList
      data={products.filter((p) => p.masp !== undefined)}
      keyExtractor={(item) => item.masp!.toString()}
      numColumns={2} // 2 cột
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginBottom: Sizes.sm,
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            width: (width - Sizes.md * 3) / 2,
            backgroundColor: Colors.white,
            borderRadius: Sizes.sm,
            padding: Sizes.sm,
          }}
          onPress={() => onPress?.(item.masp!)}
        >
          <View
            style={{
              width: "100%",
              aspectRatio: 1,
              backgroundColor: "#f5f5f5",
              borderRadius: Sizes.sm,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.hinhanh ? (
              <Image
                source={{ uri: apiService.getImageUrl(item.hinhanh) }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Text style={{ fontSize: 32 }}>📦</Text>
            )}
          </View>
          <Text
            numberOfLines={2}
            style={{ fontWeight: "500", marginVertical: Sizes.xs }}
          >
            {item.tensp}
          </Text>
          <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
            {item.gia?.toLocaleString("vi-VN")} ₫
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default ProductList;
