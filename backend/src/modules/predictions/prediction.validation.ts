import { z } from 'zod';

export const predictSchema = z.object({
  body: z.object({
    state: z.string({
      required_error: 'State name is required',
    }).trim().min(1, 'State name cannot be empty'),
    commodity: z.string({
      required_error: 'Commodity name is required',
    }).trim().min(1, 'Commodity name cannot be empty'),
    month: z.number({
      required_error: 'Month is required',
    }).int().min(1, 'Month must be between 1 and 12').max(12, 'Month must be between 1 and 12'),
    year: z.number({
      required_error: 'Year is required',
    }).int().min(2020, 'Year must be at or after 2020').max(2050, 'Year must be at or before 2050'),
    district: z.string().trim().optional(),
    market: z.string().trim().optional(),
    variety: z.string().trim().optional(),
  }),
});
