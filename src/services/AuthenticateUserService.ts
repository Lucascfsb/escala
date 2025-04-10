import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'
import authConfig from '../config/auth'
import { AppDataSource } from '../config/data-source'
import User from '../entities/User'

import AppError from '../errors/AppError'

import type { Role } from '../entities/User'

interface Request {
  email: string
  password: string
  role: Role
}

interface Response {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password, role }: Request): Promise<Response> {
    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    if (user.role !== role) {
      throw new AppError('Your role is incorrect')
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    } as SignOptions)

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService
