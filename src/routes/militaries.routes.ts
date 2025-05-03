import { Router } from 'express'

import MilitariesRepository from '../repositories/MilitariesRepository'
import CreateMilitaryService from '../services/CreateMilitaryService'
import UpdateMilitaryInfo from '../services/UpdateMilitaryInfoService'

import ensureAdmin from '../middlewares/ensureAdmin'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const militariesRouter = Router()

militariesRouter.use(ensureAuthenticated)

militariesRouter.get('/', async (request, response) => {
  const militariesRepository = new MilitariesRepository()
  const militaries = await militariesRepository.findAll()

  return response.json(militaries)
})

militariesRouter.get('/:name', async (request, response) => {
  const militariesRepository = new MilitariesRepository()
  const { name } = request.params
  const military = await militariesRepository.findOne({ name })

  if (military) {
    return response.json(military)
  }
  return response.status(404).json({ error: 'Militar não encontrado' })
})

militariesRouter.post('/', ensureAdmin, async (request, response) => {
  const { name, rank, qualification, date_of_entry, created_at, updated_at } = request.body

  const createMilitary = new CreateMilitaryService()

  const military = await createMilitary.execute({
    name,
    qualification,
    date_of_entry,
    rank,
    created_at,
    updated_at,
  })
  return response.json(military)
})

militariesRouter.put('/:id', ensureAuthenticated, ensureAdmin, async (request, response) => {
  const { id } = request.params
  const { name, rank, qualification, date_of_entry } = request.body

  const updateMilitary = new UpdateMilitaryInfo()
  const military = await updateMilitary.execute({
    id,
    name,
    rank,
    qualification,
    date_of_entry,
  })

  return response.json(military)
})

export default militariesRouter
