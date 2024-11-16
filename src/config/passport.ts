import { Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';
import environment from './environment';
import UserServices from '../services/user.services';

export type JwtPayload = {
  sub: string;
  exp?: number;
  iat?: number;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
};

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: environment.auth.jwtSecret!,
    jwtFromRequest: (req) =>
      req && req.cookies['access_token'] ? req.cookies['access_token'] : null,
  },
  async (jwtPayload: JwtPayload, done: VerifiedCallback) => {
    try {
      const userId = jwtPayload.sub;

      const user = await UserServices.getUserById(userId);
      if (!user) return done(null, false);

      done(null, true);
    } catch (error) {
      done(error, false);
    }
  }
);
