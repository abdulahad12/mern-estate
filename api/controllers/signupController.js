import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("req.body", req.body);

  try {
    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "user created and save successfully" });
  } catch (error) {
    console.error("error from catch :", error);
    next(error);
  }
};
