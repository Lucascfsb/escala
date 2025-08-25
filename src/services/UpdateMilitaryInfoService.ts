import type { Military } from "../entities/Military";
import type { Qualification, Rank } from "../entities/Military";
import { MilitariesRepository } from "../repositories/MilitariesRepository";

import { AppError } from "../errors/AppError";

interface Request {
  id: string;
  name?: string;
  rank?: Rank;
  qualification?: Qualification;
  date_of_entry?: Date;
}

class UpdateMilitaryInfoService {
  public async execute({
    id,
    name,
    qualification,
    date_of_entry,
    rank,
  }: Request): Promise<Military> {
    const militariesRepository = new MilitariesRepository();

    const militaryUpdate = await militariesRepository.findById(id);

    if (!militaryUpdate) {
      throw new AppError("Military not found", 404);
    }

    if (name) {
      militaryUpdate.name = name;
    }
    if (rank) {
      militaryUpdate.rank = rank;
    }
    if (qualification) {
      militaryUpdate.qualification = qualification;
    }
    if (date_of_entry) {
      militaryUpdate.date_of_entry = date_of_entry;
    }

    militaryUpdate.updated_at = new Date();

    await militariesRepository.save(militaryUpdate);

    return militaryUpdate;
  }
}

export { UpdateMilitaryInfoService };
