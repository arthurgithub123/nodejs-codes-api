class GlobalErrorModel {
  constructor(statusCode = 400, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }

  public readonly statusCode: number;
  public readonly message: string;
}

export { GlobalErrorModel };