import type { Request, Response } from "express";
import { createUser, verifyUser } from "../services/user.service";
import User from "../models/User.model";

const getSignUp = async (req: Request, res: Response) => {
  res.render("signup", { title: "Signup" });
};

const getSignIn = async (req: Request, res: Response) => {
  res.render("signin", { title: "SignIn" });
};

const postSignUp = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    res.json({ error: "All fields are required" });
    return;
  }

  try {
    await createUser(fullName, email, password);
    res.redirect("/user/signin");
  } catch (error: any) {
    if (error.type === "USER_EXIST") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ error: "Server error. Please try again later." });
    }
  }
};

const postSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ error: "All fields are required" });
    return;
  }

  try {
    await verifyUser(email, password);
    res.redirect("/");
  } catch (error: any) {
    if (error.type === "USER_NOT_FOUND") {
      res.status(400).json({ message: error.message });
      return;
    } else if (error.type === "INVALID_PASSWORD") {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export { getSignUp, postSignUp, getSignIn, postSignIn };
