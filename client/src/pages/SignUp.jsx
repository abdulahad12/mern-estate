import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [formdata, setformData] = useState({});
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleOnchange = (e) => {
    setformData({ ...formdata, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
      setformData({});
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto    p-3">
      <h1 className="text-3xl font-semibold  text-center my-7">Sign Up</h1>
      <form
        className="flex flex-col  gap-5 rounded-lg    "
        onSubmit={submitHandler}
      >
        <input
          type="text"
          placeholder="Enter your Name "
          className=" p-3 rounded-lg bg-white  "
          id="name"
          value={formdata.name || ""}
          onChange={handleOnchange}
        />
        <input
          type="email"
          placeholder="Enter your Email "
          className="  p-3 rounded-lg bg-white  "
          id="email"
          value={formdata.email || ""}
          autoComplete="new-password"
          onChange={handleOnchange}
        />
        <input
          type="password"
          placeholder="Enter your Password "
          className="  p-3 rounded-lg bg-white "
          id="password"
          value={formdata.password || ""}
          autoComplete="new-password"
          onChange={handleOnchange}
        />
        <button
          disabled={loading}
          className="p-3 rounded-lg  bg-slate-700  uppercase text-white  font-semibold hover:opacity-95 disabled:opacity-80 "
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      <div className="flex mt-2 gap-2">
        <h1>Have an account?</h1>
        <Link to="/sign-in">
          <span className="text-blue-700">SignIn</span>
        </Link>
      </div>
      {error}
      {error && <p className="text-red-600 ">{error}</p>}
    </div>
  );
};

export default SignUp;
