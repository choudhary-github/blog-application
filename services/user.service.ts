import User from "../models/User.model";

const createUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      const error: any = new Error("User already exists");
      error.type = "USER_EXIST";
      throw error;
    }
    const newUser = await User.create({
      fullName,
      email,
      password,
    });
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const verifyUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error: any = new Error("User not found");
      error.type = "USER_NOT_FOUND";
      throw error;
    }
    const verifyPassword = await Bun.password.verify(password, user.password);
    if (!verifyPassword) {
      const error: any = new Error("Invalid password");
      error.type = "INVALID_PASSWORD";
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createUser, verifyUser };
