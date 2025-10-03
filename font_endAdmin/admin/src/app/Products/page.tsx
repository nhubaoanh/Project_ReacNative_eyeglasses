"use client";
import React, { useEffect, useState } from "react";
import { Alert, Button, message } from "antd";
import { ProductTable } from "./components/productTable";
import { ProductModal } from "./components/productModal";
import  Product  from "@/app/types/product";
import productService from "../services/product.service";
import apiService from "../services/apiservice";
import { UploadFile } from "antd";
import { uploadToCloudinary } from "../utils/cloudinary";

const ProductsPage: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Product | null>(null);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await productService.getAllProducts();

      const mappedData: Product[] = (res.data ?? []).map(
        (item: any, index: number) => ({
          STT: index + 1,
          masp: item.masp,
          tensp: item.tensp,
          maloai: item.maLoai,
          thuonghieu: item.thuonghieu,
          hinhanh:
            typeof item.hinhanh === "string"
              ? apiService.getImageUrl(item.hinhanh)
              : "",
          gia: item.gia,
          mausac: item.mausac,
          kieudang: item.kieudang,
          kichthuoc: item.kichthuoc,
          chatlieu: item.chatlieu,
        })
      );

      setData(mappedData);
      console.log("du lieu", data);
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
    setData((prev) => prev.filter((item) => item.masp !== product.masp));
    message.success("Đã xóa sản phẩm");
  };

const handleSave = async (values: Product, file?: File) => {
  try {
    let imageUrl = values.hinhanh as string;

    // upload file lên Cloudinary nếu có
    if (file) {
      imageUrl = await uploadToCloudinary(file);
    }

    const productData: Product = { ...values, hinhanh: imageUrl };
    console.log("productData to save:", productData);

    if (values.masp) {
      // gửi JSON chứa URL lên backend
      const res = await productService.updateProduct(values.masp, productData);
      console.log(res);
      message.success("Cập nhật sản phẩm thành công!");
    } else {
      await productService.createProduct(productData);
      message.success("Thêm sản phẩm mới thành công!");
    }

    fetchdata();
    setIsModalOpen(false);
  } catch (err) {
    console.error(err);
    message.error("Có lỗi khi lưu sản phẩm");
  }
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
