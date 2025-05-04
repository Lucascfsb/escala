import { AppDataSource } from '../config/data-source'
import Military from '../entities/Military'
import type { Qualification, Rank } from '../entities/Military'
import AppError from '../errors/AppError'

class MilitariesRepository {
  private repository = AppDataSource.getRepository(Military)

  public async findOne({ name, rank }: { name: string; rank?: Rank }): Promise<Military | null> {
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

  public async findById(id: string): Promise<Military | null> {
    const militaryId = await this.repository.findOne({
      where: { id },
    })

    return militaryId
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

  public async findByName(name: string): Promise<Military | undefined> {
    const findMilitary = await this.repository.findOne({
      where: { name },
    })
    return findMilitary || undefined
  }
}

export default MilitariesRepository
