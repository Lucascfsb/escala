import { AppDataSource } from '../config/data-source'
import User from '../entities/User'

class UsersRepository {
  private repository = AppDataSource.getRepository(User)

  public async findAll(): Promise<User[]> {
    return this.repository.find()
  }

  public async save(user: User): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)
    return await userRepository.save(user)
  }

  public async findOne({ username }: { username: string }): Promise<User | null> {
    if (!username) {
      return null
    }

    const findUser = await this.repository.findOne({
      where: {
        username,
      },
    })
    return findUser || null
  }
}

export default UsersRepository
