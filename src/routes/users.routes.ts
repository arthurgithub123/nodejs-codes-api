import { Router } from "express";

import { CreateUserController } from "../controllers/CreateUserController";
import { CreateAdministratorController } from "../controllers/CreateAdministratorController";

import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { AdministratorAuthorizationMiddleware } from "../middlewares/AdministratorAuthorizationMiddleware";

const usersRouter = Router();

const createUserController = new CreateUserController();
const createAdministratorController = new CreateAdministratorController();

usersRouter.post('/user', createUserController.handle);
usersRouter.post('/administrator', AuthenticationMiddleware, AdministratorAuthorizationMiddleware, createAdministratorController.handle);

export { usersRouter };
