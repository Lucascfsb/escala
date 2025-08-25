import { instanceToPlain } from "class-transformer";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UpdateUserInfoService } from "../services/UpdateUserInfoService";

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.put("/", async (request, response) => {
  const user_id = request.user.id;
  const { username, email, role, oldPassword, password, passwordConfirmation } =
    request.body;

  const updateUserInfo = new UpdateUserInfoService();
  const user = await updateUserInfo.execute({
    id: user_id,
    username,
    email,
    role,
    oldPassword,
    password,
    passwordConfirmation,
  });

  const userResponse = instanceToPlain(user);
  const { password: userPassword, ...userResponseWithoutPassword } =
    userResponse;

  return response.json(userResponseWithoutPassword);
});

export { profileRouter };
