import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';

export const getCrops = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

export const getCropById = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

export const createCrop = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});
