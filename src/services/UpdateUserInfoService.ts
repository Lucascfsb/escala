import { compare, hash } from 'bcryptjs'
import type User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'

import AppError from '../errors/AppError'

import type { Role } from '../entities/User'

interface Request {
  id: string
  username?: string
  email?: string
  password?: string
  oldPassword?: string
  passwordConfirmation?: string
  role?: Role
}

class UpdateUserInfoService {
  public async execute({
    id,
    username,
    email,
    password,
    role,
    oldPassword,
    passwordConfirmation,
  }: Request): Promise<User> {
    const userRepository = new UsersRepository()

    const userUpdate = await userRepository.findById({ id })

    if (!userUpdate) {
      throw new AppError('User not found', 404)
    }

    if (email) {
      if (email !== userUpdate.email) {
        const checkEmailExists = await userRepository.findByEmail(email)

        if (checkEmailExists) {
          throw new AppError('Email address already used by another user.')
        }
        userUpdate.email = email
      }
    }

    if (username) {
      userUpdate.username = username
    }

    if (password) {
      if (!oldPassword) {
        throw new AppError('Old password is required to update the password.')
      }

      if (!passwordConfirmation || password !== passwordConfirmation) {
        throw new AppError('Password and password confirmation do not match.', 400)
      }

      const checkOldPassword = await compare(oldPassword, userUpdate.password)

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.', 401)
      }

      userUpdate.password = await hash(password, 8)
    } else if (oldPassword) {
      throw new AppError('New password is required if old password is provided.', 400)
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
