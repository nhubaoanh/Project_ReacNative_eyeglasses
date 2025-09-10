import express from 'express';
var router = express.Router();
import phieu_giam_giaController from '../controllers/phieu_giam_gia.controller.js';

router.get('/', phieu_giam_giaController.getAll);
router.get('/:id', phieu_giam_giaController.getById);
router.post('/', phieu_giam_giaController.insert);
router.put('/:id', phieu_giam_giaController.update);
router.delete('/:id', phieu_giam_giaController.delete);

export default router;
