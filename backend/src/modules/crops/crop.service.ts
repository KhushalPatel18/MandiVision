import { logger } from '../../config/logger';

export class CropService {
  async getAll(): Promise<void> {
    logger.info('CropService.getAll called — not yet implemented');
  }

  async getById(): Promise<void> {
    logger.info('CropService.getById called — not yet implemented');
  }

  async create(): Promise<void> {
    logger.info('CropService.create called — not yet implemented');
  }
}

export const cropService = new CropService();
