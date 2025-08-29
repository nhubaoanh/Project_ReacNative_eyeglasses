import express from 'express';
import cors from 'cors';

// Import routes
import sanphamRoutes from './routes/sanpham.routes.js';
import danhmucRoutes from './routes/danhmuc.routes.js';
import khachhangRoutes from './routes/khachhang.routes.js';
import nhanvienRoutes from './routes/nhanvien.routes.js';
import hoadonRoutes from './routes/hoadon.routes.js';
import hoadonchitietRoutes from './routes/hoadonchitiet.routes.js';
import hoadonnhapRoutes from './routes/hoadonnhap.routes.js';
import hoadonnhapchitietRoutes from './routes/hoadonnhapchitiet.routes.js';
import nhacungcapRoutes from './routes/nhacungcap.routes.js';
import khoRoutes from './routes/kho.routes.js';
import sanpham_chitietRoutes from './routes/sanpham_chitiet.routes.js';
import thongsokythuatRoutes from './routes/thongsokythuat.routes.js';
import mausacRoutes from './routes/mausac.routes.js';
import kichcoRoutes from './routes/kichco.routes.js';
import chatlieuRoutes from './routes/chatlieu.routes.js';
import kieudangRoutes from './routes/kieudang.routes.js';
import thuonghieuRoutes from './routes/thuonghieu.routes.js';
import xuatxuRoutes from './routes/xuatxu.routes.js';
import danhgiaRoutes from './routes/danhgia.routes.js';
import phieukiemkeRoutes from './routes/phieukiemke.routes.js';
import phieukiemke_chitietRoutes from './routes/phieukiemke_chitiet.routes.js';
import quyenRoutes from './routes/quyen.routes.js';
import adminRoutes from './routes/admin.routes.js';
import usersessionRoutes from './routes/usersession.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/sanpham', sanphamRoutes);
app.use('/api/danhmuc', danhmucRoutes);
app.use('/api/khachhang', khachhangRoutes);
app.use('/api/nhanvien', nhanvienRoutes);
app.use('/api/hoadon', hoadonRoutes);
app.use('/api/hoadonchitiet', hoadonchitietRoutes);
app.use('/api/hoadonnhap', hoadonnhapRoutes);
app.use('/api/hoadonnhapchitiet', hoadonnhapchitietRoutes);
app.use('/api/nhacungcap', nhacungcapRoutes);
app.use('/api/kho', khoRoutes);
app.use('/api/sanpham_chitiet', sanpham_chitietRoutes);
app.use('/api/thongsokythuat', thongsokythuatRoutes);
app.use('/api/mausac', mausacRoutes);
app.use('/api/kichco', kichcoRoutes);
app.use('/api/chatlieu', chatlieuRoutes);
app.use('/api/kieudang', kieudangRoutes);
app.use('/api/thuonghieu', thuonghieuRoutes);
app.use('/api/xuatxu', xuatxuRoutes);
app.use('/api/danhgia', danhgiaRoutes);
app.use('/api/phieukiemke', phieukiemkeRoutes);
app.use('/api/phieukiemke_chitiet', phieukiemke_chitietRoutes);
app.use('/api/quyen', quyenRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/usersession', usersessionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export const viteNodeApp = app;
