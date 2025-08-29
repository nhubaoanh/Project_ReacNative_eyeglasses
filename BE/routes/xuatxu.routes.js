import express from 'express';
var router = express.Router();
import xuatxuController from '../controllers/xuatxu.controller';

router.get('/', xuatxuController.getAll);
router.get('/:id', xuatxuController.getById);
router.post('/', xuatxuController.insert);
router.put('/:id', xuatxuController.update);
router.delete('/:id', xuatxuController.delete);

export default router;
