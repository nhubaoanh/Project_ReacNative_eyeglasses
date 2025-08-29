import express from 'express';
var router = express.Router();
import chatlieuController from '../controllers/chatlieu.controller';

router.get('/', chatlieuController.getAll);
router.get('/:id', chatlieuController.getById);
router.post('/', chatlieuController.insert);
router.put('/:id', chatlieuController.update);
router.delete('/:id', chatlieuController.delete);

export default router;
