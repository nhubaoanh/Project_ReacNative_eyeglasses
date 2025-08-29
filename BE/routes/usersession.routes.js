import express from 'express';
var router = express.Router();
import usersessionController from '../controllers/usersession.controller';

router.get('/', usersessionController.getAll);
router.get('/:id', usersessionController.getById);
router.post('/', usersessionController.insert);
router.put('/:id', usersessionController.update);
router.delete('/:id', usersessionController.delete);

export default router;
