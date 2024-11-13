import 'dotenv/config';

export default {
  mode: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI,
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExp: process.env.JWT_EXP,
    refreshJwtSecret: process.env.REFRESH_JWT_SECRET,
    refreshJwtExp: process.env.REFRESH_JWT_EXP,
    passwordHashSalt: Number(process.env.PASSWORD_HASH_SALT),
  },
  email: {
    smtp: process.env.SMTP_SERVER,
  },
};
