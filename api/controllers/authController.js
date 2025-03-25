import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log("req.body from sign up", req.body);

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
  // console.log("req.body from signin", req.body);

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
  } catch (error) {
    console.log("sign in error ", error.message);

    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
      const { password: pas, ...restUser } = existingUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(restUser);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatePassword, 10);

      const newUser = new User({
        name:
          req.body.name?.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashPassword,
        avatar: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...restUser } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(restUser);
    }
  } catch (error) {
    console.error("error from catch of google OAuth :", error);
    next(error);
  }
};
