import jwt from "jsonwebtoken";

const secret = "@nkitc#oud#@ry";

type Payload = {
  id: any;
  email: string;
  fullName: string;
  roles: string;
};

const createToken = ({ id, email, fullName, roles }: Payload) => {
  const token = jwt.sign({ id, email, fullName, roles }, secret, {
    expiresIn: "1d",
  });
  return token;
};

const validateToken = (token: string) => {
  if (!token) return false;
  return jwt.verify(token, secret);
};

export { createToken, validateToken };
