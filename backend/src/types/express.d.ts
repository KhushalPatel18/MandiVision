// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TokenPayload } from '../services/jwt.service';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
