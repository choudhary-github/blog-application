import type { Request, Response } from "express";
import Blog from "../models/Blog.model";

const getBlog = async (req: any, res: Response) => {
  const user = req.user;
  res.render("create_blog", { title: "Create Blog", user });
  return;
};

const createBlog = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const user = req.user;

  if (!title || !body || !user) {
    res.render("create_blog", {
      title: "Create Blog",
      error: { message: "All fields are required", user },
    });
    return;
  }

  try {
    const blog = new Blog({
      title,
      body,
      coverImage: req.file?.path,
      createdBy: user.id,
    });

    await blog.save();
    res.redirect("/");
  } catch (error: any) {
    console.log(error);
    res.render("create_blog", { title: "Create Blog", error: error, user });
  }
};

export { getBlog, createBlog };
