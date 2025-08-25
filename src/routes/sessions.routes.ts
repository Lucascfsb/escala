import { Router } from "express";

import { instanceToPlain } from "class-transformer";

import { AuthenticateUserService } from "../services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const userResponse = instanceToPlain(user);

  return response.json({ user: userResponse, token });
});

export { sessionsRouter };
