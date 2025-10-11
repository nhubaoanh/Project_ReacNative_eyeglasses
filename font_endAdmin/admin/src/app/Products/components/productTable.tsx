"use client";
import { Table, Tag, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import  Product  from "@/app/types/product";

interface ProductTableProps {
  data: Product[];
  loading?: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductTable = ({
  data,
  loading = false,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const columns = [
    { title: "STT", dataIndex: "STT", key: "STT" },
    { title: "Tên sản phẩm", dataIndex: "tensp", key: "tensp" },
    { title: "Thương hiệu", dataIndex: "thuonghieu", key: "thuonghieu" },
    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
      render: (price: number) => (
        <span>{new Intl.NumberFormat("vi-VN").format(price)} đ</span>
      ),
    },
    { title: "Màu sắc", dataIndex: "mausac", key: "mausac" },
    { title: "Kiểu dáng", dataIndex: "kieudang", key: "kieudang" },
    { title: "Kích thước", dataIndex: "kichthuoc", key: "kichthuoc" },
    { title: "Chất liệu", dataIndex: "chatlieu", key: "chatlieu" },
    {
      title: "Hình ảnh",
      dataIndex: "hinhanh",
      key: "hinhanh",
      render: (url: string) => (
        <img src={url} alt="product" className="w-12 h-12 object-cover" />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "action_flag",
      key: "action_flag",
      render: (status: number) => (
        <Tag color={status === 1 ? "green" : "red"}>
          {status === 1 ? "Còn hàng" : "Ngừng bán"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Product) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
            disabled={record.action_flag === 0} // vô hiệu hóa 
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="masp"
      pagination={{ pageSize: 10 }}
      scroll={{ y: 420 }}
    />
  );
};
