import { User } from "./models/User.model";
import { Request } from "express";

// Extend the Request interface from Express
declare global {
  namespace Express {
    interface Request {
      user?: User;
      file?: Express.Multer.File;
    }
  }
}
