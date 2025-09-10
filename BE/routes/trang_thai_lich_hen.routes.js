import express from 'express';
var router = express.Router();
import trang_thai_lich_henController from '../controllers/trang_thai_lich_hen.controller.js';

router.get('/', trang_thai_lich_henController.getAll);
router.get('/:id', trang_thai_lich_henController.getById);
router.post('/', trang_thai_lich_henController.insert);
router.put('/:id', trang_thai_lich_henController.update);
router.delete('/:id', trang_thai_lich_henController.delete);

export default router;
