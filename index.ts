import express from "express";
import { urlencoded } from "express";
import userRouter from "./routes/user";
import connectDB from "./config/ds";

const PORT = 3000;
const app = express();

connectDB();

app.use(urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
