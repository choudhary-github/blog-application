import { Router } from "express";
import type { Request, Response } from "express";
import * as BlogService from "../services/blog.service";

const homeRouter = Router();

homeRouter.get("/", async (req: Request, res: Response) => {
  if (req.user) {
    const userBlogs = await BlogService.getBlogsbyUser(req?.user.id);
    res.render("home", { title: "Home", user: req.user, data: userBlogs });
    return;
  }
  res.render("home", { title: "Home", user: req.user });
});

export { homeRouter };
