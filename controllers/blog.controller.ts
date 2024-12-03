import type { Request, Response } from "express";
import { handleImgUpload } from "../utils/handleImgbbUpload";
import * as BlogService from "../services/blog.service";

const getBlogPage = async (req: Request, res: Response) => {
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
    const data = await handleImgUpload(req.file);

    const blog = await BlogService.createBlog({
      title,
      body,
      coverImage: data.data.url,
      createdBy: user.id,
    });

    res.redirect("/");
  } catch (error: any) {
    console.log(error);
    res.render("create_blog", { title: "Create Blog", error: error, user });
  }
};

export { getBlogPage, createBlog };
