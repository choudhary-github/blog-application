import jwt from "jsonwebtoken";

const secret = "@nkitc#oud#@ry";

type Payload = {
  email: string;
  fullName: string;
  roles: string;
};

const createToken = ({ email, fullName, roles }: Payload) => {
  const token = jwt.sign({ email, fullName, roles }, secret, {
    expiresIn: "1d",
  });
  return token;
};

const validateToken = (token: string) => {
  return jwt.verify(token, secret);
};

export { createToken, validateToken };
