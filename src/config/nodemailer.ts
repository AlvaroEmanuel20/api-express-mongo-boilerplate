import nodemailer from 'nodemailer';
import environment from './environment';
import logger from './logger';

const transporter = nodemailer.createTransport({
  host: environment.email.smtp,
  port: environment.email.smtpPort,
  secure: environment.isProduction,
  auth: {
    user: environment.email.emailAuthUser,
    pass: environment.email.emailAuthPassword,
  },
});

transporter
  .verify()
  .then(() => logger.info('Connected to email server'))
  .catch((error) => logger.error(`Error to connect to email server: ${error}`));

export default transporter;
