import { Router } from 'express';
import { getPrices, getPriceById, createPrice } from './price.controller';

const router = Router();

router.get('/', getPrices);
router.get('/:id', getPriceById);
router.post('/', createPrice);

export default router;
