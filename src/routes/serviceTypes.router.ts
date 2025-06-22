import { Router } from 'express'

import type ServiceTypes from '../entities/ServiceType'
import ensureAdmin from '../middlewares/ensureAdmin'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ServiceTypesRepository from '../repositories/ServiceTypeRepository'
import CreateServiceTypesService from '../services/CreateServiceTypeService'
import DeleteServiceTypeService from '../services/DeleteServiceTypeService'
import UpdateServiceTypeService from '../services/UpdateServiceTypeService'

const serviceTypesRouter = Router()

serviceTypesRouter.use(ensureAuthenticated)

serviceTypesRouter.post('/', ensureAuthenticated, ensureAdmin, async (request, response) => {
  const { name, description, created_at, updated_at } = request.body

  const createServiceType = new CreateServiceTypesService()

  const serviceType = await createServiceType.execute({
    name,
    description,
    created_at,
    updated_at,
  })
  return response.json(serviceType)
})

serviceTypesRouter.put('/:id', ensureAuthenticated, ensureAdmin, async (request, response) => {
  const { id } = request.params
  const { name, description } = request.body

  const updateServiceTypes = new UpdateServiceTypeService()
  const servicesTypes = await updateServiceTypes.execute({
    id,
    name,
    description,
  })

  return response.json(servicesTypes)
})

serviceTypesRouter.get('/', async (request, response) => {
  const serviceTypesRepository = new ServiceTypesRepository()
  const { name } = request.query

  let servicesType: ServiceTypes[]

  try {
    if (name && typeof name === 'string') {
      servicesType = await serviceTypesRepository.findByName(name)
    } else {
      servicesType = await serviceTypesRepository.findAll()
    }
    return response.json(servicesType)
  } catch (error) {
    console.error('Error fetching service types:', error)
    return response.status(500).json({ error: 'Error processing the request for service types.' })
  }
})

serviceTypesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  const deleteServiceTypeService = new DeleteServiceTypeService()

  await deleteServiceTypeService.execute(id)

  return response.status(204).send()
})

export default serviceTypesRouter
