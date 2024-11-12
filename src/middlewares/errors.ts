import type { ErrorRequestHandler } from 'express';
import ApiError from '../utils/ApiError';

const errors: ErrorRequestHandler = (error: Error, req, res, next) => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
      context: error.context,
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    statusCode: 500,
  });

  next(error);
};

export default errors;
