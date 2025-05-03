import { AppDataSource } from '../database'
import ServiceRendered from '../entities/ServiceRendered'

class ServiceRenderedRepository {
  private repository = AppDataSource.getRepository(ServiceRendered)

  public async findAll(): Promise<ServiceRendered[]> {
    return this.repository.find({
      relations: ['military', 'serviceType'],
    })
  }

  public async findByName(military: string): Promise<ServiceRendered | null> {
    return this.repository.findOne({
      where: { military: { name: military } },
      relations: ['military', 'serviceType'],
    })
  }

  public async update(id: string, data: Partial<ServiceRendered>): Promise<ServiceRendered | null> {
    await this.repository.update(id, data)
    return this.repository.findOne({ where: { id } })
  }
}

export default ServiceRenderedRepository
