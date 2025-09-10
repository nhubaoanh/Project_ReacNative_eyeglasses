import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import sanphamRoutes from "../routes/san_pham.routes.js";
import khachhangRoutes from "../routes/khach_hang.routes.js";
import nhacungcapRoutes from "../routes/nha_cung_cap.routes.js";
import nhanvienRoutes from "../routes/nhan_vien.routes.js";


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

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});