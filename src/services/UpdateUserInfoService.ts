import type User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'

import AppError from '../errors/AppError'

import type { Role } from '../entities/User'

interface Request {
  id: string
  username: string
  email?: string
  password?: string
  role?: Role
}

class UpdateUserInfoService {
  public async execute({ id, username, email, password, role }: Request): Promise<User> {
    const userRepository = new UsersRepository()

    const userUpdate = await userRepository.findById({ id })

    if (!userUpdate) {
      throw new AppError('User not found', 404)
    }

    if (username) {
      userUpdate.username = username
    }
    if (email) {
      userUpdate.email = email
    }
    if (password) {
      userUpdate.password = password
    }
    if (role) {
      userUpdate.role = role
    }

    userUpdate.updated_at = new Date()

    await userRepository.save(userUpdate)

    return userUpdate
  }
}

export default UpdateUserInfoService
