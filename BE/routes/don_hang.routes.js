import express from 'express';
var router = express.Router();
import don_hangController from '../controllers/don_hang.controller.js';
import db from '../common/db.js';

router.get('/', don_hangController.getAll);
router.get('/:id', don_hangController.getById);
router.post('/', don_hangController.insert);
router.put('/:id', don_hangController.update);
router.delete('/:id', don_hangController.delete);

// GET /orders -> lấy danh sách đơn hàng kèm items
// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await db.query(
//       `SELECT 
//         dh.madh, dh.makh, dh.ngaydat, dh.tongtien, dh.matrangthai, dh.diachi_giao,
//         ctdh.masp, ctdh.soluong, ctdh.dongia,
//         sp.tensp, sp.hinhanh
//       FROM don_hang dh
//       LEFT JOIN ct_don_hang ctdh ON dh.madh = ctdh.madh
//       LEFT JOIN san_pham sp ON ctdh.masp = sp.masp
//       ORDER BY dh.madh DESC`
//     );

//     // gom nhóm order + items
//     const orders = [];
//     const orderMap = {};

//       rows.forEach(row => {
//       if (!orderMap[row.madh]) {
//         orderMap[row.madh] = {
//           madh: row.madh,
//           makh: row.makh,
//           ngaydat: row.ngaydat,
//           tongtien: row.tongtien,
//           matrangthai: row.matrangthai,
//           diachi_giao: row.diachi_giao,
//           items: []
//         };
//         orders.push(orderMap[row.madh]);
//       }

//       if (row.masp) {
//         orderMap[row.madh].items.push({
//           masp: row.masp,
//           tensp: row.tensp,
//           hinhanh: row.hinhanh,
//           soluong: row.soluong,
//           dongia: row.dongia
//         });
//       }
//     });

//     res.json({ success: true, data: orders });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Lỗi server" });
//   }}
// );

export default router;
