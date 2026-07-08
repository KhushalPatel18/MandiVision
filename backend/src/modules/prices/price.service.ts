import { prisma } from '../../services/prisma.service';
import { logger } from '../../config/logger';

export class PriceService {
  async getPriceHistory(filters: {
    state?: string;
    district?: string;
    market?: string;
    commodity?: string;
  }) {
    const { state, district, market, commodity } = filters;

    const whereClause: any = {};

    if (commodity) {
      whereClause.commodity = {
        name: {
          equals: commodity,
          mode: 'insensitive',
        },
      };
    }

    if (market || district || state) {
      whereClause.market = {};
      if (market) {
        whereClause.market.name = {
          equals: market,
          mode: 'insensitive',
        };
      }
      if (district) {
        whereClause.market.district = {
          equals: district,
          mode: 'insensitive',
        };
      }
      if (state) {
        whereClause.market.state = {
          name: {
            equals: state,
            mode: 'insensitive',
          },
        };
      }
    }

    logger.info(`🔍 Querying price history with filters: ${JSON.stringify(filters)}`);

    const records = await prisma.priceHistory.findMany({
      where: whereClause,
      orderBy: {
        date: 'asc',
      },
      take: 30,
      include: {
        commodity: true,
        market: {
          include: {
            state: true,
          },
        },
      },
    });

    return records.map(r => ({
      id: r.id,
      date: r.date,
      minPrice: r.minPrice,
      maxPrice: r.maxPrice,
      modalPrice: r.modalPrice,
      commodity: r.commodity.name,
      market: r.market.name,
      district: r.market.district,
      state: r.market.state.name,
    }));
  }

  async getAll(): Promise<void> {
    logger.info('PriceService.getAll called — not yet implemented');
  }

  async getByFilter(): Promise<void> {
    logger.info('PriceService.getByFilter called — not yet implemented');
  }

  async create(): Promise<void> {
    logger.info('PriceService.create called — not yet implemented');
  }
}

export const priceService = new PriceService();

