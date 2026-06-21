import { logger } from '../../config/logger';

export class PriceService {
  async getAll(): Promise<void> {
    logger.info('PriceService.getAll called — not yet implemented');
  }

  async getByFilter(): Promise<void> {
    logger.info('PriceService.getByFilter called — not yet implemented');
  }

  async create(): Promise<void> {
    logger.info('PriceService.create called — not yet implemented');
  }
}

export const priceService = new PriceService();
