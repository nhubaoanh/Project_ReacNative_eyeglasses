"use client";
import { Button, Col, Form, Input, Row, Typography } from "antd";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any; // Replace with your product type
  onSave: (values: any) => void;
  loading?: boolean;
}

export const ProductModal = ({
  isOpen,
  onClose,
  product,
  onSave,
  loading = false,
}: ProductModalProps) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSave(values);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg w-1/2">
        <Typography.Title level={4} className="mb-4">
          {product ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
        </Typography.Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={product || {}}
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              >
                <Input type="number" placeholder="Nhập giá" />
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
};
