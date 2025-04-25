import { AppDataSource } from '../config/data-source'
import ServiceTypes from '../entities/ServiceType'

class ServiceTypesRepository {
  private repository = AppDataSource.getRepository(ServiceTypes)

  public async findAll(): Promise<ServiceTypes[]> {
    return this.repository.find()
  }
}

export default ServiceTypesRepository
