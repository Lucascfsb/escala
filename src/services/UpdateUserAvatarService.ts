import fs from "node:fs";
import path from "node:path";
import { AppDataSource } from "../config/data-source";

import { uploadConfig } from "../config/upload";
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = AppDataSource.getRepository(User);

    const user = await usersRepository.findOneBy({ id: user_id });

    if (!user) {
      throw new AppError("Only authenticated users can change avatar.", 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvataFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvataFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };
