import { prisma } from '../../services/prisma.service';
import { mlService } from '../../services/ml.service';
import type { PredictRequest, PredictionResult } from './prediction.types';

export class PredictionService {
  /**
   * Dispatches request to the ML model, saves the prediction result, and returns it
   */
  public static async generatePrediction(
    userId: string | null,
    requestData: PredictRequest
  ): Promise<PredictionResult> {
    // Fetch latest price from PriceHistory database
    const latestPriceRecord = await prisma.priceHistory.findFirst({
      where: {
        commodity: {
          name: {
            equals: requestData.commodity,
            mode: 'insensitive',
          },
        },
        market: {
          name: {
            equals: requestData.market,
            mode: 'insensitive',
          },
          district: requestData.district ? {
            equals: requestData.district,
            mode: 'insensitive',
          } : undefined,
          state: {
            name: {
              equals: requestData.state,
              mode: 'insensitive',
            },
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    const latestPrice = latestPriceRecord ? latestPriceRecord.modalPrice : undefined;

    // 1. Fetch prediction from ML service
    const mlResponse = await mlService.getPrediction({
      state: requestData.state,
      commodity: requestData.commodity,
      month: requestData.month,
      year: requestData.year,
      district: requestData.district,
      market: requestData.market,
      variety: requestData.variety,
      latestPrice,
    });


    // 2. Save prediction history in PostgreSQL
    await prisma.prediction.create({
      data: {
        userId,
        state: mlResponse.state,
        commodity: mlResponse.commodity,
        predictedPrice: mlResponse.predictedPrice,
        confidence: mlResponse.confidence,
      },
    });

    return {
      predictedPrice: mlResponse.predictedPrice,
      confidence: mlResponse.confidence,
      state: mlResponse.state,
      commodity: mlResponse.commodity,
    };
  }

  /**
   * Retrieves prediction history for the authenticated user
   */
  public static async getUserHistory(userId: string) {
    return prisma.prediction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20, // Limit to top 20 recent records
    });
  }
}
