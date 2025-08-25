import { MilitariesRepository } from "../repositories/MilitariesRepository";

import { AppError } from "../errors/AppError";

class DeleteMilitaryService {
  public async execute(id: string): Promise<void> {
    const militariesRepository = new MilitariesRepository();

    const militaryExists = await militariesRepository.findById(id);

    if (!militaryExists) {
      throw new AppError("Militar não encontrado.", 404);
    }

    await militariesRepository.delete(id);
  }
}

export { DeleteMilitaryService };
