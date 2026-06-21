import { logger } from '../../config/logger';

export class UserService {
  async getAll(): Promise<void> {
    logger.info('UserService.getAll called — not yet implemented');
  }

  async getById(): Promise<void> {
    logger.info('UserService.getById called — not yet implemented');
  }

  async update(): Promise<void> {
    logger.info('UserService.update called — not yet implemented');
  }

  async delete(): Promise<void> {
    logger.info('UserService.delete called — not yet implemented');
  }
}

export const userService = new UserService();
