import { UserRepositoryMock } from "./mock-repositories/UserRepositoryMock";

import { CreateUserService } from "../../src/services/CreateUserService";

import { GlobalErrorModel } from "../../src/models/GlobalErrorModel";
import { ICreateUserDTO } from "../../src/models/dtos/ICreateUserDTO";

describe('User creation', () => {
  let userRepositoryMock = new UserRepositoryMock();
  let createUserService =  new CreateUserService(userRepositoryMock);
  
  let user: ICreateUserDTO;

  beforeEach(() => {
    user = {
      name: 'first name last name',
      email: 'useremail@gmail.com',
      password: '1234567890-A',
      role: 'User'
    };
  });

  it('Should not be able to create user with null name', () => {
    user.name = null;
    
    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Name can not be null or empty')
    );
  });

  it('Should not be able to create user with empty name', () => {
    user.name = '';

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Name can not be null or empty')
    );
  });

  it('Should not be able to create user with name being less than 6 characters', () => {
    user.name = 'name';

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Name must be at least 6 characters long')
    );
  });

  it('Should not be able to create user with null email', () => {
    user.email = null;

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Email can not be null or empty')
    );
  });

  it('Should not be able to create user with empty email', () => {
    user.email = '';

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Email can not be null or empty')
    );
  });

  it('Should not be able to create user with invalid email format', () => {
    user.email = 'useremailgmail.com';

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Invalid email format')
    );

    user.email = 'useremail@gmailcom';

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Invalid email format')
    );

    user.email = 'useremailgmailcom';

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Invalid email format')
    );
  });

  it('Should not be able to create user with null password', () => {
    user.password = null;

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Password can not be null or empty')
    );
  });

  it('Should not be able to create user with empty password', () => {
    user.password = '';

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Password can not be null or empty')
    );
  });

  it('Should not be able to create user with password being less than 10 characters long', () => {
    user.password = '1234567-A';

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Password must be at least 10 characters long')
    );
  });

  it('Should not be able to create user without password having at least one character for - or + or = or _', () => {
    user.password = '123456789aA';

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Password must have at least one character for - or + or = or _')
    );
  });

  it('Should not be able to create user without password having one capital letter', async () => {
    user.password = '123456789-a';

    expect(createUserService.execute(user))
    .rejects
    .toEqual(
      new GlobalErrorModel('Password must have a capital letter')
    );
  });
});
