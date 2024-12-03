import { Router } from "express";
import { getBlogPage, createBlog } from "../controllers/blog.controller";
import multer from "multer";

const upload = multer();

const blogRouter = Router();

blogRouter.route("/").get(getBlogPage).post(upload.single("cover"), createBlog);

export { blogRouter };
