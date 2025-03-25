import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      console.log(result.user.email);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      if (!res.ok) throw new Error("Failed to fetch users from google");
      const data = await res.json();
      const newData = { ...data, provider: "google" };
      dispatch(loginUser(newData));
      navigate("/");
    } catch (error) {
      console.error("could not login/signin with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="bg-red-700 text-white rounded-lg p-3 hover:opacity-90 uppercase"
    >
      continue with google
    </button>
  );
};

export default OAuth;
