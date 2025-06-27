import express from 'express';
import CustomError from '../utils/CustomError';

const errorMiddleware: express.ErrorRequestHandler = (err, req, res, _next) => {
  // Enhanced logging
  console.error('Error handler:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
    timestamp: new Date().toISOString(),
  });

  // CustomError support
  if (err instanceof CustomError) {
    const response: any = {
      error: err.message,
      code: err.code,
      isOperational: err.isOperational,
    };
    if (err.metadata) {
      response.metadata = err.metadata;
    }
    void res.status(err.statusCode).json(response);
    return;
  }

  void res.status(err.statusCode || 500).json({
    error:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong!'
        : err.message || 'An unexpected error occurred',
    code: err.code || 'INTERNAL_ERROR',
    ...(err.metadata && { metadata: err.metadata }),
  });
};

export default errorMiddleware;
