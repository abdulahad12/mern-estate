import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log(currentUser.avatar);

  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex items-center justify-between max-w-6xl p-3 mx-auto">
        <div className="font-bold flex flex-wrap text-sm  sm:text-xl">
          <span className="text-slate-400">Real</span>
          <span className="text-slate-600">Estate</span>
        </div>

        <form className=" bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder=" Search...."
            className="bg-transparent focus:outline-none w-24  sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex  gap-4">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return `hidden sm:inline  hover:underline  ${
                isActive ? "text-slate-900" : "text-slate-600"
              } `;
            }}
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => {
              return `hidden sm:inline  hover:underline   ${
                isActive ? "text-slate-900" : "text-slate-600"
              } `;
            }}
          >
            <li>About</li>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => {
              return ` sm:inline hover:underline  ${
                isActive ? "text-slate-900" : "text-slate-600"
              } `;
            }}
          >
            {currentUser ? (
              <img
                className="w-7 h-7 rounded-full object-cover"
                src={currentUser.avatar}
                alt="Profile"
              />
            ) : (
              <li>SignIn</li>
            )}
          </NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Header;
