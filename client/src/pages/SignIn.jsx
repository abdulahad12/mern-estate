import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
// import { useLoginUserMutation } from "../redux/user/apiSlice";

const SignIn = () => {
  const [formdata, setFormData] = useState({ email: "", password: "" });
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);
  // console.log(loading, error, currentUser);

  const { userData } = currentUser || {};

  console.log(userData);
  console.log(loading, error, currentUser);

  const onchangeHandler = async (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await loginUser(formdata).unwrap();
    //   console.log(res);
    //   if (res.success) {
    //     navigate("/");
    //   }
    // } catch (error) {
    //   console.log("error from catch", error.data.message);
    // }

    try {
      const res = await dispatch(loginUser(formdata)).unwrap();

      if (res.success) {
        navigate("/");
      }
    } catch (error) {
      console.log("error from catch", error?.message);
    }

    //   try {
    //     setLoading(true);
    //     const res = await fetch("/api/auth/signin", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(formdata),
    //     });
    //     console.log(res);

    //     const data = await res.json();
    //     console.log(data);

    //     if (data.success === false) {
    //       setError(data.message);
    //       setLoading(false);
    //       return;
    //     }
    //     setLoading(false);
    //     setError(null);
    //   } catch (error) {
    //     setError(error.message);
    //     setLoading(false);
    //   }
  };

  return (
    <div className=" max-w-lg mx-auto p-3 ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4   " onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Enter your Email"
          id="email"
          name=""
          required
          value={formdata.email || ""}
          onChange={onchangeHandler}
          className=" p-3 rounded-lg bg-white"
        />
        <input
          type="password"
          placeholder="Enter your Password"
          id="password"
          required
          value={formdata.password || ""}
          onChange={onchangeHandler}
          className=" p-3 rounded-lg bg-white"
        />

        <button
          disabled={loading}
          className="bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 text-white p-3 rounded-lg"
        >
          {loading ? "Loading" : " SIGN IN"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-2 ">
        <h1 className="ml-2">You donot have an account?</h1>
        <Link to="/sign-up">
          <p className="text-blue-700">SIgn Up</p>
        </Link>
      </div>

      {/* {error && (
        <div className="bg-red-200 text-red-700 p-2 mt-3 rounded-lg">
          {error.data.message}
        </div>
      )} */}
    </div>
  );
};

export default SignIn;
