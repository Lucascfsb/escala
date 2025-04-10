import { AppDataSource } from '../config/data-source'
import User from '../entities/User'

class UsersRepository {
  private repository = AppDataSource.getRepository(User)

  public async findAll(): Promise<User[]> {
    return this.repository.find()
  }
}

export default UsersRepository
