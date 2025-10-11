"use client";

import { Table, Tag, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Order from "@/app/types/order";
import { data } from "framer-motion/client";

interface OrderTableProps {
  data: Order[];
  loading?: boolean;
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
  onRowClick?: (order: Order) => void;
}

export const OrderTable = ({
    data,
    loading = false,
    onEdit,
    onDelete,
    onRowClick
}: OrderTableProps) => {
    const columns = [
      { title: "Numerical", dataIndex: "numerical", key: "numerical" },
      {
        title: "Code customer",
        dataIndex: "makh",
        key: "codecustomer",
      },
      { title: "Date order", dataIndex: "ngaydat", key: "dateorder" },
      { title: "Total", dataIndex: "tongtien", key: "total" },
      { title: "Status", dataIndex: "matrangthai", key: "status" },
      { title: "Address", dataIndex: "diachi_giao", key: "address" },
      {
        title: "Payment method",
        dataIndex: "paymentMethod",
        key: "paymentmethod",
      },
      {
        title: "Action",
        key: "action",
        render: (_: any, record: Order) => (
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record)}
              disabled={record.matrangthai === 0}
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
        rowKey="madh"
        pagination={{ pageSize: 10 }}
        scroll={{ y: 420 }}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record), // 👈 gọi hàm khi click dòng
        })}
      />
    );
}