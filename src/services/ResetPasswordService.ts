import { AppDataSource } from '../config/data-source';
import AppError from '../errors/AppError';
import UserTokensRepository from '../repositories/UserTokensRepository';
import User from '../entities/User';

interface Request {
  token: string;
  password: string;
  password_confirmation: string;
}

class ResetPasswordService {
  public async execute({ token, password, password_confirmation }: Request): Promise<void> {
    if (password !== password_confirmation) {
      throw new AppError('Password confirmation does not match.');
    }

    const userTokensRepository = new UserTokensRepository();
    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Invalid token.');
    }

    const usersRepository = AppDataSource.getRepository(User);
    const user = await usersRepository.findOne({ where: { id: userToken.user_id } });

    if (!user) {
      throw new AppError('User not found.');
    }

    user.password = password; // Certifique-se de hash a senha antes de salvar
    await usersRepository.save(user);
  }
}

export default ResetPasswordService;