import { Router } from 'express';
import { getCrops, getCropById, createCrop } from './crop.controller';

const router = Router();

router.get('/', getCrops);
router.get('/:id', getCropById);
router.post('/', createCrop);

export default router;
