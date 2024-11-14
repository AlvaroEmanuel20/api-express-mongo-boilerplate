import type { ErrorRequestHandler } from 'express';

const errors: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message || 'Internal server error',
    statusCode: error.statusCode || 500,
    context: error.context && error.context,
  });

  next();
};

export default errors;
