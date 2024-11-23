import { Router } from "express";
import User from "../models/User.model";
import {
  getSignUp,
  postSignUp,
  getSignIn,
  postSignIn,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  res.render("signin", { title: "SIgnin" });
});

userRouter.route("/signin").get(getSignIn).post(postSignIn);

userRouter.route("/signup").get(getSignUp).post(postSignUp);

export default userRouter;
