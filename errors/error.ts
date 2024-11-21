class AppError extends Error {
  statusCode: number;
  type: string;

  constructor(message: string, statusCode: number, type: string) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    Error.captureStackTrace(this, this.constructor);
  }
}

class UserExistsError extends AppError {
  constructor() {
    super("User already exists", 400, "USER_EXIST");
  }
}

class UserNotFoundError extends AppError {
  constructor() {
    super("User not found", 400, "USER_NOT_FOUND");
  }
}

class InvalidPasswordError extends AppError {
  constructor() {
    super("Invalid password", 400, "INVALID_PASSWORD");
  }
}

export { AppError, UserExistsError, UserNotFoundError, InvalidPasswordError };
