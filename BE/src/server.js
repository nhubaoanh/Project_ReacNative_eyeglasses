import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import sanphamRoutes from "../routes/san_pham.routes.js";
import khachhangRoutes from "../routes/khach_hang.routes.js";
import nhacungcapRoutes from "../routes/nha_cung_cap.routes.js";
import nhanvienRoutes from "../routes/nhan_vien.routes.js";
import baohanhRoutes from "../routes/bao_hanh.routes.js";
import chitietdonhangRoutes from "../routes/ct_don_hang.routes.js";
import chitietnhapRoutes from "../routes/ct_nhap.routes.js";
import chitietsanphamRoutes from "../routes/ct_san_pham.routes.js";
import donhangRoutes from "../routes/don_hang.routes.js";
import giaodichRoutes from "../routes/giao_dich.routes.js";
import hangRoutes from "../routes/hang_tv.routes.js";
import hoadonnhapRoutes from "../routes/hoa_don_nhap.routes.js";
import hosodomatRoutes from "../routes/hs_do_mat.routes.js";
import khuyenmaiRoutes from "../routes/khuyen_mai.routes.js";
import lichhenRoutes from "../routes/lich_hen.routes.js";
import loaigiaodichRoutes from "../routes/loai_giao_dich.routes.js";
import loaisanphamRoutes from "../routes/loai_san_pham.routes.js";
import phanhoiRoutes from "../routes/phan_hoi.routes.js";
import phieugiamgiaRoutes from "../routes/phieu_giam_gia.routes.js";
import ptttRoutes from "../routes/pttt.routes.js";
import trangthaibaohanhRoutes from "../routes/trang_thai_bao_hanh.routes.js";
import vaitroRoutes from "../routes/vai_tro_nv.routes.js";
import trangthaidonhangRoutes from "../routes/trang_thai_don_hang.routes.js";
import trangthailichhenRoutes from "../routes/trang_thai_lich_hen.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
const port = process.env.PORT || 7890;

// serve static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

// dùng routes

app.use("/api/sanpham", sanphamRoutes);
app.use("/api/khachhang", khachhangRoutes);
app.use("/api/nhacungcap", nhacungcapRoutes);
app.use("/api/nhanvien", nhanvienRoutes);
app.use("/api/baohanh", baohanhRoutes);
app.use("/api/chitietdonhang", chitietdonhangRoutes);
app.use("/api/chitietnhap", chitietnhapRoutes);
app.use("/api/chitietsanpham", chitietsanphamRoutes);
app.use("/api/giaodich", giaodichRoutes);
app.use("/api/hang", hangRoutes);
app.use("/api/hoadonnhap", hoadonnhapRoutes);
app.use("/api/hosodomat", hosodomatRoutes);
app.use("/api/khuyenmai", khuyenmaiRoutes);
app.use("/api/lichhen", lichhenRoutes);
app.use("/api/loaigiaodich", loaigiaodichRoutes);
app.use("/api/loaisanpham", loaisanphamRoutes);
app.use("/api/phanhoi", phanhoiRoutes);
app.use("/api/phieugiamgia", phieugiamgiaRoutes);
app.use("/api/pttt", ptttRoutes);
app.use("/api/trangthaibaohanh", trangthaibaohanhRoutes);
app.use("/api/vaitro", vaitroRoutes);
app.use("/api/trangthaidonhang", trangthaidonhangRoutes);
app.use("/api/trangthailichhen", trangthailichhenRoutes);
app.use("/api/orders", donhangRoutes);



app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});