import { Router } from "express";
import User from "../models/User.model";
import {
  getSignUp,
  postSignUp,
  getSignIn,
  postSignIn,
  getLogout,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", async (req: any, res) => {
  res.render("signin", { title: "Signin", user: req.user });
});

userRouter.route("/signin").get(getSignIn).post(postSignIn);

userRouter.route("/signup").get(getSignUp).post(postSignUp);

userRouter.route("/logout").get(getLogout);

export { userRouter };
