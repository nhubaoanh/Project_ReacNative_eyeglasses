import express from 'express';
var router = express.Router();
import ptttController from '../controllers/pttt.controller.js';

router.get('/', ptttController.getAll);
router.get('/:id', ptttController.getById);
router.post('/', ptttController.insert);
router.put('/:id', ptttController.update);
router.delete('/:id', ptttController.delete);

export default router;
