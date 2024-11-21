import { Router } from 'express';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;
