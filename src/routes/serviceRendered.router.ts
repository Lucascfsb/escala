import { Router } from 'express'

import ensureAdmin from '../middlewares/ensureAdmin'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ServiceRenderedService from '../services/ServiceRenderedService'

const serviceRenderedRouter = Router()

serviceRenderedRouter.use(ensureAuthenticated)

serviceRenderedRouter.post('/', ensureAdmin, async (request, response) => {
  const {
    military_id,
    service_types_id,
    service_date,
    military,
    serviceTypes,
  } = request.body

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

export default serviceRenderedRouter
