import dotenv from 'dotenv';
import { z } from 'zod';

// Backward compatibility for PYTHON_API_URL
if (process.env.PYTHON_API_URL && !process.env.ML_SERVICE_URL) {
  process.env.ML_SERVICE_URL = process.env.PYTHON_API_URL;
}

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  ML_SERVICE_URL: z.string().default('http://localhost:8000'),
  DATA_GOV_API_KEY: z.string().optional(),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

// Host deployment environment bindings
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
export const NODE_ENV = (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development';
export const JWT_EXPIRES_IN = '7d';
