import type { Request, Response } from "express";
import Blog from "../models/Blog.model";

const getBlog = async (req: any, res: Response) => {
  const user = req.user;
  res.render("create_blog", { title: "Create Blog", user });
  return;
};

const createBlog = async (req: Request, res: Response) => {
  console.log(req.body);

  res.redirect("/");
};

export { getBlog, createBlog };
