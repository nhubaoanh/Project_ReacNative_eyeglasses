import express from 'express';
var router = express.Router();
import khoController from '../controllers/kho.controller';

router.get('/', khoController.getAll);
router.get('/:id', khoController.getById);
router.post('/', khoController.insert);
router.put('/:id', khoController.update);
router.delete('/:id', khoController.delete);

export default router;
