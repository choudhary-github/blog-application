import express from "express";
import { urlencoded } from "express";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { homeRouter } from "./routes/home";
import connectDB from "./config/ds";
import { checkAuthenticationCookie } from "./middlewares/authenitcation";
import { authorization } from "./middlewares/authorization";
import cookieParser from "cookie-parser";

const PORT = 3000;
const app = express();

connectDB();

app.use(urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(checkAuthenticationCookie("token"));

app.get("/", homeRouter);
app.use("/user", userRouter);

app.use(authorization);

app.use("/create", blogRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
