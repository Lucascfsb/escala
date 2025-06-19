import { type FindOperator, ILike } from 'typeorm'
import { AppDataSource } from '../config/data-source'
import Military from '../entities/Military'
import type { Qualification, Rank } from '../entities/Military'

class MilitariesRepository {
  private repository = AppDataSource.getRepository(Military)

  public async findOne({ name, rank }: { name: string; rank?: Rank }): Promise<Military | null> {
    if (!name && !rank) {
      return null
    }

    const whereClause: { name?: string | FindOperator<string>; rank?: Rank } = {}

    if (name) {
      whereClause.name = ILike(`%${name}%`)
    }
    if (rank) {
      whereClause.rank = rank
    }

    const findMilitary = await this.repository.findOne({
      where: whereClause,
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

  public async findManyByName(name: string): Promise<Military[]> {
    const findMilitaries = await this.repository.find({
      where: { name: ILike(`%${name}%`) },
    })
    return findMilitaries
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export default MilitariesRepository
