import type { Response } from "express";
import {
  InvalidPasswordError,
  UserExistsError,
  UserNotFoundError,
} from "../errors/error";

const handleError = (error: Error, res: Response) => {
  if (
    error instanceof UserExistsError ||
    error instanceof UserNotFoundError ||
    error instanceof InvalidPasswordError
  ) {
    res.render("signin", {
      title: "Error",
      error: { message: error.message },
    });
    return;
  }
  console.error(error);
  return (
    res
      .status(500)
      // .json({ error: "Server error. Please try again later." });
      .render("signin", {
        title: "SignIn",
        error: "Server error. Please try again later.",
      })
  );
};

export { handleError };
