import { Router } from "express";
import { getBlog, createBlog } from "../controllers/blog.controller";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const blogRouter = Router();
const token = process.env.KEY;
console.log(token,'llllllllllllll');

blogRouter.route("/").get(getBlog).post(upload.single("cover"), createBlog);

export { blogRouter };
