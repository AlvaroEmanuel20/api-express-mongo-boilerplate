import { CookieOptions, Request, Response } from 'express';
import AuthServices from '../services/auth.services';
import {
  ApiError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/errorsClasses';
import environment from '../config/environment';

export default class AuthController {
  private static readonly cookiesOptions: CookieOptions = {
    httpOnly: true,
    secure: environment.isProduction,
    maxAge: environment.auth.accessCookieMaxAge,
    sameSite: environment.auth.accessCookieSameSite,
  };

  public static async login(req: Request, res: Response) {
    try {
      const { accessToken, userId } = await AuthServices.login(req.body);

      res.cookie(
        environment.auth.accessCookieName || 'access_token',
        accessToken,
        this.cookiesOptions
      );

      res.json({ userId });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new ApiError(error.message, 404, 'auth');
      }

      if (error instanceof UnauthorizedError) {
        throw new ApiError(error.message, 401, 'auth');
      }
    }
  }

  public static async logout(req: Request, res: Response) {
    const { userId } = await AuthServices.logout(
      req.cookies[environment.auth.accessCookieName || 'access_token'],
      req.user.userId
    );

    res.clearCookie(
      environment.auth.accessCookieName || 'access_token',
      this.cookiesOptions
    );

    res.json({ userId });
  }
}
