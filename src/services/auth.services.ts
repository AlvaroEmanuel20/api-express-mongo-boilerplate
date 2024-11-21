import { compare } from 'bcryptjs';
import { User } from '../models/user.model';
import { NotFoundError, UnauthorizedError } from '../utils/errorsClasses';
import { LoginData } from '../validations/auth.validations';
import { sign } from 'jsonwebtoken';
import environment from '../config/environment';
import { Token } from '../models/token.model';

export default class AuthServices {
  public static async login(loginData: LoginData) {
    const user = await User.findOne({ email: loginData.email });
    if (!user) throw new NotFoundError('User not found');

    const isPasswordMatch = await compare(loginData.password, user.password);
    if (!isPasswordMatch) throw new UnauthorizedError('Invalid password');

    const token = sign(
      { sub: user._id.toString() },
      environment.auth.jwtSecret!,
      {
        expiresIn: environment.auth.jwtExp,
      }
    );

    return { accessToken: token, userId: user._id.toString() };
  }

  public static async logout(token: string, userId: string) {
    await Token.create({
      tokenJwt: token,
      user: userId,
      type: 'ACCESS_TOKEN',
      isBlackListed: true,
    });

    return { userId };
  }
}
