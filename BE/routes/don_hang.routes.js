import express from 'express';
var router = express.Router();
import don_hangController from '../controllers/don_hang.controller.js';

router.get('/', don_hangController.getAll);
router.get('/:id', don_hangController.getById);
router.post('/', don_hangController.insert);
router.put('/:id', don_hangController.update);
router.delete('/:id', don_hangController.delete);

export default router;
