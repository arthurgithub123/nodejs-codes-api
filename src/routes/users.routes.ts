import { Router } from "express";

import { CreateUserController } from "../controllers/CreateUserController";
import { CreateAdministratorController } from "../controllers/CreateAdministratorController";

import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { AdministratorAuthorizationMiddleware } from "../middlewares/AdministratorAuthorizationMiddleware";
import { GenerateResetPasswordAndEmailController } from "../controllers/GenerateResetPasswordAndEmailController";
import { CreatePasswordController } from "../controllers/CreatePasswordController";

const usersRouter = Router();

const createUserController = new CreateUserController();
const createAdministratorController = new CreateAdministratorController();

usersRouter.post('/user', createUserController.handle);
usersRouter.post('/administrator', AuthenticationMiddleware, AdministratorAuthorizationMiddleware, createAdministratorController.handle);

const generateResetPasswordAndEmailController = new GenerateResetPasswordAndEmailController();
usersRouter.post('/forgot_password', generateResetPasswordAndEmailController.handle)

const createPasswordController = new CreatePasswordController();
usersRouter.post('/create_password', createPasswordController.handle);

export { usersRouter };
