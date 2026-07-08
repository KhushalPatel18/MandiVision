import axios, { AxiosInstance } from 'axios';
import { env } from '../config/env';
import { logger } from '../config/logger';
import { ApiError } from '../utils/ApiError';

interface PredictRequestPayload {
  state: string;
  commodity: string;
  month: number;
  year: number;
  district?: string;
  market?: string;
  variety?: string;
  latestPrice?: number;
}


interface PredictResponsePayload {
  predictedPrice: number;
  confidence: number;
  state: string;
  commodity: string;
}

class MlService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: env.ML_SERVICE_URL,
      timeout: 10000, // 10-second timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request logging interceptor
    this.client.interceptors.request.use((config) => {
      logger.info(`📤 Sending prediction request to ML service: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    });
  }

  /**
   * Contacts the FastAPI ML service to run crop price prediction
   */
  public async getPrediction(payload: PredictRequestPayload, retries = 2): Promise<PredictResponsePayload> {
    let attempt = 0;
    while (attempt <= retries) {
      try {
        const response = await this.client.post<PredictResponsePayload>('/predict', payload);
        return response.data;
      } catch (error: any) {
        attempt++;
        logger.error(`❌ ML service call failed (attempt ${attempt}/${retries + 1}): ${error.message}`);
        
        if (attempt > retries) {
          if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            throw new ApiError(504, 'Machine Learning service request timed out.');
          }
          if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.detail || 'Inference engine failed to compute prediction.';
            throw new ApiError(status, `ML Service Error: ${message}`);
          }
          throw new ApiError(503, 'Machine Learning service is currently unavailable.');
        }
        
        // Wait 500ms before retrying
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    throw new ApiError(503, 'Machine Learning service is currently unavailable.');
  }

  /**
   * Health check to query the ML service
   */
  public async checkHealth(): Promise<boolean> {
    try {
      const response = await this.client.get('/health');
      return response.status === 200;
    } catch {
      return false;
    }
  }
}

export const mlService = new MlService();
