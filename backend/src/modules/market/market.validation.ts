import { z } from 'zod';

export const currentPriceSchema = z.object({
  query: z.object({
    state: z.string({
      required_error: 'State is required',
    }).trim().min(1, 'State cannot be empty'),
    commodity: z.string({
      required_error: 'Commodity is required',
    }).trim().min(1, 'Commodity cannot be empty'),
    district: z.string().trim().optional(),
    market: z.string().trim().optional(),
  }),
});

export const historyPriceSchema = z.object({
  query: z.object({
    state: z.string({
      required_error: 'State is required',
    }).trim().min(1, 'State cannot be empty'),
    commodity: z.string({
      required_error: 'Commodity is required',
    }).trim().min(1, 'Commodity cannot be empty'),
    district: z.string().trim().optional(),
    market: z.string().trim().optional(),
    days: z.string().optional().transform(val => val ? parseInt(val, 10) : 30),
  }),
});

export const marketOverviewSchema = z.object({
  query: z.object({
    state: z.string({
      required_error: 'State is required',
    }).trim().min(1, 'State cannot be empty'),
    commodity: z.string({
      required_error: 'Commodity is required',
    }).trim().min(1, 'Commodity cannot be empty'),
    district: z.string().trim().optional(),
    market: z.string().trim().optional(),
    variety: z.string().trim().optional(),
    horizon: z.string().optional().transform(val => val ? parseInt(val, 10) : 30),
  }),
});
