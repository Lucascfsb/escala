import { hash } from 'bcryptjs'
import { AppDataSource } from '../config/data-source'
import User from '../entities/User'
import type { Role } from '../entities/User'

interface Request {
  username: string
  email: string
  password: string
  role: Role
}

class CreateUserService {
  async execute({ username, email, password, role }: Request): Promise<User> {
    const usersRepository = AppDataSource.getRepository(User)

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    })

    if (checkUserExists) {
      throw new Error('Email address already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      username,
      email,
      password: hashedPassword,
      role,
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
