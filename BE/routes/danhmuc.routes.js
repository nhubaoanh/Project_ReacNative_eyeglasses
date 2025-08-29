import express from 'express';
var router = express.Router();
import danhmucController from '../controllers/danhmuc.controller';

router.get('/', danhmucController.getAll);
router.get('/:id', danhmucController.getById);
router.post('/', danhmucController.insert);
router.put('/:id', danhmucController.update);
router.delete('/:id', danhmucController.delete);

export default router;
