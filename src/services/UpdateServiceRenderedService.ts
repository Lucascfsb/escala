import type Military from '../entities/Military'
import type ServiceRendered from '../entities/ServiceRendered'
import type ServiceType from '../entities/ServiceType'
import AppError from '../errors/AppError'
import MilitaryRepository from '../repositories/MilitariesRepository'
import ServiceRenderedRepository from '../repositories/ServiceRenderedRepository'
import ServiceTypeRepository from '../repositories/ServiceTypeRepository'

interface Request {
  id: string
  military_id?: string
  military?: string
  service_types_id?: string
  serviceTypes?: string
  service_date?: Date
}

class UpdateServiceRenderedService {
  public async execute({
    id,
    military_id,
    military,
    service_types_id,
    serviceTypes,
    service_date,
  }: Request): Promise<ServiceRendered> {
    const serviceRenderedRepository = new ServiceRenderedRepository()
    const militaryRepository = new MilitaryRepository()
    const serviceTypeRepository = new ServiceTypeRepository()

    const serviceRenderedUpdate = await serviceRenderedRepository.findById({ id })

    if (!serviceRenderedUpdate) {
      throw new AppError('Service not found', 404)
    }

    if (military || military_id) {
      let militaryToUpdate: Military | undefined

      if (military_id) {
        const foundMilitary = await militaryRepository.findById(military_id)
        militaryToUpdate = foundMilitary === null ? undefined : foundMilitary
        if (!militaryToUpdate) {
          throw new AppError('Military not found with provided ID', 404)
        }
      } else if (military) {
        const foundMilitaries = await militaryRepository.findManyByName(military)
        if (!foundMilitaries || foundMilitaries.length === 0) {
          throw new AppError(`Military "${military}" not found`, 404)
        }
        militaryToUpdate = foundMilitaries[0]
      }

      if (militaryToUpdate) {
        serviceRenderedUpdate.military = militaryToUpdate
        serviceRenderedUpdate.military_id = militaryToUpdate.id
      }
    }

    if (serviceTypes || service_types_id) {
      let serviceTypeToUpdate: ServiceType | undefined

      if (service_types_id) {
        const foundServiceType = await serviceTypeRepository.findById({ id: service_types_id })
        serviceTypeToUpdate = foundServiceType === null ? undefined : foundServiceType
        if (!serviceTypeToUpdate) {
          throw new AppError('Service type not found with provided ID', 404)
        }
      } else if (serviceTypes) {
        const foundServiceTypes = await serviceTypeRepository.findByName(serviceTypes)
        if (!foundServiceTypes || foundServiceTypes.length === 0) {
          throw new AppError(`Service type "${serviceTypes}" not found`, 404)
        }
        serviceTypeToUpdate = foundServiceTypes[0]
      }

      if (serviceTypeToUpdate) {
        serviceRenderedUpdate.serviceType = serviceTypeToUpdate
        serviceRenderedUpdate.service_types_id = serviceTypeToUpdate.id
      }
    }

    if (service_date) {
      serviceRenderedUpdate.service_date = service_date
    }

    serviceRenderedUpdate.updated_at = new Date()

    await serviceRenderedRepository.save(serviceRenderedUpdate)

    return serviceRenderedUpdate
  }
}

export default UpdateServiceRenderedService
