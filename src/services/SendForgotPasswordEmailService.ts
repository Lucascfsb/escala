import { AppDataSource } from "../config/data-source";
import { AppError } from "../errors/AppError";
import { mailProviderPromise } from "../providers/MailProvider";
import path from "path";

import { User } from "../entities/User";
import { UserTokensRepository } from "../repositories/UserTokensRepository";

interface Request {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: Request): Promise<void> {
    const usersRepository = AppDataSource.getRepository(User);
    const userTokensRepository = new UserTokensRepository();

    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppError("User does not exist.", 404);
    }

    const userToken = await userTokensRepository.generate(user.id);

    const provider = await mailProviderPromise;
    await provider.sendMail({
      to: user.email,
      subject: "Recuperação de Senha",
      templateData: {
        file: path.resolve(__dirname, "..", "views", "forgot_password.hbs"),
        variables: {
          name: user.username,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${userToken.token}`,
        },
      },
    });
  }
}

export { SendForgotPasswordEmailService };
