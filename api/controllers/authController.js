import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("req.body from sign up", req.body);

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
  const { email, password } = req.body;
  console.log("req.body from signin", req.body);

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(404, "User not Found...."));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });
    console.log(token);

    const { password: pass, ...userData } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({
        token,
        success: true,
        message: "token created successfully",
        userData,
      });

    // res.status(201).json({
    //   token,
    //   message: "token created successfully",
    //   user: { id: validUser._id, email: validUser.email },
    // });
  } catch (error) {
    console.log("sign in error ", error.message);

    next(error);
  }
};
