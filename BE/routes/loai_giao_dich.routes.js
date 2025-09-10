import express from 'express';
var router = express.Router();
import loai_giao_dichController from '../controllers/loai_giao_dich.controller.js';

router.get('/', loai_giao_dichController.getAll);
router.get('/:id', loai_giao_dichController.getById);
router.post('/', loai_giao_dichController.insert);
router.put('/:id', loai_giao_dichController.update);
router.delete('/:id', loai_giao_dichController.delete);

export default router;
