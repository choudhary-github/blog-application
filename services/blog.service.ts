import Blog from "../models/Blog.model";
import multer from "multer";

type Blog = {
  _id?: string;
  title: string;
  body: string;
  coverImage: string;
  createdBy?: string;
};

const storage = multer.diskStorage({
  destination: function (req: any, file, cb) {
    console.log(req.user);
    
    cb(null, `../uploads/${req.user.id}`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const createBlog = async ({ title, body, createdBy }: Blog) => {
  console.log();

  const blog = new Blog({ title, body, createdBy });
};

export { createBlog };
