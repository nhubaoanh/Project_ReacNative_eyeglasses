"use client";
import { Table, Tag, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ProductTableProps {
  data: any[]; // Replace with your product type
  loading?: boolean;
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
}

export const ProductTable = ({
  data,
  loading = false,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <span>{new Intl.NumberFormat("vi-VN").format(price)} đ</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Hoạt động" : "Ngừng bán"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      render: (_: any, record: any) => (
        <Space size="middle">
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
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};
