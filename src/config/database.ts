import environment from './environment';
import mongoose from 'mongoose';
import logger from '../utils/logger';

export default async function connectToDatabase() {
  try {
    await mongoose.connect(environment.mongoUri!);
    logger.info('Connected to mongo');
  } catch (error) {
    logger.error(`MongoDB connection error: ${error}`);
  }
}

mongoose.connection.on('error', (error) => {
  logger.error(`MongoDB after initial connection error: ${error}`);
});

mongoose.connection.on('disconnected', (error) => {
  logger.error(`MongoDB disconnected error: ${error}`);
});
