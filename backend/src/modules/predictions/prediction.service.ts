import { logger } from '../../config/logger';

export class PredictionService {
  async getAll(): Promise<void> {
    logger.info('PredictionService.getAll called — not yet implemented');
  }

  async predict(): Promise<void> {
    logger.info('PredictionService.predict called — not yet implemented');
  }
}

export const predictionService = new PredictionService();
