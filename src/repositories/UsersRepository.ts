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

  public async findById({ id }: { id: string }): Promise<User | null> {
    const findUser = await this.repository.findOne({
      where: {
        id,
      },
    })
    return findUser || null
  }
}

export default UsersRepository
