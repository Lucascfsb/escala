import { v4 as uuidv4 } from "uuid";
import { UserToken } from "../entities/UserToken";
import { AppDataSource } from "../config/data-source";

export class UserTokensRepository {
  private repository = AppDataSource.getRepository(UserToken);

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.repository.findOne({
      where: { token },
    });

    return userToken ?? undefined;
  }

  public async save(userToken: UserToken): Promise<UserToken> {
    return await this.repository.save(userToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      token: uuidv4(),
      expires_at: new Date(Date.now() + 3600000),
    });

    await this.save(userToken);

    return userToken;
  }
}
