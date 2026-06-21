import { Router } from 'express';
import { getPredictions, createPrediction } from './prediction.controller';

const router = Router();

router.get('/', getPredictions);
router.post('/', createPrediction);

export default router;
