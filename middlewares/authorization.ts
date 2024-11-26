import type { NextFunction, Response } from "express";

const authorization = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.render("signin", {
      title: "SignIn",
      error: { message: "You are not authorized to access this page" },
    });
    return;
  }
  next();
};

export { authorization };
