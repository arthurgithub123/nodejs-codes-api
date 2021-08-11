import { Router } from "express";

import { CreateUserController } from "../controllers/CreateUserController";
import { CreateAdministratorController } from "../controllers/CreateAdministratorController";

const usersRouter = Router();

const createUserController = new CreateUserController();
const createAdministratorController = new CreateAdministratorController();

usersRouter.post('/user', createUserController.handle);
usersRouter.post('/administrator', createAdministratorController.handle);

export { usersRouter };