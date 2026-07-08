import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { marketService } from './market.service';

/**
 * Handles GET /api/market/current
 * Retrieves current commodity pricing from Agmarknet API
 */
export const getCurrentPrice = catchAsync(async (req: Request, res: Response) => {
  const { state, district, market, commodity } = req.query as {
    state: string;
    district?: string;
    market?: string;
    commodity: string;
  };

  const data = await marketService.getCurrentPrice({
    state,
    district,
    market,
    commodity,
  });

  res.status(200).json({
    success: true,
    data,
  });
});

/**
 * Handles GET /api/market/history
 * Retrieves historical prices from Agmarknet API
 */
export const getHistoricalPrices = catchAsync(async (req: Request, res: Response) => {
  const { state, district, market, commodity, days } = req.query as any;

  const data = await marketService.getHistoricalPrices(
    {
      state,
      district,
      market,
      commodity,
    },
    days
  );

  res.status(200).json({
    success: true,
    data,
  });
});

/**
 * Handles GET /api/dashboard/market-overview (or GET /api/market/overview)
 * Combines live prices, historical price timeline, and ML model predictions
 */
export const getMarketOverview = catchAsync(async (req: Request, res: Response) => {
  const { state, district, market, commodity, variety, horizon } = req.query as any;
  const user = (req as any).user;
  const userId = user ? user.id : null;

  const data = await marketService.getMarketOverview(
    {
      state,
      district,
      market,
      commodity,
      variety,
      horizon,
    },
    userId
  );

  res.status(200).json({
    success: true,
    data,
  });
});
