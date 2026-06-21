import { Router } from 'express';
import { getSummary, getPriceTrends } from './analytics.controller';

const router = Router();

router.get('/summary', getSummary);
router.get('/trends', getPriceTrends);

export default router;
