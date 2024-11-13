import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRouter = Router();

userRouter.route('/').post(UserController.createUser);

userRouter
  .route('/:userId')
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

export default userRouter;
