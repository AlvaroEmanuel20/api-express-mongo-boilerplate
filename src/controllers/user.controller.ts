import { Request, Response } from 'express';
import UserServices from '../services/user.services';
import {
  ApiError,
  ConflictDataError,
  NotFoundError,
} from '../utils/errors.classes';

export default class UserController {
  public static async getUser(req: Request, res: Response) {
    try {
      const user = await UserServices.getUserById(req.params.userId);
      res.json(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new ApiError(error.message, 404, 'users');
      }
    }
  }

  public static async createUser(req: Request, res: Response) {
    try {
      const userId = await UserServices.createUser(req.body);
      res.status(201).json({ userId });
    } catch (error) {
      if (error instanceof ConflictDataError) {
        throw new ApiError(error.message, 409, 'users');
      }
    }
  }

  public static async updateUser(req: Request, res: Response) {
    try {
      const userId = await UserServices.updateUserById(
        req.params.userId,
        req.body
      );

      res.json({ userId });
    } catch (error) {
      if (error instanceof ConflictDataError) {
        throw new ApiError(error.message, 409, 'users');
      }

      if (error instanceof NotFoundError) {
        throw new ApiError(error.message, 404, 'users');
      }
    }
  }

  public static async deleteUser(req: Request, res: Response) {
    try {
      const userId = await UserServices.deleteUserById(req.params.userId);
      res.json({ userId });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new ApiError(error.message, 404, 'users');
      }
    }
  }
}
