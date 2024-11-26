import type { Request, Response, NextFunction } from "express";
import { validateToken } from "../services/authentication.service";

function checkAuthenticationCookie(cookie_name: string) {
  return (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies?.[cookie_name];
    if (!token) return next();

    try {
      const payload = validateToken(token);
      req.user = payload;
      return next();
    } catch (error) {
      // res.status(401).json({ error: "Unauthorized" });
      // return;
    }
    return next();
  };
}

export { checkAuthenticationCookie };
