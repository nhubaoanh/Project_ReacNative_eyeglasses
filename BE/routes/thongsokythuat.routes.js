import express from 'express';
var router = express.Router();
import thongsokythuatController from '../controllers/thongsokythuat.controller';

router.get('/', thongsokythuatController.getAll);
router.get('/:id', thongsokythuatController.getById);
router.post('/', thongsokythuatController.insert);
router.put('/:id', thongsokythuatController.update);
router.delete('/:id', thongsokythuatController.delete);

export default router;
