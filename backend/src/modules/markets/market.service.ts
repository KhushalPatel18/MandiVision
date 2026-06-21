import { logger } from '../../config/logger';

export class MarketService {
  async getAll(): Promise<void> {
    logger.info('MarketService.getAll called — not yet implemented');
  }

  async getById(): Promise<void> {
    logger.info('MarketService.getById called — not yet implemented');
  }

  async create(): Promise<void> {
    logger.info('MarketService.create called — not yet implemented');
  }
}

export const marketService = new MarketService();
