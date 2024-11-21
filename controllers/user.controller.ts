import type { Request, Response } from "express";
import { createUser, verifyUser } from "../services/user.service";
import { handleError } from "../utils/handleError";

const getSignUp = async (req: Request, res: Response) => {
  res.render("signup", { title: "Signup" });
};

const getSignIn = async (req: Request, res: Response) => {
  res.render("signin", { title: "SignIn" });
};

const postSignUp = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    await createUser(fullName, email, password);
    res.redirect("/user/signin");
  } catch (error: any) {
    handleError(error, res);
  }
};

const postSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    await verifyUser(email, password);
    res.redirect("/");
  } catch (error: any) {
    handleError(error, res);
  }
};

export { getSignUp, postSignUp, getSignIn, postSignIn };
