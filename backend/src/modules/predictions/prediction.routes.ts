import { Router } from 'express';
import { createPrediction, getPredictions } from './prediction.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { predictSchema } from './prediction.validation';

const router = Router();

// Run crop price prediction model
router.post('/predict', authenticate, validate(predictSchema), createPrediction);

// Fetch prediction history
router.get('/history', authenticate, getPredictions);

export default router;
