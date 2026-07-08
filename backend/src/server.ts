import app from './app';
import { env, PORT, NODE_ENV } from './config/env';
import { logger } from './config/logger';
import { connectDatabase } from './config/database';
import { startAgmarknetJob } from './jobs/agmarknet.job';
import { startMarketSyncJob } from './jobs/marketSync.job';

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();

    // Start background jobs
    startAgmarknetJob();
    startMarketSyncJob();

    // Start HTTP server
    const port = PORT;
    app.listen(port, () => {
      logger.info(`🚀 MandiVision API server running on port ${port}`);
      logger.info(`📍 Environment: ${NODE_ENV}`);
      logger.info(`🔗 Health check: http://localhost:${port}/health`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error) => {
  logger.error('UNHANDLED REJECTION:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('UNCAUGHT EXCEPTION:', error);
  process.exit(1);
});

startServer();
