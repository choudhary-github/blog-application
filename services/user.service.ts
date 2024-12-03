import {
  UserExistsError,
  UserNotFoundError,
  InvalidPasswordError,
} from "../errors/error";
import User from "../models/User.model";
import Bun from "bun";
import { createToken, validateToken } from "../services/authentication.service";

const createUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new UserExistsError();
    }

    // const hashedPassword = await Bun.password.hash(password);
    const newUser = await User.create({
      fullName,
      email,
      password,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

const verifyUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new UserNotFoundError();
    }

    const verifyPassword = await Bun.password.verify(password, user.password);
    if (!verifyPassword) {
      throw new InvalidPasswordError();
    }
    const token = createToken({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      roles: user.roles,
    });

    return token;
  } catch (error) {
    throw error;
  }
};

export { createUser, verifyUser };
