"use client";
import React, { useEffect, useState } from "react";
import { Alert, Button, message } from "antd";
import { ProductTable } from "./components/productTable";
import { ProductModal } from "./components/productModal";
import  Product  from "@/app/types/product";
import productService from "../services/product.service";
import apiService from "../services/apiservice";

// const initialData: Product[] = [
//   {
//     STT: 1,
//     productId: 101,
//     name: "Áo Thun Nam",
//     categoryId: 1,
//     brand: "Nike",
//     img: "https://via.placeholder.com/100",
//     price: 250000,
//     color: "Trắng",
//     tyle: "Thể thao",
//     size: "M",
//     material: "Cotton",
//     status: "active",
//   },
//   {
//     STT: 2,
//     productId: 102,
//     name: "Quần Jean",
//     categoryId: 2,
//     brand: "Levi's",
//     img: "https://via.placeholder.com/100",
//     price: 600000,
//     color: "Xanh",
//     tyle: "Casual",
//     size: "32",
//     material: "Jean",
//     status: "inactive",
//   },
// ];



const ProductsPage: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Product | null>(null);

  useEffect(() => {
    fetchdata();
  }, [data])

const fetchdata = async () => {
  try {
    const res = await productService.getAllProducts();

    const mappedData: Product[] = (res.data ?? []).map((item: any, index: number) => ({
      STT: index + 1,
      masp: item.masp,
      tensp: item.tensp,
      maloai: item.maLoai,
      thuonghieu: item.thuonghieu,
      hinhanh: apiService.getImageUrl(item.hinhanh),
      gia: item.gia,
      mausac: item.mausac,
      kieudang: item.kieudang,
      kichthuoc: item.kichthuoc,
      chatlieu: item.chatlieu,
    }));

    setData(mappedData);
    console.log("du lieu" ,data)
  } catch (err) {
    console.error(err);
  }
};




  const handleAdd = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingRecord(product);
    setIsModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setData((prev) =>
      prev.filter((item) => item.masp !== product.masp)
    );
    message.success("Đã xóa sản phẩm");
  };

  const handleSave = (values: Product) => {
    if (editingRecord) {
      setData((prev) =>
        prev.map((item) =>
          item.masp === editingRecord.masp
            ? { ...item, ...values }
            : item
        )
      );
      message.success("Cập nhật thành công");
    } 
    
    // else {
    //   const newProduct: Product = {
    //     ...values,
    //     masp: Date.now(),
    //     status: "active",
    //   };
    //   setData((prev) => [...prev, newProduct]);
    //   message.success("Thêm mới thành công");
    // }
    setIsModalOpen(false);
  };

  return (
    <div className="scrollbar">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý sản phẩm</h1>
        <Button type="primary" onClick={handleAdd}>
          Thêm sản phẩm
        </Button>
      </div>

      <ProductTable data={data} onEdit={handleEdit} onDelete={handleDelete} />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingRecord}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProductsPage;
