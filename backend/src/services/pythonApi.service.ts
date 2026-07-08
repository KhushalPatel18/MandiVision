import axios, { AxiosInstance } from 'axios';
import { env } from '../config/env';
import { logger } from '../config/logger';

class PythonApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: env.ML_SERVICE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        logger.error('Python API request failed:', error.message);
        throw error;
      }
    );
  }

  async getPrediction(data: Record<string, unknown>): Promise<unknown> {
    const response = await this.client.post('/predict', data);
    return response.data;
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get('/health');
      return true;
    } catch {
      return false;
    }
  }
}

export const pythonApi = new PythonApiService();
