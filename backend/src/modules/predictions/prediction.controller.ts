import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { PredictionService } from './prediction.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';

export const createPrediction = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || null;
  const { state, commodity, month, year, district, market, variety } = req.body;

  if (!state || !commodity || !month || !year) {
    throw ApiError.badRequest('Missing state, commodity, month, or year parameters.');
  }

  const prediction = await PredictionService.generatePrediction(userId, {
    state,
    commodity,
    month,
    year,
    district,
    market,
    variety,
  });

  return ApiResponse.success(res, prediction, 'Prediction computed successfully');
});

export const getPredictions = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  if (!userId) {
    throw ApiError.unauthorized('User must be logged in to view prediction history');
  }

  const history = await PredictionService.getUserHistory(userId);
  return ApiResponse.success(res, history, 'Prediction history retrieved successfully');
});
