import express from 'express';
var router = express.Router();
import lich_henController from '../controllers/lich_hen.controller.js';

router.get('/', lich_henController.getAll);
router.get('/:id', lich_henController.getById);
router.post('/', lich_henController.insert);
router.put('/:id', lich_henController.update);
router.delete('/:id', lich_henController.delete);

export default router;
