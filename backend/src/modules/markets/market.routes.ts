import { Router } from 'express';
import { getMarkets, getMarketById, createMarket } from './market.controller';

const router = Router();

router.get('/', getMarkets);
router.get('/:id', getMarketById);
router.post('/', createMarket);

export default router;
