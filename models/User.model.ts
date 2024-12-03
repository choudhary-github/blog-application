import { Schema, model } from "mongoose";
import Bun from "bun";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    profileImage: {
      type: String,
      default: "/images/default.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const hash = await Bun.password.hash(user.password);
  this.password = hash;
  next();
});

const User = model("User", userSchema);

export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  roles: string;
  profileImage: string;
};

export default User;
