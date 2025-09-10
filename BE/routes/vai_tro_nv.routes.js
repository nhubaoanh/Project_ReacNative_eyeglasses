import express from 'express';
var router = express.Router();
import vai_tro_nvController from '../controllers/vai_tro_nv.controller.js';

router.get('/', vai_tro_nvController.getAll);
router.get('/:id', vai_tro_nvController.getById);
router.post('/', vai_tro_nvController.insert);
router.put('/:id', vai_tro_nvController.update);
router.delete('/:id', vai_tro_nvController.delete);

export default router;
