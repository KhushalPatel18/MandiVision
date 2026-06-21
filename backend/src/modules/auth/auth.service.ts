import { logger } from '../../config/logger';

// Auth service placeholder — business logic will be implemented later
export class AuthService {
  async register(): Promise<void> {
    logger.info('AuthService.register called — not yet implemented');
  }

  async login(): Promise<void> {
    logger.info('AuthService.login called — not yet implemented');
  }
}

export const authService = new AuthService();
