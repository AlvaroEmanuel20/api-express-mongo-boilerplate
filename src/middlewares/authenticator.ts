import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/errorsClasses';
import environment from '../config/environment';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
  verify,
} from 'jsonwebtoken';
import { Token } from '../models/token.model';

export default async function authenticator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token =
    req.cookies[environment.auth.accessCookieName || 'access_token'];
  if (!token) throw new ApiError('Token not found', 401, 'auth');

  try {
    const tokenExists = await Token.findOne({ tokenJwt: token });
    if (tokenExists && tokenExists.isBlackListed)
      throw new ApiError('Invalid token', 401, 'auth');

    const { sub } = verify(token, environment.auth.jwtSecret!);
    req.user.userId = sub as string;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new ApiError('Token expired', 401, 'auth');
    }

    if (error instanceof JsonWebTokenError) {
      throw new ApiError('Invalid token', 401, 'auth');
    }

    if (error instanceof NotBeforeError) {
      throw new ApiError('Token not active', 401, 'auth');
    }
  }
}
