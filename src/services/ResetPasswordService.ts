import { AppDataSource } from "../config/data-source";
import { AppError } from "../errors/AppError";
import { UserTokensRepository } from "../repositories/UserTokensRepository";
import { User } from "../entities/User";
import { hash } from "bcryptjs";

interface Request {
  token: string;
  password: string;
  password_confirmation: string;
}

class ResetPasswordService {
  private userTokensRepository: UserTokensRepository;

  constructor() {
    this.userTokensRepository = new UserTokensRepository();
  }

  public async execute({
    token,
    password,
    password_confirmation,
  }: Request): Promise<void> {
    if (password !== password_confirmation) {
      throw new AppError("Password confirmation does not match.");
    }

    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError("Invalid or expired token.", 401);
    }

    const usersRepository = AppDataSource.getRepository(User);
    const user = await usersRepository.findOne({
      where: { id: userToken.user_id },
    });
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const hashedPassword = await hash(password, 8);

    user.password = hashedPassword;
    await usersRepository.save(user);
  }
}

export { ResetPasswordService };
