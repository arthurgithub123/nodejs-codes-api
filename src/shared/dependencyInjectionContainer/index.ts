import { container } from "tsyringe";

import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { UsersRepository } from "../../repositories/implementations/UsersReposirory";

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);