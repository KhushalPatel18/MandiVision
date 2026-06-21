import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';

export const getPredictions = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

export const createPrediction = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});
