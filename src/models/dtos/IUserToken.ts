interface IUserToken {
  user: {
    email: string;
    role: string;
  },
  token: string;
}

export { IUserToken };
