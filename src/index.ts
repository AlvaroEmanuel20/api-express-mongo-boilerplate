import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectToDatabase from './config/database';
import errors from './middlewares/errors';
import compression from 'compression';
import morgan from 'morgan';
import logger from './utils/logger';

const app = express();
const PORT = process.env.PORT;
connectToDatabase();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
});

app.use(limiter);
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());
app.use(helmet());

app.get('/health-check', (req, res) => {
  res.json({
    message: 'Ok',
    uptime: `${Math.floor(process.uptime())}s`,
    checkedAt: new Date(),
  });
});

app.use(errors);

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${PORT} (${process.env.NODE_ENV})`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');

  server.close(() => {
    logger.info('HTTP server closed');
  });
});
