import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { ApiError } from '../utils/errorsClasses';

export default async function authenticator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return passport.authenticate(
    'jwt',
    { session: false },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any, user?: Express.User | false | null) => {
      if (error) return next(error);
      if (!user) throw new ApiError('Unauthorized access', 401, 'auth');
      req.user = user;
      next();
    }
  )(req, res, next);
}
