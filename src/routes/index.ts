import { Router } from "express";
import { militariesRouter } from "./militaries.routes";
import { passwordRouter } from "./password.routes";
import { profileRouter } from "./profile.routes";
import { serviceRenderedRouter } from "./serviceRendered.routes";
import { serviceTypesRouter } from "./serviceTypes.routes";
import { sessionsRouter } from "./sessions.routes";
import { usersRouter } from "./users.routes";

export const routes = Router();

routes.use("/militaries", militariesRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/serviceTypes", serviceTypesRouter);
routes.use("/serviceRendered", serviceRenderedRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRouter);
