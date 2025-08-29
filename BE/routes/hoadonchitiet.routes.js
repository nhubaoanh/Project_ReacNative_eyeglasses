import express from 'express';
var router = express.Router();
import hoadonchitietController from '../controllers/hoadonchitiet.controller';

router.get('/', hoadonchitietController.getAll);
router.get('/:id', hoadonchitietController.getById);
router.post('/', hoadonchitietController.insert);
router.put('/:id', hoadonchitietController.update);
router.delete('/:id', hoadonchitietController.delete);

export default router;
