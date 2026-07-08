import { logger } from '../../config/logger';

export class AnalyticsService {
  async getSummary(): Promise<void> {
    logger.info('AnalyticsService.getSummary called — not yet implemented');
  }

  async getPriceTrends(): Promise<void> {
    logger.info('AnalyticsService.getPriceTrends called — not yet implemented');
  }
}

export const analyticsService = new AnalyticsService();
