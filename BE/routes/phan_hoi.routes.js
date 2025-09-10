import express from 'express';
var router = express.Router();
import phan_hoiController from '../controllers/phan_hoi.controller.js';

router.get('/', phan_hoiController.getAll);
router.get('/:id', phan_hoiController.getById);
router.post('/', phan_hoiController.insert);
router.put('/:id', phan_hoiController.update);
router.delete('/:id', phan_hoiController.delete);

export default router;
