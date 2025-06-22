import { ILike } from 'typeorm'
import { AppDataSource } from '../config/data-source'
import ServiceTypes from '../entities/ServiceType'

class ServiceTypesRepository {
  private repository = AppDataSource.getRepository(ServiceTypes)

  public async findAll(): Promise<ServiceTypes[]> {
    return this.repository.find()
  }

  public async save(serviceTypes: ServiceTypes): Promise<ServiceTypes> {
    const servicesTypesRepository = AppDataSource.getRepository(ServiceTypes)
    return await servicesTypesRepository.save(serviceTypes)
  }

  public async findById({ id }: { id: string }): Promise<ServiceTypes | null> {
    const findServiceTypes = await this.repository.findOne({
      where: {
        id,
      },
    })
    return findServiceTypes || null
  }

  public async findByName(name: string): Promise<ServiceTypes[]> {
    const findServiceTypes = await this.repository.find({
      where: { name: ILike(`%${name}%`) },
    })
    return findServiceTypes
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export default ServiceTypesRepository
