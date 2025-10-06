import san_pham from "../models/san_pham.model.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const san_phamController = {
  getAll: (req, res) => {
    san_pham.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    san_pham.getById(req.params.id, (err, product) => {
      if (err) return res.status(500).json({ success: false, error: err });
      res.json(product); // trả về object thay vì array
    });
  },

  insert: (req, res) => {
    const data = { ...req.body };
    san_pham.insert(data, (result) => {
      console.log("🔍 Insert result:", result);
      res.json({
        success: result.success,
        message: result.success
          ? "Thêm sản phẩm thành công"
          : "Không thêm được sản phẩm",
        data: result,
      });
    });
  },

  update: (req, res) => {
    try {
      const id = req.params.id;
      const data = { ...req.body };

      // console.log("=== BACKEND UPDATE ===");
      // console.log("Product ID:", id);
      // console.log("Data received:", data);

      // Chỉ xóa những field undefined, vẫn giữ "" hoặc URL
      const updateData = {
        tensp: data.tensp,
        thuonghieu: data.thuonghieu,
        gia: data.gia,
        mausac: data.mausac,
        kieudang: data.kieudang,
        kichthuoc: data.kichthuoc,
        chatlieu: data.chatlieu,
        mota: data.mota,
        tonkho: data.tonkho,
        hinhanh: data.hinhanh || "", // nếu frontend gửi URL, vẫn dùng URL
      };

      Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined) delete updateData[key];
      });

      san_pham.update(updateData, id, (result) => {
        return res.json({
          success: true,
          message: result,
          hinhanh: updateData.hinhanh,
        });
      });
    } catch (err) {
      console.error("Update product error:", err);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },
  delete: (req, res) => {
    const id = req.params.id;
    san_pham.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xoá sản phẩm:", err);
        return res
          .status(500)
          .send({ message: "Lỗi khi xoá sản phẩm", error: err });
      }
      res.status(200).send({ message: result });
    });
  },
};
export default san_phamController