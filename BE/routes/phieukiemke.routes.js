import express from 'express';
var router = express.Router();
import phieukiemkeController from '../controllers/phieukiemke.controller';

router.get('/', phieukiemkeController.getAll);
router.get('/:id', phieukiemkeController.getById);
router.post('/', phieukiemkeController.insert);
router.put('/:id', phieukiemkeController.update);
router.delete('/:id', phieukiemkeController.delete);

export default router;
