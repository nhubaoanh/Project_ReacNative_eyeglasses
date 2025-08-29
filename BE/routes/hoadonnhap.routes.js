import express from 'express';
var router = express.Router();
import hoadonnhapController from '../controllers/hoadonnhap.controller';

router.get('/', hoadonnhapController.getAll);
router.get('/:id', hoadonnhapController.getById);
router.post('/', hoadonnhapController.insert);
router.put('/:id', hoadonnhapController.update);
router.delete('/:id', hoadonnhapController.delete);

export default router;
