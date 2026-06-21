export const ROLES = {
  FARMER: 'farmer',
  ADMIN: 'admin',
  ANALYST: 'analyst',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const API_PREFIX = '/api' as const;
