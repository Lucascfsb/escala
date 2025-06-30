import { AppDataSource } from '../database'
import ServiceTypes from '../entities/ServiceType'

import { QueryFailedError } from 'typeorm'
import AppError from '../errors/AppError'

interface Request {
  name: string
  description: string
  rank: string
  created_at: Date
  updated_at: Date
}

class CreateServiceTypeService {
  public async execute({
    name,
    description,
    rank,
    created_at,
    updated_at,
  }: Request): Promise<ServiceTypes> {
    const serviceTypesRepository = AppDataSource.getRepository(ServiceTypes)

    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new AppError('O nome do serviço é obrigatório e deve ser uma string não vazia.', 400)
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
      throw new AppError(
        'A descrição do serviço é obrigatória e deve ser uma string não vazia.',
        400
      )
    }

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
        rank,
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
