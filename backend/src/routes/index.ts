import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/users/user.routes';
import cropRoutes from '../modules/crops/crop.routes';
import marketRoutes from '../modules/markets/market.routes';
import priceRoutes from '../modules/prices/price.routes';
import predictionRoutes from '../modules/predictions/prediction.routes';
import analyticsRoutes from '../modules/analytics/analytics.routes';
import marketNewRoutes from '../modules/market/market.routes';
import { getMarketOverview } from '../modules/market/market.controller';
import { marketOverviewSchema } from '../modules/market/market.validation';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/crops', cropRoutes);
router.use('/markets', marketRoutes);
router.use('/prices', priceRoutes);
router.use('/predictions', predictionRoutes);
router.use('/analytics', analyticsRoutes);

// Real-Time Government Prices & Dashboard Market Overview Routes
router.use('/market', marketNewRoutes);
router.get('/dashboard/market-overview', authenticate, validate(marketOverviewSchema), getMarketOverview);

export default router;
