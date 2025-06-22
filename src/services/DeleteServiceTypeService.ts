import ServiceTypesRepository from '../repositories/ServiceTypeRepository'

import AppError from '../errors/AppError'

class DeleteServiceTypeService {
  public async execute(id: string): Promise<void> {
    const serviceTypesRepository = new ServiceTypesRepository()

    const serviceTypeExists = await serviceTypesRepository.findById({ id })

    if (!serviceTypeExists) {
      throw new AppError('Tipo de serviço não encontrado.', 404)
    }

    await serviceTypesRepository.delete(id)
  }
}

export default DeleteServiceTypeService
