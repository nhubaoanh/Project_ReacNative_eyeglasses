"use client";

import { Button, Col, Form, Input, Row, Typography } from "antd";
import Order from "../../types/order";
import { useEffect } from "react";

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order;
    onSave: (order: Order) => void;
    loading?: boolean;
}

export const OrderModal = ({
    isOpen,
    onClose,
    order,
    onSave,
    loading,
}: OrderModalProps) => {
    const [form] = Form.useForm<Order>();

    const handleSubmit = (values: any) => {
        onSave(values);
    };

    useEffect(() => {
        if (order) {
            form.setFieldsValue(order);
        } else {
            form.resetFields();
        }
    }, [order, form, isOpen]);

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 ${
                isOpen ? "block" : "hidden"
            }`}
        >
            <div className="bg-white p-6 rounded-lg w-2/3">
                <Typography.Title level={4} className="mb-4">
                    {order ? "Cập nhật đơn hàng" : "Tạo đơn hàng"}
                </Typography.Title>

                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Row gutter={16}>
                        <Col>
                            <Form.Item
                                label="Mã đơn hàng"
                                name="madh"
                                // rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col>
                            <Form.Item
                                label="Mã khách hàng"
                                name="makh"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col>
                            <Form.Item
                                label="Ngày đặt"
                                name="ngaydat"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col>
                            <Form.Item
                                label="Trạng thái"
                                name="trangthai"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="flex justify-end">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Lưu
                        </Button>
                        <Button onClick={onClose}>Hủy</Button>
                    </div>  
                </Form>
            </div>
        </div>
    )
}