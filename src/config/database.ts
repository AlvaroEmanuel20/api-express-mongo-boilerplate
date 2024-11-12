import 'dotenv/config';
import mongoose from 'mongoose';
import logger from '../utils/logger';

export default async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    logger.info('Connected to mongo');
  } catch (error) {
    logger.error(`MongoDB connection error: ${error}`);
  }
}

mongoose.connection.on('error', (error) => {
  logger.error(`MongoDB after initial connection error: ${error}`);
});
