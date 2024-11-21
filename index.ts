import express, { urlencoded } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user";
const PORT = 3000;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/blog-application")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
