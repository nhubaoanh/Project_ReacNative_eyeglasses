import express from 'express';
var router = express.Router();
import sanpham_chitietController from '../controllers/sanpham_chitiet.controller';

router.get('/', sanpham_chitietController.getAll);
router.get('/:id', sanpham_chitietController.getById);
router.post('/', sanpham_chitietController.insert);
router.put('/:id', sanpham_chitietController.update);
router.delete('/:id', sanpham_chitietController.delete);

export default router;
