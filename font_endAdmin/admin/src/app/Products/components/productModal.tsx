"use client";

import { Button, Col, Form, Input, Row, Typography, Upload } from "antd";
import Product from "@/app/types/product";
import { useEffect } from "react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (values: Product, file?: File) => void; // 👈 truyền thêm file
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

  const handleSubmit = (values: any) => {
    let file: File | undefined;
    if (values.hinhanh && values.hinhanh.length > 0) {
      const f = values.hinhanh[0];
      if (f.originFileObj) file = f.originFileObj; // file mới
    }
    onSave(values, file);
  };

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        masp: product.masp,
        hinhanh: product.hinhanh
          ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: product.hinhanh,
              },
            ]
          : [],
      } as any);
    } else {
      form.resetFields();
    }
  }, [product, form, isOpen]);

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

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* cái này nhớ phải nhét thêm mã vào không thì khoogn update được */}
          <Row gutter={16}>
            <Col>
              <Form.Item
                name="masp"
                // rules={[{ required: true }]}
                style={{ display: "none" }}
              >
                <Input type="hidden" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tensp"
                label="Tên sản phẩm"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="thuonghieu" label="Thương hiệu">
                <Input placeholder="Nhập thương hiệu" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gia" label="Giá" rules={[{ required: true }]}>
                <Input type="number" placeholder="Nhập giá" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="mausac" label="Màu sắc">
                <Input placeholder="Nhập màu sắc" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="kieudang" label="Kiểu dáng">
                <Input placeholder="Nhập kiểu dáng" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="kichthuoc" label="Kích thước">
                <Input placeholder="Nhập kích thước" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="chatlieu" label="Chất liệu">
                <Input placeholder="Nhập chất liệu" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hinhanh"
                label="Hình ảnh sản phẩm"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false} // ⚡ không upload tự động
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
