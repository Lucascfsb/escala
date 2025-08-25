import { ILike } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { ServiceType } from "../entities/ServiceType";

export class ServiceTypeRepository {
  private repository = AppDataSource.getRepository(ServiceType);

  public async findAll(): Promise<ServiceType[]> {
    return this.repository.find();
  }

  public async save(serviceType: ServiceType): Promise<ServiceType> {
    const servicesTypesRepository = AppDataSource.getRepository(ServiceType);
    return await servicesTypesRepository.save(serviceType);
  }

  public async findById({ id }: { id: string }): Promise<ServiceType | null> {
    const findServiceType = await this.repository.findOne({
      where: {
        id,
      },
    });
    return findServiceType || null;
  }

  public async findByName(name: string): Promise<ServiceType[]> {
    const findServiceType = await this.repository.find({
      where: { name: ILike(`%${name}%`) },
    });
    return findServiceType;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
