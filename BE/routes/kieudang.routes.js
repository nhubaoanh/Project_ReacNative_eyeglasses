import express from 'express';
var router = express.Router();
import kieudangController from '../controllers/kieudang.controller';

router.get('/', kieudangController.getAll);
router.get('/:id', kieudangController.getById);
router.post('/', kieudangController.insert);
router.put('/:id', kieudangController.update);
router.delete('/:id', kieudangController.delete);

export default router;
