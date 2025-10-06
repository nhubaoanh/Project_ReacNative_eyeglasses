"use client";

import { Table, Tag, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import User from "../../types/user";

interface UserTableProp {
    data: User[];
    loading?: boolean;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export const UserTable = ({
    data,
    loading,
    onEdit,
    onDelete    
}: UserTableProp) => {
    const column = [
      { title: "STT", dataIndex: "STT", Key: "STT", width: 60 },
      { title: "Ho Ten", dataIndex: "hoten", key: "hoten" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "SDT", dataIndex: "sdt", key: "sdt" },
      { title: "Lich Lanh", dataIndex: "lichlv", key: "lichlv" },
      { title: "Mat Khau", dataIndex: "matkhau", key: "matkhau" },
      {
        title: "Vai Trò",
        dataIndex: "mavt",
        key: "mavt",
        render: (role: number) => {
          let color = "blue";
          let text = "";

          switch (role) {
            case 0:
              color = "green";
              text = "Bán hàng";
              break;
            case 1:
              color = "cyan";
              text = "Bác sĩ";
              break;
            case 2:
              color = "orange";
              text = "Nhân viên kho";
              break;
            case 3:
              color = "purple";
              text = "Quản lý";
              break;
            default:
              color = "red";
              text = "Không xác định";
              break;
          }

          return <Tag color={color}>{text}</Tag>;
        },
      },
      {
        title: "Action",
        key: "action",
        render: (_: any, record: User) => (
          <Space size="middle">
            <Button type="primary" onClick={() => onEdit(record)}>
              <EditOutlined />
            </Button>
            <Button type="primary" danger onClick={() => onDelete(record)}>
              <DeleteOutlined />
            </Button>
          </Space>
        ),
      },
    ];

    return (
        <Table
            columns={column}
            dataSource={data}
            loading={loading}
            rowKey="manv"
            pagination={{ pageSize: 10 }}
            scroll={{ y: 420 }}
        />
    )
}
