"use client";
import { Button, Col, Form, Input, Row, Typography, Upload } from "antd";
import  Product  from "@/app/types/product";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (values: Product) => void;
  loading?: boolean;
}

export const ProductModal = ({
  isOpen,
  onClose,
  product,
  onSave,
  loading = false,
}: ProductModalProps) => {
  const [form] = Form.useForm<Product>();

  const handleSubmit = (values: Product) => {
    onSave(values);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg w-2/3">
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
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="brand" label="Thương hiệu">
                <Input placeholder="Nhập thương hiệu" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
                <Input type="number" placeholder="Nhập giá" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="color" label="Màu sắc">
                <Input placeholder="Nhập màu sắc" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="tyle" label="Kiểu dáng">
                <Input placeholder="Nhập kiểu dáng" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="size" label="Kích thước">
                <Input placeholder="Nhập kích thước" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="material" label="Chất liệu">
                <Input placeholder="Nhập chất liệu" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hinhanh"
                label="Hình ảnh sản phẩm"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) return e;
                  return e?.fileList;
                }}
                rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
              >
                <Upload
                  name="image"
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false} // ⚡ Không upload ngay, chỉ lưu file vào form
                >
                  <div>
                    <span>Chọn ảnh</span>
                  </div>
                </Upload>
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
