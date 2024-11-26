import { Router } from "express";
import { getBlog, createBlog } from "../controllers/blog.controller";

const blogRouter = Router();

blogRouter.route("/").get(getBlog).post(createBlog);

export { blogRouter };
