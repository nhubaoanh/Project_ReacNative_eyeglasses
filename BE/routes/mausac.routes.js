import express from 'express';
var router = express.Router();
import mausacController from '../controllers/mausac.controller';

router.get('/', mausacController.getAll);
router.get('/:id', mausacController.getById);
router.post('/', mausacController.insert);
router.put('/:id', mausacController.update);
router.delete('/:id', mausacController.delete);

export default router;
