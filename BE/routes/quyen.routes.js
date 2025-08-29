import express from 'express';
var router = express.Router();
import quyenController from '../controllers/quyen.controller';

router.get('/', quyenController.getAll);
router.get('/:id', quyenController.getById);
router.post('/', quyenController.insert);
router.put('/:id', quyenController.update);
router.delete('/:id', quyenController.delete);

export default router;
