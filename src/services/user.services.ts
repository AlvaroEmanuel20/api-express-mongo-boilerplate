import environment from '../config/environment';
import {
  CreateUserData,
  UpdateUserData,
} from '../validations/user.validations';
import { User } from '../models/user.model';
import bcryptjs from 'bcryptjs';
import { ConflictDataError, NotFoundError } from '../utils/errorsClasses';

export default class UserServices {
  public static async getUserById(userId: string) {
    return await User.findById(userId);
  }

  public static async createUser(data: CreateUserData) {
    const emailExists = await User.findOne({ email: data.email });
    if (emailExists) {
      throw new ConflictDataError('Email already exists');
    }

    const newUser = await User.create({
      ...data,
      password: await bcryptjs.hash(
        data.password,
        environment.auth.passwordHashSalt
      ),
    });

    return newUser._id.toString();
  }

  public static async updateUserById(userId: string, data: UpdateUserData) {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('User not found');

    if (data.email) {
      const emailExists = await User.findOne({ email: data.email });
      if (emailExists) {
        throw new ConflictDataError('Email already exists');
      }

      user.email = data.email;
    }

    if (data.password) {
      user.password = await bcryptjs.hash(
        data.password,
        environment.auth.passwordHashSalt
      );
    }

    user.name = data.name || user.name;
    return (await user.save())._id.toString();
  }

  public static async deleteUserById(userId: string) {
    const userDeleted = await User.findByIdAndDelete(userId);
    if (!userDeleted) throw new NotFoundError('User not found');
    return userDeleted._id.toString();
  }
}
