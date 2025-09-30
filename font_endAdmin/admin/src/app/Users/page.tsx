"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import productService from "../services/product.service";
import Product from "../types/product";

const { Column } = Table;

interface DataType {
  STT: number;
  productId: number;
  name: string; // tensp
  categoryId: number; // maloai
  brand: string; // thuonghieu
  img: string; // hinhanh
  price: number; // gia
  color: string; // mausac
  tyle: string; // kieudang
  size: string; // kichthuoc
  material: string; // chatlieu
  tags: string[]; // ✅ thêm tags để match với render
}

const Users: React.FC = () => {
  const [items, setItems] = useState<DataType[]>([]);

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    try {
      const res = await productService.getAllProducts();
      const products: Product[] = res.data ?? [];

      // map Product -> DataType để Table dùng
      const mapped = products.map((p, index) => ({
        STT: index + 1,
        productId: p.masp ?? index, // fallback nếu masp null
        name: p.tensp,
        categoryId: p.maloai,
        brand: p.thuonghieu,
        img: p.hinhanh,
        price: p.gia,
        color: p.mausac,
        tyle: p.kieudang,
        size: p.kichthuoc,
        material: p.chatlieu,
        tags: [p.thuonghieu, p.mausac].filter(Boolean) as string[], // ví dụ tự tạo tags
      }));

      setItems(mapped);
    } catch (error) {
      console.error("Fetch products failed:", error);
    }
  };

  return (
    <Table<DataType> dataSource={items} rowKey="productId">
      <Column title="STT" dataIndex="STT" key="STT" />
      <Column title="productId" dataIndex="productId" key="productId" />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="categoryId" dataIndex="categoryId" key="categoryId" />
      <Column title="brand" dataIndex="brand" key="brand" />
      <Column title="color" dataIndex="color" key="color" />
      <Column title="tyle" dataIndex="tyle" key="tyle" />
      <Column title="size" dataIndex="size" key="size" />
      <Column title="material" dataIndex="material" key="material" />
      <Column title="Price" dataIndex="price" key="price" />
      <Column title="CategoryId" dataIndex="categoryId" key="categoryId" />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => (
          <Space size="middle">
            <a>Edit {record.name}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  );
};

export default Users;
