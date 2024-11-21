import 'dotenv/config';

type CookieSameSite = boolean | 'strict' | 'lax' | 'none' | undefined;

export default {
  mode: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI,
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExp: process.env.JWT_EXP,
    passwordHashSalt: Number(process.env.PASSWORD_HASH_SALT),
    accessCookieName: process.env.ACCESS_COOKIE_NAME,
    accessCookieMaxAge: Number(process.env.ACCESS_COOKIE_MAX_AGE),
    accessCookieSameSite: process.env.ACCESS_COOKIE_SAME_SITE as CookieSameSite,
  },
  email: {
    smtp: process.env.SMTP_SERVER,
  },
};
