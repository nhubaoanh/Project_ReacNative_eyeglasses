import express from 'express';
var router = express.Router();
import danhgiaController from '../controllers/danhgia.controller';

router.get('/', danhgiaController.getAll);
router.get('/:id', danhgiaController.getById);
router.post('/', danhgiaController.insert);
router.put('/:id', danhgiaController.update);
router.delete('/:id', danhgiaController.delete);

export default router;
