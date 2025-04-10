import { Router } from 'express'

import ensureAdmin from '../middlewares/ensureAdmin'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ServiceTypesRepository from '../repositories/ServiceTypeRepository'
import CreateServiceTypesService from '../services/CreateServiceTypeService'

const serviceTypesRouter = Router()

serviceTypesRouter.use(ensureAuthenticated)

serviceTypesRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  async (request, response) => {
    const { name, description, created_at, updated_at } = request.body

    const createServiceType = new CreateServiceTypesService()

    const serviceType = await createServiceType.execute({
      name,
      description,
      created_at,
      updated_at,
    })
    return response.json(serviceType)
  }
)

serviceTypesRouter.get('/', async (request, response) => {
  const serviceTypesRepository = new ServiceTypesRepository()
  const servicesTypes = await serviceTypesRepository.findAll()

  return response.json(servicesTypes)
})

export default serviceTypesRouter
