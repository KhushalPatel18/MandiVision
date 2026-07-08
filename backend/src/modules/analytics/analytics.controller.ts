import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';

export const getSummary = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

export const getPriceTrends = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});
