import axios from 'axios';
import { env } from '../config/env';
import { logger } from '../config/logger';
import { ApiError } from '../utils/ApiError';

export interface DataGovRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  arrival_date: string;
  min_price: string | number;
  max_price: string | number;
  modal_price: string | number;
}

export interface DataGovApiResponse {
  status: string;
  total: number;
  count: number;
  records: DataGovRecord[];
}

class DataGovService {
  private baseURL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';
  private cache = new Map<string, { data: any; expiresAt: number }>();
  private cacheTtl = 15 * 60 * 1000; // 15 minutes in milliseconds

  /**
   * Generates a unique cache key based on query filters
   */
  private getCacheKey(filters: Record<string, string | number | undefined>): string {
    const sortedKeys = Object.keys(filters).sort();
    return sortedKeys.map(k => `${k}:${filters[k]}`).join('|');
  }

  /**
   * Helper to parse DD/MM/YYYY or YYYY-MM-DD into a standard Date object
   */
  public parseDate(dateStr: string): Date {
    if (!dateStr) return new Date();
    // Check if DD/MM/YYYY
    if (dateStr.includes('/')) {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        // DD/MM/YYYY
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    } else if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          // YYYY-MM-DD
          return new Date(dateStr);
        } else {
          // DD-MM-YYYY
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          return new Date(year, month, day);
        }
      }
    }
    return new Date(dateStr);
  }

  /**
   * Helper to format Date object into YYYY-MM-DD string
   */
  public formatDateString(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * Cleans descriptive suffixes from market names
   */
  public cleanMarketName(market: string): string {
    return market
      .replace(/\s+APMC$/i, '')
      .replace(/\s+Market\s+Yard$/i, '')
      .replace(/\s+Market$/i, '')
      .replace(/\s+Mandi$/i, '')
      .replace(/\s+Yard$/i, '')
      .trim();
  }

  /**
   * Cleans descriptive suffixes from district names
   */
  public cleanDistrictName(district: string): string {
    return district
      .replace(/\s+APMC$/i, '')
      .replace(/\s+Mandi$/i, '')
      .trim();
  }

  /**
   * Normalizes commodity and state names to match data.gov.in format
   */
  private normalizeFilterValue(value: string): string {
    return value.trim();
  }

  /**
   * Fetches records from data.gov.in API with filters and caching (stale-on-error)
   */
  public async fetchMarketData(params: {
    state: string;
    district?: string;
    market?: string;
    commodity: string;
    limit?: number;
    offset?: number;
  }): Promise<DataGovRecord[]> {
    const apiKey = env.DATA_GOV_API_KEY;
    if (!apiKey || apiKey === 'YOUR_API_KEY') {
      logger.error('❌ Government API Key is missing or default. Please configure DATA_GOV_API_KEY in .env.');
      throw new ApiError(500, 'Government API service configuration error.');
    }

    const cleanedState = this.normalizeFilterValue(params.state);
    const cleanedCommodity = this.normalizeFilterValue(params.commodity);
    const cleanedDistrict = params.district ? this.cleanDistrictName(params.district) : undefined;
    const cleanedMarket = params.market ? this.cleanMarketName(params.market) : undefined;

    // Retry cascade sequence:
    // Attempt 1: State + Commodity + District + Market
    // Attempt 2: State + Commodity + District (fallback if no market data)
    // Attempt 3: State + Commodity (fallback if no district data)
    const attempts = [
      { state: cleanedState, commodity: cleanedCommodity, district: cleanedDistrict, market: cleanedMarket },
      { state: cleanedState, commodity: cleanedCommodity, district: cleanedDistrict, market: undefined },
      { state: cleanedState, commodity: cleanedCommodity, district: undefined, market: undefined },
    ];

    for (let i = 0; i < attempts.length; i++) {
      const attempt = attempts[i];

      // Skip redundant attempts (e.g. if market or district was already undefined)
      if (i > 0) {
        const prev = attempts[i - 1];
        if (prev.district === attempt.district && prev.market === attempt.market) {
          continue;
        }
      }

      // Filter out undefined values to construct filters
      const filters: Record<string, string> = {
        state: attempt.state,
        commodity: attempt.commodity,
      };
      if (attempt.district) filters.district = attempt.district;
      if (attempt.market) filters.market = attempt.market;

      const cacheKey = this.getCacheKey({ ...filters, limit: params.limit, offset: params.offset });
      const cachedEntry = this.cache.get(cacheKey);
      const now = Date.now();

      // Check if cache exists and is fresh
      if (cachedEntry && now < cachedEntry.expiresAt) {
        logger.info(`⚡ Serving Data.gov.in API response from fresh cache for key: ${cacheKey}`);
        if (cachedEntry.data.length > 0 || i === attempts.length - 1) {
          return cachedEntry.data;
        }
        continue;
      }

      try {
        logger.info(`🌐 Querying Data.gov.in API (Attempt ${i + 1}/${attempts.length}) with filters: ${JSON.stringify(filters)}`);

        // Construct request parameters
        const apiParams: Record<string, any> = {
          'api-key': apiKey,
          format: 'json',
          limit: params.limit || 500,
          offset: params.offset || 0,
        };

        // Add filters
        Object.keys(filters).forEach(key => {
          apiParams[`filters[${key}]`] = filters[key];
        });

        const response = await axios.get<DataGovApiResponse>(this.baseURL, {
          params: apiParams,
          timeout: 10000, // 10-second timeout
        });

        if (!response.data || !Array.isArray(response.data.records)) {
          throw new ApiError(502, 'Invalid response structure from Government API.');
        }

        const records = response.data.records;

        // Update cache
        this.cache.set(cacheKey, {
          data: records,
          expiresAt: now + this.cacheTtl,
        });

        if (records.length > 0) {
          return records;
        } else {
          logger.warn(`⚠️ Attempt ${i + 1} returned 0 records. Trying next fallback level...`);
        }
      } catch (error: any) {
        logger.error(`❌ Data.gov.in API request failed: ${error.message}`);

        // Handle Stale-on-Error caching fallback
        if (cachedEntry) {
          logger.warn(`⚠️ Government API is unavailable. Serving expired/stale cached data for key: ${cacheKey}`);
          return cachedEntry.data;
        }

        // Propagate errors on final attempt
        if (i === attempts.length - 1) {
          if (error instanceof ApiError) {
            throw error;
          }
          if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            throw new ApiError(504, 'Government API request timed out.');
          }
          if (error.response) {
            const status = error.response.status;
            const detail = error.response.data?.message || 'Error occurred while contacting Agmarknet API.';
            throw new ApiError(status, `Government API Error: ${detail}`);
          }
          throw new ApiError(503, 'Government market price API is currently unavailable.');
        }
      }
    }

    return [];
  }
}

export const dataGovService = new DataGovService();
