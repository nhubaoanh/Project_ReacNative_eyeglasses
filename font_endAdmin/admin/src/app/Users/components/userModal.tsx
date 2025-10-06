"use client";

import { Button, Col, Form, Input, Row, Typography } from "antd";
import User from "@/app/types/user";
import { useEffect } from "react";

interface UserModalProps {
    isOpen: boolean;
    onClose : () => void;
    user? : User | null;
    onSave : (values : User) => void;
    loading?: boolean;
}

export const UserModal = ({
    isOpen,
    onClose,
    user,
    onSave,
    loading = false
}: UserModalProps) =>{
    const [form] = Form.useForm<User>();

    const handleSubmit = (values: any) => {
        onSave(values);
    };
    useEffect(() => {
        if(user) {
            form.setFieldsValue({
                ...user,
                manv: user.manv,
                hoten: user.hoten,
                mavt: user.mavt,
                sdt: user.sdt,
                email: user.email,
                lichlv: user.lichlv,
                matkhau: user.matkhau
            }as any);
        }else{
            form.resetFields();
        }
    }, [user]);

    return (
      <div
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="bg-white p-6 rounded-lg w-2/3">
          <Typography.Title level={4} className="mb-4">
            {user ? "Cập nhật nhan vien" : "Thêm sản nhan vien"}
          </Typography.Title>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* cái này nhớ phải nhét thêm mã vào không thì khoogn update được */}
            <Row gutter={16}>
              <Col>
                <Form.Item
                  name="manv"
                  // rules={[{ required: true }]}
                  style={{ display: "none" }}
                >
                  <Input type="hidden" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Ho ten"
                  label="Họ tên"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tên Nhân viên" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="sdt" label="Số điện thoại">
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="email" label="Email">
                  <Input type="email" placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lichlv" label="lịch nhân viên">
                  <Input placeholder="Nhập lịch nhân viên" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="matkhau" label="mật khẩu">
                  <Input placeholder="Nhập mật khẩu" />
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={onClose}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Lưu
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
}