import express from 'express';
var router = express.Router();
import thuonghieuController from '../controllers/thuonghieu.controller';

router.get('/', thuonghieuController.getAll);
router.get('/:id', thuonghieuController.getById);
router.post('/', thuonghieuController.insert);
router.put('/:id', thuonghieuController.update);
router.delete('/:id', thuonghieuController.delete);

export default router;
