import Blog from "../models/Blog.model";

type Blog = {
  title: string;
  body: string;
  coverImage: string;
  createdBy: string;
};

const createBlog = async ({ title, body, createdBy, coverImage }: Blog) => {
  const blog = new Blog({ title, body, createdBy, coverImage });

  const savedBlog = await blog.save();

  return savedBlog;
};

const getBlogsbyUser = async (userId: string) => {
  const blogs = await Blog.find({ createdBy: userId });

  return blogs;
};

export { createBlog, getBlogsbyUser };
