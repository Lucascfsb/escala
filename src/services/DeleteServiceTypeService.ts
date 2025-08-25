import { ServiceTypeRepository } from "../repositories/ServiceTypeRepository";

import { AppError } from "../errors/AppError";

class DeleteServiceTypeService {
  public async execute(id: string): Promise<void> {
    const serviceTypesRepository = new ServiceTypeRepository();

    const serviceTypeExists = await serviceTypesRepository.findById({ id });

    if (!serviceTypeExists) {
      throw new AppError("Tipo de serviço não encontrado.", 404);
    }

    //finde na lista de servicço, para ver se um esta sendo utilizado. E

    await serviceTypesRepository.delete(id);
  }
}

export { DeleteServiceTypeService };
