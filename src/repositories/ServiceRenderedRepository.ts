import { Between } from 'typeorm' // Importe o operador Between do TypeORM
import { AppDataSource } from '../database'
import ServiceRendered from '../entities/ServiceRendered'

class ServiceRenderedRepository {
  private repository = AppDataSource.getRepository(ServiceRendered)

  public async findByDateRange(startDate: string, endDate: string): Promise<ServiceRendered[]> {
    return this.repository.find({
      where: {
        service_date: Between(new Date(startDate), new Date(endDate)),
      },
      relations: ['military', 'serviceType'],
      order: {
        service_date: 'ASC', // Ordenar por data para facilitar no frontend
      },
    })
  }

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

  public async findById({ id }: { id: string }): Promise<ServiceRendered | null> {
    const findServiceRendered = await this.repository.findOne({
      where: {
        id,
      },
    })
    return findServiceRendered || null
  }

  public async save(serviceRendered: ServiceRendered): Promise<ServiceRendered> {
    return await this.repository.save(serviceRendered)
  }

  public async update(id: string, data: Partial<ServiceRendered>): Promise<ServiceRendered | null> {
    await this.repository.update(id, data)
    return this.repository.findOne({
      where: { id },
      relations: ['military', 'serviceType'],
    })
  }
}

export default ServiceRenderedRepository
