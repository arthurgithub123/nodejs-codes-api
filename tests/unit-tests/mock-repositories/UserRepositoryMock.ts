import { IUsersRepository } from "../../../src/repositories/interfaces/IUsersRepository";

import { ICreateUserDTO } from "../../../src/models/dtos/ICreateUserDTO";
import { User } from "../../../src/models/entities/User";

class UserRepositoryMock implements IUsersRepository{
  users: User[] = [];

  async create({ name, email, role, password }: ICreateUserDTO): Promise<void> {
    const newUser = new User();
    
    Object.assign(newUser, {
      name,
      email,
      password,
      roles: [role],
      created_at: new Date()
    });

    this.users.push(newUser);
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(currentUser => currentUser.id.includes(id));
    console.log('user ', user)
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(currentUser => currentUser.email.includes(email));
    return user;
  }

  async updatePassword(id: string, password: string): Promise<void> {
    for(var i=0; i < this.users.length; i++) {
      if(this.users[i].id.includes(id)) {
        this.users[i].passwordHash = password;
        break;
      }
    }
  }
}

export { UserRepositoryMock };
