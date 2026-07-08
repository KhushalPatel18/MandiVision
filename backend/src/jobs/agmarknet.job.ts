import cron from 'node-cron';
import axios from 'axios';
import { prisma } from '../services/prisma.service';
import { env } from '../config/env';
import { logger } from '../config/logger';

export const syncAgmarknetData = async (): Promise<void> => {
  const apiKey = env.DATA_GOV_API_KEY;
  if (!apiKey) {
    logger.warn('⚠️ DATA_GOV_API_KEY is not defined. Skipping Agmarknet sync.');
    return;
  }

  logger.info('🔄 Fetching data from data.gov.in Agmarknet API...');
  
  // Use the working resource ID we discovered
  const resourceId = '9ef84268-d588-465a-a308-a864a43d0070';
  const url = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=100`;

  try {
    const response = await axios.get(url);
    if (!response.data || response.data.status !== 'ok' || !Array.isArray(response.data.records)) {
      logger.error('❌ Invalid response structure from data.gov.in API:', response.data);
      return;
    }

    const records = response.data.records;
    logger.info(`📋 Fetched ${records.length} records from Agmarknet API.`);

    let importedCount = 0;

    for (const record of records) {
      const {
        state: stateName,
        district: districtName,
        market: marketName,
        commodity: commodityName,
        variety,
        arrival_date,
        min_price,
        max_price,
        modal_price
      } = record;

      if (!stateName || !marketName || !commodityName || !arrival_date) {
        continue;
      }

      // Parse date (dd/mm/yyyy)
      const dateParts = arrival_date.split('/');
      if (dateParts.length !== 3) continue;
      const date = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );

      // 1. Get or create State
      let state = await prisma.state.findUnique({
        where: { name: stateName }
      });
      if (!state) {
        state = await prisma.state.create({
          data: { name: stateName }
        });
      }

      // 2. Get or create Market
      let market = await prisma.market.findFirst({
        where: {
          name: marketName,
          district: districtName || '',
          stateId: state.id
        }
      });
      if (!market) {
        market = await prisma.market.create({
          data: {
            name: marketName,
            district: districtName || '',
            stateId: state.id
          }
        });
      }

      // 3. Get or create Commodity
      let commodity = await prisma.commodity.findFirst({
        where: { name: commodityName }
      });
      if (!commodity) {
        // Simple category mapper
        let category = 'Grain';
        const lowerName = commodityName.toLowerCase();
        if (['onion', 'potato', 'tomato', 'cabbage', 'cauliflower', 'pumpkin', 'gourd'].some(v => lowerName.includes(v))) {
          category = 'Vegetable';
        } else if (['apple', 'grapes', 'banana', 'pineapple', 'mango', 'orange'].some(v => lowerName.includes(v))) {
          category = 'Fruit';
        } else if (['cotton', 'jute'].some(v => lowerName.includes(v))) {
          category = 'Fiber';
        } else if (['soybean', 'mustard', 'groundnut'].some(v => lowerName.includes(v))) {
          category = 'Oilseed';
        }

        commodity = await prisma.commodity.create({
          data: {
            name: commodityName,
            category
          }
        });
      }

      // 4. Create PriceHistory if it doesn't already exist for this date, market, and commodity
      const existingPrice = await prisma.priceHistory.findFirst({
        where: {
          date,
          marketId: market.id,
          commodityId: commodity.id
        }
      });

      if (!existingPrice) {
        await prisma.priceHistory.create({
          data: {
            date,
            minPrice: Number(min_price),
            maxPrice: Number(max_price),
            modalPrice: Number(modal_price),
            marketId: market.id,
            commodityId: commodity.id
          }
        });
        importedCount++;
      }
    }

    logger.info(`✅ Successfully synchronized Agmarknet data: Imported ${importedCount} new price records.`);
  } catch (error: any) {
    logger.error('❌ Error synchronizing Agmarknet data:', error.message);
  }
};

export const startAgmarknetJob = (): void => {
  // Runs every day at 6:00 AM IST
  cron.schedule('0 6 * * *', async () => {
    logger.info('🔄 Agmarknet sync job triggered');
    try {
      await syncAgmarknetData();
    } catch (error) {
      logger.error('❌ Agmarknet sync job failed:', error);
    }
  });

  logger.info('📅 Agmarknet sync job scheduled (daily at 6:00 AM)');

  // Run immediately on start for initial sync/seeding
  (async () => {
    try {
      logger.info('🚀 Triggering initial Agmarknet sync on startup...');
      await syncAgmarknetData();
    } catch (error) {
      logger.error('❌ Initial Agmarknet sync failed:', error);
    }
  })();
};

