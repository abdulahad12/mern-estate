import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F40731967-avatar-user-profile-person-icon-login-icon-vector-line-symbol&psig=AOvVaw0WrLPbp9e1qN3fIQvJGW2y&ust=1742975454799000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICQm9vfpIwDFQAAAAAdAAAAABAR",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
