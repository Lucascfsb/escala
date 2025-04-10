import type { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../database'
import User from '../entities/User'
import { Role } from '../entities/User' // Adjust the path as needed
import AppError from '../errors/AppError'

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const usersRepository = AppDataSource.getRepository(User)
  const { id } = request.user

  const user = await usersRepository.findOne({ where: { id } })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  if (user.role !== Role.Admin) {
    throw new AppError('User is not an admin.', 401)
  }

  return next()
}

export default ensureAdmin
