import { Router } from 'express';
import validator from '../middlewares/validator';
import { loginSchema } from '../validations/auth.validations';
import AuthController from '../controllers/auth.controller';
import authenticator from '../middlewares/authenticator';

const authRouter = Router();

authRouter.post('/login', validator(loginSchema), AuthController.login);
authRouter.post('/logout', authenticator, AuthController.logout);

export default authRouter;
