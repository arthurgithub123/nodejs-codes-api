import { container } from "tsyringe";

import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { UsersRepository } from "../../repositories/implementations/UsersReposirory";

import { IRolesRepository } from "../../repositories/interfaces/IRolesRepository";
import { RolesRepository } from "../../repositories/implementations/RolesRepository";

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepository);
