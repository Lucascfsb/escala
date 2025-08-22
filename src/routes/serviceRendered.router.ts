import { Router } from 'express'

import type ServiceRendered from '../entities/ServiceRendered'
import AppError from '../errors/AppError'
import ensureAdmin from '../middlewares/ensureAdmin'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ServiceRenderedRepository from '../repositories/ServiceRenderedRepository'
import ServiceRenderedService from '../services/ServiceRenderedService'
import UpdateServiceRenderedService from '../services/UpdateServiceRenderedService'

const serviceRenderedRouter = Router()

serviceRenderedRouter.use(ensureAuthenticated)

serviceRenderedRouter.post('/', ensureAdmin, async (request, response) => {
  const { military_id, service_types_id, service_date, military, serviceTypes } = request.body

  const createService = new ServiceRenderedService()

  const serviceRendered = await createService.execute({
    service_date,
    military_id,
    service_types_id,
    military,
    serviceTypes,
  })

  return response.json(serviceRendered)
})

serviceRenderedRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { military_id, military, service_types_id, serviceTypes, service_date } = request.body

  const updateServiceRendered = new UpdateServiceRenderedService()
  const serviceRendered = await updateServiceRendered.execute({
    id,
    military_id,
    military,
    service_types_id,
    serviceTypes,
    service_date,
  })

  return response.json(serviceRendered)
})

serviceRenderedRouter.get('/', async (request, response) => {
  const serviceRenderedRepository = new ServiceRenderedRepository()
  const { startDate, endDate } = request.query

  let servicesRendered: ServiceRendered[]
  if (startDate && endDate) {
    servicesRendered = await serviceRenderedRepository.findByDateRange(
      String(startDate),
      String(endDate)
    )
  } else {
    servicesRendered = await serviceRenderedRepository.findAll()
  }

  return response.json(servicesRendered)
})

serviceRenderedRouter.get('/:name', async (request, response) => {
  const serviceRenderedRepository = new ServiceRenderedRepository()
  const { name } = request.params
  const military = await serviceRenderedRepository.findByName(name)

  if (military) {
    return response.json(military)
  }
  return response.status(404).json({ error: 'Militar não encontrado' })
})

serviceRenderedRouter.delete('/:id', ensureAdmin, async (request, response) => {
  const { id } = request.params
  const serviceRenderedRepository = new ServiceRenderedRepository()

  const serviceRenderedToDelete = await serviceRenderedRepository.findById({ id })
  if (!serviceRenderedToDelete) {
    throw new AppError('Service not found', 404)
  }

  await serviceRenderedRepository.delete(id) // Adicione um método delete no seu repositório

  return response.status(204).send() // Retorna 204 No Content para sucesso sem resposta
})

export default serviceRenderedRouter
