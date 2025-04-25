import { AppDataSource } from '../database'
import ServiceTypes from '../entities/ServiceType'

import { QueryFailedError } from 'typeorm'
import AppError from '../errors/AppError'

interface Request {
  name: string
  description: string
  created_at: Date
  updated_at: Date
}

class CreateServiceTypeService {
  public async execute({
    name,
    description,
    created_at,
    updated_at,
  }: Request): Promise<ServiceTypes> {
    const serviceTypesRepository = AppDataSource.getRepository(ServiceTypes)

    const lowerCaseName = name.toLowerCase()

    try {
      const checkserviceTypesExists = await serviceTypesRepository.findOne({
        where: { name: lowerCaseName },
      })

      if (checkserviceTypesExists) {
        throw new AppError('This name is already used.')
      }

      const serviceType = serviceTypesRepository.create({
        name,
        description,
        created_at,
        updated_at,
      })

      await serviceTypesRepository.save(serviceType)

      return serviceType
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new AppError('This name is already used.')
      }
      throw error
    }
  }
}
export default CreateServiceTypeService
