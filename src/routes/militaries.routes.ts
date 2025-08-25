import { Router } from "express";

import { MilitariesRepository } from "../repositories/MilitariesRepository";
import { CreateMilitaryService } from "../services/CreateMilitaryService";
import { DeleteMilitaryService } from "../services/DeleteMilitaryService";
import { UpdateMilitaryInfoService } from "../services/UpdateMilitaryInfoService";

import type { Military } from "../entities/Military";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const militariesRouter = Router();

militariesRouter.use(ensureAuthenticated);

militariesRouter.get("/", async (request, response) => {
  const militariesRepository = new MilitariesRepository();
  const { name } = request.query;

  let militaries: Military[];

  try {
    if (name && typeof name === "string") {
      militaries = await militariesRepository.findManyByName(name);
    } else {
      militaries = await militariesRepository.findAll();
    }
    return response.json(militaries);
  } catch (error) {
    console.error("Erro ao buscar/listar militares:", error);
    return response
      .status(500)
      .json({ error: "Erro ao processar a requisição de militares." });
  }
});

militariesRouter.post("/", ensureAdmin, async (request, response) => {
  const { name, rank, qualification, date_of_entry, created_at, updated_at } =
    request.body;

  const createMilitary = new CreateMilitaryService();

  const military = await createMilitary.execute({
    name,
    qualification,
    date_of_entry,
    rank,
    created_at,
    updated_at,
  });
  return response.json(military);
});

militariesRouter.put(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  async (request, response) => {
    const { id } = request.params;
    const { name, rank, qualification, date_of_entry } = request.body;

    const updateMilitary = new UpdateMilitaryInfoService();
    const military = await updateMilitary.execute({
      id,
      name,
      rank,
      qualification,
      date_of_entry,
    });

    return response.json(military);
  }
);

militariesRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const deleteMilitaryService = new DeleteMilitaryService();

  await deleteMilitaryService.execute(id);

  return response.status(204).send();
});

export { militariesRouter };
