import express from 'express';
var router = express.Router();
import bao_hanhController from '../controllers/bao_hanh.controller.js';

router.get('/', bao_hanhController.getAll);
router.get('/:id', bao_hanhController.getById);
router.post('/', bao_hanhController.insert);
router.put('/:id', bao_hanhController.update);
router.delete('/:id', bao_hanhController.delete);

export default router;
