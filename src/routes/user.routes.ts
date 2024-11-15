import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validator from '../middlewares/validator';
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from '../validations/user.validations';

const userRouter = Router();

userRouter
  .route('/')
  .post(validator(createUserSchema), UserController.createUser);

userRouter
  .route('/:userId')
  .all(validator(userIdSchema))
  .get(UserController.getUser)
  .patch(validator(updateUserSchema), UserController.updateUser)
  .delete(UserController.deleteUser);

export default userRouter;
