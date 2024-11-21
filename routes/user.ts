import { Router } from "express";
import User from "../models/User.model";
import {
  getSignUp,
  postSignUp,
  getSignIn,
  postSignIn,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.redirect("/");
});

userRouter.route("/signin").get(getSignIn).post(postSignIn);

userRouter.route("/signup").get(getSignUp).post(postSignUp);

export default userRouter;
