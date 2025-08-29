import express from 'express';
var router = express.Router();
import hoadonnhapchitietController from '../controllers/hoadonnhapchitiet.controller';

router.get('/', hoadonnhapchitietController.getAll);
router.get('/:id', hoadonnhapchitietController.getById);
router.post('/', hoadonnhapchitietController.insert);
router.put('/:id', hoadonnhapchitietController.update);
router.delete('/:id', hoadonnhapchitietController.delete);

export default router;
