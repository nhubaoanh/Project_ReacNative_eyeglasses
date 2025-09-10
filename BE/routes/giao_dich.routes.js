import express from 'express';
var router = express.Router();
import giao_dichController from '../controllers/giao_dich.controller.js';

router.get('/', giao_dichController.getAll);
router.get('/:id', giao_dichController.getById);
router.post('/', giao_dichController.insert);
router.put('/:id', giao_dichController.update);
router.delete('/:id', giao_dichController.delete);

export default router;
