import type Military from '../entities/Military'
import type { Qualification, Rank } from '../entities/Military'
import MilitariesRepository from '../repositories/MilitariesRepository'

interface Request {
  name: string
  rank: Rank
  qualification: Qualification
  date_of_entry: Date
  created_at: Date
  updated_at: Date
}

class CreateMilitaryService {
  public async execute({
    name,
    qualification,
    date_of_entry,
    rank,
    created_at,
    updated_at,
  }: Request): Promise<Military> {
    const militariesRepository = new MilitariesRepository()

    const findMilitary = await militariesRepository.findOne({
      name,
      rank,
    })

    if (findMilitary) {
      throw new Error('Esse militar já existe no banco de dados!')
    }

    const military = await militariesRepository.create({
      name,
      rank,
      qualification,
      date_of_entry,
      created_at,
      updated_at,
    })

    if (military) {
      await militariesRepository.save(military)
    } else {
      throw new Error('Falha ao criar militar')
    }

    return military
  }
}

export default CreateMilitaryService
