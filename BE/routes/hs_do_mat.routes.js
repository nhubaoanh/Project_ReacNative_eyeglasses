import express from 'express';
var router = express.Router();
import hs_do_matController from '../controllers/hs_do_mat.controller.js';

router.get('/', hs_do_matController.getAll);
router.get('/:id', hs_do_matController.getById);
router.post('/', hs_do_matController.insert);
router.put('/:id', hs_do_matController.update);
router.delete('/:id', hs_do_matController.delete);

export default router;
