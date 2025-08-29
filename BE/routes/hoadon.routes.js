import express from 'express';
var router = express.Router();
import hoadonController from '../controllers/hoadon.controller';

router.get('/', hoadonController.getAll);
router.get('/:id', hoadonController.getById);
router.post('/', hoadonController.insert);
router.put('/:id', hoadonController.update);
router.delete('/:id', hoadonController.delete);

export default router;
