import { AppDataSource } from '../config/data-source'
import Military from '../entities/Military'
import type { Qualification, Rank } from '../entities/Military'

class MilitariesRepository {
  private repository = AppDataSource.getRepository(Military)

  public async findOne({
    name,
    rank,
  }: { name: string; rank?: Rank }): Promise<Military | null> {
    if (!name && !rank) {
      return null
    }

    const findMilitary = await this.repository.findOne({
      where: {
        name,
        rank,
      },
    })

    return findMilitary || null
  }

  public async findAll(): Promise<Military[]> {
    return this.repository.find()
  }

  public async create({
    name,
    rank,
    qualification,
    date_of_entry,
    created_at,
    updated_at,
  }: {
    name: string
    rank: Rank
    qualification: Qualification
    date_of_entry: Date
    created_at: Date
    updated_at: Date
  }): Promise<Military | null> {
    const military = this.repository.create({
      name,
      rank,
      qualification,
      date_of_entry,
      created_at,
      updated_at,
    })
    await this.repository.save(military)
    return military
  }

  public async save(military: Military): Promise<Military> {
    const militaryRepository = AppDataSource.getRepository(Military)
    return await militaryRepository.save(military)
  }
}

export default MilitariesRepository
