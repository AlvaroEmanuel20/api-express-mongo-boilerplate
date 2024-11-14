import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { ApiError } from '../utils/errorsClasses';

export default function validator(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      throw new ApiError(
        JSON.stringify(
          {
            message: 'Invalid request data',
            details: result.error.errors.map((errors) => ({
              path: errors.path,
              message: errors.message,
            })),
          },
          null,
          2
        ),
        400,
        'validation'
      );
    }

    next();
  };
}
