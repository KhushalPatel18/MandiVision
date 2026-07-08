import { Router } from 'express';
import { getPrices, getPriceById, createPrice, getHistory } from './price.controller';

const router = Router();

router.get('/history', getHistory);
router.get('/', getPrices);
router.get('/:id', getPriceById);
router.post('/', createPrice);

export default router;

