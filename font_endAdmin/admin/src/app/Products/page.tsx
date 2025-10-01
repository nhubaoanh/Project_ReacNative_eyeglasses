"use client";
import React, { useState } from "react";
import { Space, Table, Tag, Button, Modal, Form, Input, message } from "antd";

const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const initialData: DataType[] = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const Products: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  const handleEdit = (record: DataType) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleDelete = (record: DataType) => {
    setData((prev) => prev.filter((item) => item.key !== record.key));
    message.success("Đã xóa thành công");
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingRecord) {
        // cập nhật
        setData((prev) =>
          prev.map((item) =>
            item.key === editingRecord.key ? { ...item, ...values } : item
          )
        );
        message.success("Cập nhật thành công");
      } else {
        // thêm mới
        const newRecord: DataType = {
          key: Date.now().toString(),
          ...values,
          tags: values.tags ? values.tags.split(",") : [],
        };
        setData((prev) => [...prev, newRecord]);
        message.success("Thêm mới thành công");
      }
      setIsModalOpen(false);
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý Users</h1>
        <Button type="primary" onClick={handleAdd}>
          Thêm mới
        </Button>
      </div>

      <Table<DataType> dataSource={data} rowKey="key" bordered>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: string[]) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <a onClick={() => handleEdit(record)}>Edit</a>
              <a onClick={() => handleDelete(record)}>Delete</a>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={editingRecord ? "Cập nhật User" : "Thêm User mới"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        okText={editingRecord ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Nhập First Name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Nhập Last Name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Nhập Age" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Nhập Address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Input placeholder="Nhập tags, cách nhau bằng dấu phẩy" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
