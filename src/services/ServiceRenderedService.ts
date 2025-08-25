import { parseISO, toDate } from "date-fns";
import { AppDataSource } from "../config/data-source";
import { Military } from "../entities/Military";
import { ServiceRendered } from "../entities/ServiceRendered";
import { ServiceType } from "../entities/ServiceType";
import { AppError } from "../errors/AppError";

interface Request {
  military_id?: string;
  military?: string;
  service_date: string;
  service_types_id?: string;
  serviceTypes?: string;
}

class ServiceRenderedService {
  public async execute({
    service_date: serviceDateString,
    military_id,
    military,
    service_types_id,
    serviceTypes,
  }: Request): Promise<ServiceRendered> {
    const serviceRenderedRepository =
      AppDataSource.getRepository(ServiceRendered);
    const militaryRepository = AppDataSource.getRepository(Military);
    const serviceTypeRepository = AppDataSource.getRepository(ServiceType);

    let militaryEntity: Military | null = null;
    let serviceTypeEntity: ServiceType | null = null;

    if (military) {
      militaryEntity = await militaryRepository.findOneBy({ name: military });
      if (!militaryEntity) {
        throw new AppError(`Military with name "${military}" not found.`);
      }
    } else if (military_id) {
      militaryEntity = await militaryRepository.findOneBy({ id: military_id });
      if (!militaryEntity) {
        throw new AppError(`Military with ID "${military_id}" not found.`);
      }
    } else {
      throw new AppError("Military name must be provided.");
    }

    if (serviceTypes) {
      serviceTypeEntity = await serviceTypeRepository.findOneBy({
        name: serviceTypes,
      });
      if (!serviceTypeEntity) {
        throw new AppError(
          `Service type with name "${serviceTypes}" not found.`
        );
      }
    } else if (service_types_id) {
      serviceTypeEntity = await serviceTypeRepository.findOneBy({
        id: service_types_id,
      });
      if (!serviceTypeEntity) {
        throw new AppError(
          `Service type with ID "${service_types_id}" not found.`
        );
      }
    } else {
      throw new AppError("Service type name must be provided.");
    }

    const parsedDate = parseISO(serviceDateString);
    const service_date_utc = toDate(parsedDate);

    const checkDuplicate = await serviceRenderedRepository.findOne({
      where: {
        military: { id: militaryEntity.id },
        serviceType: { id: serviceTypeEntity.id },
        service_date: service_date_utc,
      },
    });

    if (checkDuplicate) {
      throw new AppError(
        "Military or service type already exists on the given date."
      );
    }

    const serviceRendered = serviceRenderedRepository.create({
      serviceType: serviceTypeEntity,
      military: militaryEntity,
      service_date: service_date_utc,
    });

    await serviceRenderedRepository.save(serviceRendered);

    return serviceRendered;
  }
}

export { ServiceRenderedService };
