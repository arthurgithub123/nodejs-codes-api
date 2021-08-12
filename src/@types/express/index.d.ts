declare namespace Express {
  export interface Request extends express.Request {
    user: {
      id: string,
      role: string;
    }
  }
}
