import { Router } from 'express';
import { getCurrentPrice, getHistoricalPrices } from './market.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { currentPriceSchema, historyPriceSchema } from './market.validation';

const router = Router();

// Current Live Agmarknet Price
router.get('/current', authenticate, validate(currentPriceSchema), getCurrentPrice);

// Last 30 days history Agmarknet Prices
router.get('/history', authenticate, validate(historyPriceSchema), getHistoricalPrices);

export default router;
