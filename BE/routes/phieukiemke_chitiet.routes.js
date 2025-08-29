import express from 'express';
var router = express.Router();
import phieukiemke_chitietController from '../controllers/phieukiemke_chitiet.controller';

router.get('/', phieukiemke_chitietController.getAll);
router.get('/:id', phieukiemke_chitietController.getById);
router.post('/', phieukiemke_chitietController.insert);
router.put('/:id', phieukiemke_chitietController.update);
router.delete('/:id', phieukiemke_chitietController.delete);

export default router;
