import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';

export const getMarkets = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

export const getMarketById = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

export const createMarket = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});
