import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });

    if (!validUser) return res.next(errorHandler(404, "User not Found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });
    console.log(validUser._doc);

    const { password: pass, ...rest } = validUser._doc;

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      token,
      message: "token created successfully",
      rest,
    });

    // res.status(201).json({
    //   token,
    //   message: "token created successfully",
    //   user: { id: validUser._id, email: validUser.email },
    // });
  } catch (error) {
    next(error);
  }
};
