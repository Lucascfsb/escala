import type ServiceType from '../entities/ServiceType'
import ServiceTypesRepository from '../repositories/ServiceTypeRepository'

import AppError from '../errors/AppError'

import type { Role } from '../entities/User'

interface Request {
  id: string
  name?: string
  description?: string
  rank: string
}

class UpdateServiceTypeService {
  public async execute({ id, name, description }: Request): Promise<ServiceType> {
    const servicesTypesRepository = new ServiceTypesRepository()

    const servicesTypesUpdate = await servicesTypesRepository.findById({ id })

    if (!servicesTypesUpdate) {
      throw new AppError('Service not found', 404)
    }

    if (name) {
      servicesTypesUpdate.name = name
    }
    if (description) {
      servicesTypesUpdate.description = description
    }

    servicesTypesUpdate.updated_at = new Date()

    await servicesTypesRepository.save(servicesTypesUpdate)

    return servicesTypesUpdate
  }
}

export default UpdateServiceTypeService
