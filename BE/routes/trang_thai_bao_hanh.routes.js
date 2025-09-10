import express from 'express';
var router = express.Router();
import trang_thai_bao_hanhController from '../controllers/trang_thai_bao_hanh.controller.js';

router.get('/', trang_thai_bao_hanhController.getAll);
router.get('/:id', trang_thai_bao_hanhController.getById);
router.post('/', trang_thai_bao_hanhController.insert);
router.put('/:id', trang_thai_bao_hanhController.update);
router.delete('/:id', trang_thai_bao_hanhController.delete);

export default router;
