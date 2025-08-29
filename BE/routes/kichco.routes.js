import express from 'express';
var router = express.Router();
import kichcoController from '../controllers/kichco.controller';

router.get('/', kichcoController.getAll);
router.get('/:id', kichcoController.getById);
router.post('/', kichcoController.insert);
router.put('/:id', kichcoController.update);
router.delete('/:id', kichcoController.delete);

export default router;
