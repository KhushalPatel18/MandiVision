import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { priceService } from './price.service';

export const getHistory = catchAsync(async (req: Request, res: Response) => {
  const { state, district, market, commodity } = req.query;

  const history = await priceService.getPriceHistory({
    state: state as string,
    district: district as string,
    market: market as string,
    commodity: commodity as string,
  });

  res.status(200).json({
    success: true,
    data: history,
  });
});

export const getPrices = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

export const getPriceById = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

export const createPrice = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

